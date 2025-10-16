import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download, Package, FileImage, Archive } from "lucide-react";
import { Canvas as FabricCanvas } from "fabric";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import type { PlayerData } from "@/pages/Index";
import { logger } from "@/lib/logger";

interface ExportPanelProps {
    canvasRef: FabricCanvas | null;
    selectedPlayer: PlayerData | null;
    playerData: PlayerData[];
}

type VisibleBounds = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export const ExportPanel = ({ canvasRef, selectedPlayer, playerData }: ExportPanelProps) => {
    const [exportFormat, setExportFormat] = useState<'jpeg' | 'png'>('png');
    const [exportQuality, setExportQuality] = useState<'high' | 'medium' | 'low'>('high');
    const [isExporting, setIsExporting] = useState(false);
    const [freeExportCount, setFreeExportCount] = useState(0);
    const { user, profile, deductPoints, currentPoints } = useAuth();

    const getQualityMultiplier = () => {
        switch (exportQuality) {
            case 'high': return 3.125; // 300 DPI (96 * 3.125 = 300)
            case 'medium': return 2.08; // 200 DPI (96 * 2.08 ≈ 200)
            case 'low': return 1.56; // 150 DPI (96 * 1.56 ≈ 150)
            default: return 3.125;
        }
    };

    const generateFileName = (player: PlayerData, format: string) => {
        const sanitizedName = player.playerName.replace(/[^a-z0-9]/gi, '_');
        return `${sanitizedName}_${player.jerseyNumber}_${player.size}.${format}`;
    };

    const resolveExportBounds = (canvas: FabricCanvas): VisibleBounds | null => {
        const extendedCanvas = canvas as FabricCanvas & { getVisibleContentBounds?: () => VisibleBounds | null };
        return extendedCanvas.getVisibleContentBounds ? extendedCanvas.getVisibleContentBounds() : null;
    };

    const exportCurrentDesign = async () => {
        if (!canvasRef || !selectedPlayer) {
            toast.error("No design to export");
            return;
        }

        if (!user) {
            toast.error("Please sign in to export designs");
            return;
        }

        // Check if user has enough points
        const pointsNeeded = 1; // 1 point per export
        if (currentPoints < pointsNeeded) {
            toast.error("Insufficient points! Please buy more points to continue exporting.");
            return;
        }

        // Check free trial limit (5 exports for users with 5 points)
        const isFreeUser = currentPoints === 5 && profile?.total_points_purchased === 5;
        if (isFreeUser && freeExportCount >= 5) {
            toast.error("You've reached your free trial limit of 5 exports. Please buy points to continue!");
            return;
        }

        setIsExporting(true);

        try {
            // Use clean export with transparent background
            const designObjects = canvasRef.getObjects().filter(object => {
                if (!object.visible) return false;
                const name = (object as any).name;
                return name === 'jerseyFront' || 
                       name === 'jerseyBack' || 
                       name === 'playerName' || 
                       name === 'jerseyNumber' || 
                       name === 'customText' || 
                       name === 'customLogo' ||
                       (!name && (object as any).src);
            });

            if (designObjects.length === 0) {
                toast.error("No design content to export");
                return;
            }

            // Calculate exact bounds
            let minX = Number.POSITIVE_INFINITY;
            let minY = Number.POSITIVE_INFINITY;
            let maxX = Number.NEGATIVE_INFINITY;
            let maxY = Number.NEGATIVE_INFINITY;

            designObjects.forEach(object => {
                const rect = object.getBoundingRect(true, true);
                minX = Math.min(minX, rect.left);
                minY = Math.min(minY, rect.top);
                maxX = Math.max(maxX, rect.left + rect.width);
                maxY = Math.max(maxY, rect.top + rect.height);
            });

            // Export with exact bounds and white background for JPG
            const dataURL = canvasRef.toDataURL({
                format: 'jpeg', // Use JPG format
                quality: 0.92, // High quality JPG compression
                multiplier: getQualityMultiplier(),
                left: minX,
                top: minY,
                width: maxX - minX,
                height: maxY - minY,
                backgroundColor: '#ffffff', // White background for JPG
            });

            // Convert data URL to blob
            const response = await fetch(dataURL);
            const blob = await response.blob();

            const fileName = generateFileName(selectedPlayer, 'jpg');
            saveAs(blob, fileName);

            // Deduct points for export
            const result = await deductPoints(1, `Exported ${selectedPlayer.playerName} jersey`);
            
            if (!result.success) {
                toast.error("Failed to deduct points. Please try again.");
                return;
            }

            // Increment free export count for free users
            if (isFreeUser) {
                setFreeExportCount(prev => prev + 1);
            }

            toast.success(`Design exported as JPG (300 DPI) - ${fileName}`);
        } catch (error) {
            toast.error("Failed to export design");
            logger.error('Export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportAllDesigns = async () => {
        if (!canvasRef || playerData.length === 0) {
            toast.error("No designs to export");
            return;
        }

        if (!user) {
            toast.error("Please sign in to export designs");
            return;
        }

        // Calculate points needed for export all
        const pointsPerExport = 1;
        const totalPointsNeeded = playerData.length * pointsPerExport;

        // Check if user has enough points
        if (currentPoints < totalPointsNeeded) {
            toast.error(`Insufficient points! You need ${totalPointsNeeded} points to export all ${playerData.length} designs.`);
            return;
        }

        // Check free trial limit (5 exports for users with 5 points)
        const isFreeUser = currentPoints === 5 && profile?.total_points_purchased === 5;
        if (isFreeUser && playerData.length > 5) {
            toast.error("Free trial users can export maximum 5 designs at once. Please buy points for more!");
            return;
        }

        if (isFreeUser && freeExportCount + playerData.length > 5) {
            const remainingExports = 5 - freeExportCount;
            toast.error(`Free trial limit reached! You can only export ${remainingExports} more design(s). Please buy points for more!`);
            return;
        }

        setIsExporting(true);
        const zip = new JSZip();
        const folder = zip.folder("jersey_designs");

        try {
            toast.success("Starting bulk export as JPG (300 DPI)...");

            // Use JPG format for 300 DPI export
            const bulkExportFormat = 'jpeg';
            const bulkExportMultiplier = 3.125; // 300 DPI

            for (let i = 0; i < Math.min(playerData.length, 5); i++) {
                const player = playerData[i];

                // Get design objects for clean export
                const designObjects = canvasRef.getObjects().filter(object => {
                    if (!object.visible) return false;
                    const name = (object as any).name;
                    return name === 'jerseyFront' || 
                           name === 'jerseyBack' || 
                           name === 'playerName' || 
                           name === 'jerseyNumber' || 
                           name === 'customText' || 
                           name === 'customLogo' ||
                           (!name && (object as any).src);
                });

                if (designObjects.length > 0) {
                    // Calculate exact bounds
                    let minX = Number.POSITIVE_INFINITY;
                    let minY = Number.POSITIVE_INFINITY;
                    let maxX = Number.NEGATIVE_INFINITY;
                    let maxY = Number.NEGATIVE_INFINITY;

                    designObjects.forEach(object => {
                        const rect = object.getBoundingRect(true, true);
                        minX = Math.min(minX, rect.left);
                        minY = Math.min(minY, rect.top);
                        maxX = Math.max(maxX, rect.left + rect.width);
                        maxY = Math.max(maxY, rect.top + rect.height);
                    });

                    // Export with exact bounds and white background for JPG
                    const dataURL = canvasRef.toDataURL({
                        format: bulkExportFormat,
                        quality: 0.92, // High quality JPG compression
                        multiplier: bulkExportMultiplier,
                        left: minX,
                        top: minY,
                        width: maxX - minX,
                        height: maxY - minY,
                        backgroundColor: '#ffffff', // White background for JPG
                    });

                    // Convert data URL to blob
                    const response = await fetch(dataURL);
                    const blob = await response.blob();

                    const fileName = generateFileName(player, bulkExportFormat);
                    folder?.file(fileName, blob);

                    // Deduct points for each export
                    const result = await deductPoints(pointsPerExport, `Exported ${player.playerName} jersey`);
                    
                    if (!result.success) {
                        toast.error("Failed to deduct points. Please try again.");
                        return;
                    }

                    // Increment free export count for free users
                    if (isFreeUser) {
                        setFreeExportCount(prev => prev + 1);
                    }
                }
            }

            // Generate and download zip
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `jersey_designs_${new Date().toISOString().split('T')[0]}.zip`);

            toast.success(`Exported ${Math.min(playerData.length, 5)} designs as JPG (300 DPI) ZIP`);
        } catch (error) {
            toast.error("Failed to export designs");
            logger.error('Bulk export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const previewCurrentDesign = () => {
        if (!canvasRef) {
            toast.error("No design to preview");
            return;
        }

        // Get design objects for clean preview
        const designObjects = canvasRef.getObjects().filter(object => {
            if (!object.visible) return false;
            const name = (object as any).name;
            return name === 'jerseyFront' || 
                   name === 'jerseyBack' || 
                   name === 'playerName' || 
                   name === 'jerseyNumber' || 
                   name === 'customText' || 
                   name === 'customLogo' ||
                   (!name && (object as any).src);
        });

        if (designObjects.length === 0) {
            toast.error("No design content to preview");
            return;
        }

        // Calculate exact bounds
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        designObjects.forEach(object => {
            const rect = object.getBoundingRect(true, true);
            minX = Math.min(minX, rect.left);
            minY = Math.min(minY, rect.top);
            maxX = Math.max(maxX, rect.left + rect.width);
            maxY = Math.max(maxY, rect.top + rect.height);
        });

        const dataURL = canvasRef.toDataURL({
            format: 'jpeg',
            quality: 0.92,
            multiplier: 1,
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY,
            backgroundColor: '#ffffff', // White background for JPG
        });

        // Open in new window with JPG preview
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`
        <html>
          <head><title>Jersey Design Preview - ${selectedPlayer?.playerName}</title></head>
          <body style="margin:0; padding:20px; background:#f0f0f0; text-align:center;">
            <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h2>${selectedPlayer?.playerName} - #${selectedPlayer?.jerseyNumber}</h2>
              <img src="${dataURL}" style="max-width:100%; border:1px solid #ccc; border-radius:8px;" />
            </div>
          </body>
        </html>
      `);
        }
    };

    const exportIndividualSleeve = async (sleeveType: 'leftSleeve' | 'rightSleeve') => {
        if (!canvasRef || !selectedPlayer) {
            toast.error("No design to export");
            return;
        }

        if (!user) {
            toast.error("Please sign in to export designs");
            return;
        }

        if (!canExport) {
            toast.error("You've reached your export limit. Please upgrade to continue.");
            return;
        }

        setIsExporting(true);

        try {
            // Filter to only include the specific sleeve
            const sleeveObjects = canvasRef.getObjects().filter(object => {
                if (!object.visible) return false;
                const name = (object as any).name;
                return name === sleeveType;
            });

            if (sleeveObjects.length === 0) {
                toast.error(`No ${sleeveType === 'leftSleeve' ? 'left' : 'right'} sleeve to export`);
                return;
            }

            // Calculate exact bounds for the sleeve
            let minX = Number.POSITIVE_INFINITY;
            let minY = Number.POSITIVE_INFINITY;
            let maxX = Number.NEGATIVE_INFINITY;
            let maxY = Number.NEGATIVE_INFINITY;

            sleeveObjects.forEach(object => {
                const rect = object.getBoundingRect(true, true);
                minX = Math.min(minX, rect.left);
                minY = Math.min(minY, rect.top);
                maxX = Math.max(maxX, rect.left + rect.width);
                maxY = Math.max(maxY, rect.top + rect.height);
            });

            // Export with exact bounds and white background for JPG
            const dataURL = canvasRef.toDataURL({
                format: 'jpeg',
                quality: 0.98, // Ultra high quality JPG compression
                multiplier: getQualityMultiplier(),
                left: minX,
                top: minY,
                width: maxX - minX,
                height: maxY - minY,
                backgroundColor: '#ffffff', // White background for JPG
            });

            // Convert data URL to blob
            const response = await fetch(dataURL);
            const blob = await response.blob();

            const sleeveName = sleeveType === 'leftSleeve' ? 'left_sleeve' : 'right_sleeve';
            const fileName = `${selectedPlayer.playerName.replace(/[^a-z0-9]/gi, '_')}_${selectedPlayer.jerseyNumber}_${sleeveName}_${selectedPlayer.size}.jpg`;
            saveAs(blob, fileName);

            // Increment usage count
            await incrementUsage();

            toast.success(`${sleeveType === 'leftSleeve' ? 'Left' : 'Right'} sleeve exported as JPG (300 DPI) - ${fileName}`);
        } catch (error) {
            toast.error(`Failed to export ${sleeveType === 'leftSleeve' ? 'left' : 'right'} sleeve`);
            logger.error('Sleeve export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportCollar = async () => {
        if (!canvasRef || !selectedPlayer) {
            toast.error("No design to export");
            return;
        }

        if (!user) {
            toast.error("Please sign in to export designs");
            return;
        }

        if (!canExport) {
            toast.error("You've reached your export limit. Please upgrade to continue.");
            return;
        }

        setIsExporting(true);

        try {
            // Filter to only include the collar
            const collarObjects = canvasRef.getObjects().filter(object => {
                if (!object.visible) return false;
                const name = (object as any).name;
                return name === 'collar';
            });

            if (collarObjects.length === 0) {
                toast.error("No collar to export");
                return;
            }

            // Calculate exact bounds for the collar
            let minX = Number.POSITIVE_INFINITY;
            let minY = Number.POSITIVE_INFINITY;
            let maxX = Number.NEGATIVE_INFINITY;
            let maxY = Number.NEGATIVE_INFINITY;

            collarObjects.forEach(object => {
                const rect = object.getBoundingRect(true, true);
                minX = Math.min(minX, rect.left);
                minY = Math.min(minY, rect.top);
                maxX = Math.max(maxX, rect.left + rect.width);
                maxY = Math.max(maxY, rect.top + rect.height);
            });

            // Export with exact bounds and white background for JPG
            const dataURL = canvasRef.toDataURL({
                format: 'jpeg',
                quality: 0.98, // Ultra high quality JPG compression
                multiplier: getQualityMultiplier(),
                left: minX,
                top: minY,
                width: maxX - minX,
                height: maxY - minY,
                backgroundColor: '#ffffff', // White background for JPG
            });

            // Convert data URL to blob
            const response = await fetch(dataURL);
            const blob = await response.blob();

            const fileName = `${selectedPlayer.playerName.replace(/[^a-z0-9]/gi, '_')}_${selectedPlayer.jerseyNumber}_collar_${selectedPlayer.size}.jpg`;
            saveAs(blob, fileName);

            // Increment usage count
            await incrementUsage();

            toast.success(`Collar exported as JPG (300 DPI) - ${fileName}`);
        } catch (error) {
            toast.error("Failed to export collar");
            logger.error('Collar export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Card className="p-4 space-y-6">
            <div>
                <h3 className="font-semibold mb-2">Export & Preview</h3>
                <p className="text-sm text-muted-foreground">
                    Download your jersey designs in various formats
                </p>
            </div>

            {/* Export Settings */}
            <div className="space-y-4">
                <div>
                    <Label className="text-sm font-medium">Format</Label>
                    <Select value="jpeg" disabled>
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="jpeg">JPG (300 DPI - Print Ready)</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                        JPG format at 300 DPI for professional printing quality
                    </p>
                </div>

                <div>
                    <Label className="text-sm font-medium">Print Quality</Label>
                    <Select value={exportQuality} onValueChange={(value: 'high' | 'medium' | 'low') => setExportQuality(value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="high">Print Ready (3.125x - 300 DPI)</SelectItem>
                            <SelectItem value="medium">Web/Email (2.08x - 200 DPI)</SelectItem>
                            <SelectItem value="low">Preview (1.56x - 150 DPI)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Separator />

            {/* Single Export */}
            <div className="space-y-3">
                <Label className="font-medium">Current Design</Label>

                {selectedPlayer ? (
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                        <div className="font-medium">{selectedPlayer.playerName}</div>
                        <div className="text-muted-foreground">#{selectedPlayer.jerseyNumber} - Size {selectedPlayer.size}</div>
                    </div>
                ) : (
                    <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                        No player selected
                    </div>
                )}

                <div className="grid grid-cols-1 gap-2">
                    <Button
                        onClick={previewCurrentDesign}
                        variant="outline"
                        size="sm"
                        disabled={!selectedPlayer || !canvasRef}
                    >
                        <FileImage className="w-4 h-4 mr-2" />
                        Preview
                    </Button>

                    <Button
                        onClick={exportCurrentDesign}
                        disabled={!selectedPlayer || !canvasRef || isExporting}
                        size="sm"
                        className="bg-gradient-accent text-accent-foreground"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        {isExporting ? 'Exporting...' : 'Download Design'}
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Individual Component Export */}
            <div className="space-y-3">
                <Label className="font-medium">Individual Component Export</Label>
                <p className="text-xs text-muted-foreground">
                    Export individual components as separate high-quality images (sized per jersey size)
                </p>

                <div className="grid grid-cols-3 gap-2">
                    <Button
                        onClick={() => exportIndividualSleeve('leftSleeve')}
                        variant="outline"
                        size="sm"
                        disabled={!selectedPlayer || !canvasRef || isExporting}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Left Sleeve
                    </Button>

                    <Button
                        onClick={() => exportIndividualSleeve('rightSleeve')}
                        variant="outline"
                        size="sm"
                        disabled={!selectedPlayer || !canvasRef || isExporting}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Right Sleeve
                    </Button>

                    <Button
                        onClick={exportCollar}
                        variant="outline"
                        size="sm"
                        disabled={!selectedPlayer || !canvasRef || isExporting}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Collar
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Bulk Export */}
            <div className="space-y-3">
                <Label className="font-medium">Bulk Export</Label>

                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <div className="font-medium">{playerData.length} players loaded</div>
                    <div className="text-muted-foreground">Export all designs as JPG (300 DPI) ZIP</div>
                </div>

                <Button
                    onClick={exportAllDesigns}
                    variant="outline"
                    disabled={playerData.length === 0 || !canvasRef || isExporting}
                    className="w-full"
                    size="sm"
                >
                    <Archive className="w-4 h-4 mr-2" />
                    {isExporting ? 'Creating ZIP...' : 'Export All as JPG (300 DPI)'}
                </Button>

                {playerData.length > 5 && (
                    <div className="text-xs text-muted-foreground text-center">
                        Note: Bulk export limited to first 5 players in demo
                    </div>
                )}
            </div>

            <Separator />

            {/* Export Info */}
            <div className="space-y-2">
                <Label className="font-medium">Export Information</Label>
                <div className="text-xs text-muted-foreground space-y-1">
                    <div>• JPG: 300 DPI for professional printing quality</div>
                    <div>• High quality: Optimized compression for smaller file sizes</div>
                    <div>• Bulk export: JPG format at 300 DPI</div>
                    <div>• Files include player name and jersey number</div>
                    <div>• Clean exports: Only jersey design, no canvas background</div>
                    <div>• Size-specific: Collar and sleeves scaled per jersey size</div>
                </div>
            </div>
        </Card>
    );
};