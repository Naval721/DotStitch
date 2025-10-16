import { useState } from "react";
import { ExportPanel } from "@/components/ExportPanel";
import { PremiumGate } from "@/components/auth/PremiumGate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { Canvas as FabricCanvas } from "fabric";
import type { PlayerData } from "@/pages/Index";

interface Step4ExportProps {
    canvasRef: FabricCanvas | null;
    selectedPlayer: PlayerData | null;
    playerData: PlayerData[];
    onPrev: () => void;
    onComplete: () => void;
}

export const Step4Export = ({
                                canvasRef,
                                selectedPlayer: initialSelectedPlayer,
                                playerData,
                                onPrev,
                                onComplete
                            }: Step4ExportProps) => {
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(
        initialSelectedPlayer || (playerData.length > 0 ? playerData[0] : null)
    );
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Export & Download</h2>
                <p className="text-muted-foreground text-lg">
                    Download individual designs or export all jerseys for production
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Export Controls */}
                <div className="space-y-4">
                    {/* Player Selector */}
                    <Card className="p-4">
                        <h3 className="font-semibold mb-3">Select Player to Export</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {playerData.map((player, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedPlayer(player)}
                                    className={`w-full p-3 text-left rounded-lg transition-smooth ${
                                        selectedPlayer === player
                                            ? 'bg-accent text-accent-foreground'
                                            : 'bg-secondary hover:bg-muted'
                                    }`}
                                >
                                    <div className="font-medium">{player.playerName}</div>
                                    <div className="text-sm opacity-70">#{player.jerseyNumber} - Size {player.size}</div>
                                </button>
                            ))}
                        </div>
                    </Card>
                    
                    <PremiumGate 
                        feature="Export & Download" 
                        description="Export your jersey designs in professional quality"
                    >
                        <ExportPanel
                            canvasRef={canvasRef}
                            selectedPlayer={selectedPlayer}
                            playerData={playerData}
                        />
                    </PremiumGate>
                </div>

                {/* Process Summary */}
                <Card className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        Design Process Complete
                    </h3>

                    <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-2">Project Summary</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div>✓ Jersey images uploaded and processed</div>
                                <div>✓ Player data imported ({playerData.length} players)</div>
                                <div>✓ Canvas designs created and customized</div>
                                <div>✓ Ready for export and production</div>
                            </div>
                        </div>

                        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                            <h4 className="font-medium text-success mb-2">Next Steps</h4>
                            <div className="space-y-1 text-sm text-success/80">
                                <div>• Export individual designs as JPG (200 DPI)</div>
                                <div>• Download bulk ZIP for production</div>
                                <div>• Share files with your printing partner</div>
                                <div>• Start a new project anytime</div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium text-blue-700 mb-2">Export Settings</h4>
                            <div className="space-y-1 text-sm text-blue-600">
                                <div>• Default format: JPG (200 DPI)</div>
                                <div>• Optimized for printing quality</div>
                                <div>• Smaller file sizes for easy sharing</div>
                                <div>• Bulk export available for all players</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 space-y-2">
                        <Button
                            onClick={onComplete}
                            variant="outline"
                            className="w-full"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Start New Project
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
                <Button
                    onClick={onPrev}
                    variant="outline"
                    size="lg"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Customize
                </Button>
            </div>
        </div>
    );
};