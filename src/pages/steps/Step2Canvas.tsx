import { DesignCanvas } from "@/components/DesignCanvas";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Canvas as FabricCanvas } from "fabric";
import type { JerseyImages, PlayerData } from "@/pages/Index";

interface Step2CanvasProps {
  jerseyImages: JerseyImages;
  playerData: PlayerData[];
  selectedPlayer: PlayerData | null;
  onPlayerSelect: (player: PlayerData) => void;
  onCanvasReady: (ref: FabricCanvas | null) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Canvas = ({
  jerseyImages,
  playerData,
  selectedPlayer,
  onPlayerSelect,
  onCanvasReady,
  onNext,
  onPrev
}: Step2CanvasProps) => {

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Canvas Preview</h2>
        <p className="text-muted-foreground text-lg">
          Review your imported data and jersey designs. Select a player to preview their jersey.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Player Selection Panel */}
        <div className="xl:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Imported Players ({playerData.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {playerData.map((player, index) => (
                <button
                  key={index}
                  onClick={() => onPlayerSelect(player)}
                  className={`w-full p-3 text-left rounded-lg transition-smooth ${
                    selectedPlayer === player
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary hover:bg-muted'
                  }`}
                >
                  <div className="font-medium">{player.playerName}</div>
                  <div className="text-sm opacity-70">#{player.jerseyNumber} - {player.size}</div>
                  <div className="text-xs opacity-60">{player.teamName} - {player.position}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Data Summary */}
          <Card className="p-4 mt-4">
            <h4 className="font-semibold mb-3">Import Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jersey Images:</span>
                <span className="font-medium">{Object.keys(jerseyImages).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Players:</span>
                <span className="font-medium">{playerData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team Sizes:</span>
                <span className="font-medium">
                  {[...new Set(playerData.map(p => p.size))].join(', ')}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Canvas Area */}
        <div className="xl:col-span-3">
          <DesignCanvas
            jerseyImages={jerseyImages}
            selectedPlayer={selectedPlayer}
            onCanvasReady={onCanvasReady}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button 
          onClick={onPrev}
          variant="outline"
          size="lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Upload
        </Button>
        
        <Button 
          onClick={onNext}
          size="lg"
          className="bg-gradient-accent text-accent-foreground hover:opacity-90"
        >
          Continue to Customization
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};