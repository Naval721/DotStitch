import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Users, Download, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import type { PlayerData } from "@/pages/Index";
import { logger } from "@/lib/logger";

interface PlayerDataUploadProps {
  playerData: PlayerData[];
  onDataChange: (data: PlayerData[]) => void;
}

export const PlayerDataUpload = ({ playerData, onDataChange }: PlayerDataUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const downloadTemplate = () => {
    const templateData = [
      {
        "Player Name": "John Doe",
        "Jersey Number": "10",
        "Size": "24",
        "Position": "Forward",
        "Team Name": "Falcons",
        "Custom Tag": "Captain"
      },
      {
        "Player Name": "Jane Smith",
        "Jersey Number": "7",
        "Size": "26",
        "Position": "Midfield",
        "Team Name": "Hawks",
        "Custom Tag": "Vice-Captain"
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Players");
    XLSX.writeFile(wb, "jersey_template.xlsx");
    
    toast.success("Template downloaded successfully");
  };

  const validatePlayerData = (data: any[]): { isValid: boolean; errors: string[]; validData: PlayerData[] } => {
    const errors: string[] = [];
    const validData: PlayerData[] = [];

    const allowedSizes = ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46"];

    data.forEach((row, index) => {
      const rowNum = index + 2; // +2 because Excel rows start at 1 and we have a header

      // Required fields validation
      const playerName = row["Player Name"];
      if (!playerName || typeof playerName !== 'string') {
        errors.push(`Row ${rowNum}: Player Name is required`);
      }
      
      // Jersey Number is required, can be any value (duplicates allowed)
      const jerseyRaw = row["Jersey Number"];
      const jerseyStr = jerseyRaw !== undefined && jerseyRaw !== null ? jerseyRaw.toString().trim() : "";
      if (jerseyStr === "") {
        errors.push(`Row ${rowNum}: Jersey Number is required`);
      }

      // Duplicates are now allowed - no duplicate check needed

      // Size must be one of the allowed values; accept both number and string from Excel
      const sizeStr = row["Size"] !== undefined && row["Size"] !== null ? row["Size"].toString().trim() : "";
      if (!sizeStr || !allowedSizes.includes(sizeStr)) {
        errors.push(`Row ${rowNum}: Size must be one of: ${allowedSizes.join(", ")}`);
      }

      // If no errors for this row, add to valid data
      const rowHasErrors = errors.some(error => error.includes(`Row ${rowNum}`));
      if (!rowHasErrors) {
        validData.push({
          playerName: (playerName as string) || "",
          jerseyNumber: jerseyStr,
          size: sizeStr,
          position: row["Position"] || "",
          teamName: row["Team Name"] || "",
          customTag: row["Custom Tag"] || ""
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      validData: errors.length === 0 ? validData : []
    };
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      toast.error("Please upload an Excel file (.xlsx, .xls) or CSV file");
      return;
    }

    setIsUploading(true);
    setValidationErrors([]);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) {
        toast.error("The uploaded file is empty");
        setIsUploading(false);
        return;
      }

      const validation = validatePlayerData(jsonData);
      
      if (validation.isValid) {
        onDataChange(validation.validData);
        toast.success(`Successfully imported ${validation.validData.length} players`);
        setValidationErrors([]);
      } else {
        setValidationErrors(validation.errors);
        toast.error(`Found ${validation.errors.length} validation errors`);
      }
    } catch (error) {
      toast.error("Failed to parse Excel file. Please check the format.");
      logger.error('Excel parsing error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-accent" />
        <div>
          <h2 className="text-xl font-semibold">Player Data</h2>
          <p className="text-muted-foreground text-sm">Import player information from Excel</p>
        </div>
      </div>

      {playerData.length === 0 ? (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="w-full h-20 border-dashed"
          >
            <div className="text-center">
              <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm">
                {isUploading ? 'Uploading...' : 'Upload Excel File'}
              </p>
            </div>
          </Button>

          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
              className="bg-gradient-accent text-accent-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{playerData.length} players loaded</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload New File
            </Button>
          </div>

          <div className="max-h-40 overflow-y-auto border border-border rounded-lg">
            {playerData.slice(0, 5).map((player, index) => (
              <div key={index} className="p-3 border-b border-border last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{player.playerName}</span>
                    <span className="text-muted-foreground ml-2">#{player.jerseyNumber}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {player.size} - {player.position}
                  </div>
                </div>
              </div>
            ))}
            {playerData.length > 5 && (
              <div className="p-3 text-center text-sm text-muted-foreground">
                + {playerData.length - 5} more players...
              </div>
            )}
          </div>
        </div>
      )}

      {validationErrors.length > 0 && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <span className="font-medium text-destructive">Validation Errors</span>
          </div>
          <ul className="text-sm text-destructive space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        accept=".xlsx,.xls,.csv"
        className="hidden"
      />

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">Excel Format Requirements</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Required columns:</strong> Player Name, Jersey Number, Size</p>
          <p><strong>Optional columns:</strong> Position, Team Name, Custom Tag</p>
          <p><strong>Valid sizes:</strong> 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46</p>
          <p><strong>Note:</strong> Jersey numbers can be any value and duplicates are allowed</p>
        </div>
      </div>
    </Card>
  );
};