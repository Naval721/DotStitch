import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { StepNavigation } from "@/components/StepNavigation";
import { Step1Upload } from "@/pages/steps/Step1Upload";
import { Step2Canvas } from "@/pages/steps/Step2Canvas";
import { Step3Customize } from "@/pages/steps/Step3Customize";
import { Step4Export } from "@/pages/steps/Step4Export";
import { HomePage } from "@/pages/HomePage";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-jersey-designer.jpg";
import { Canvas as FabricCanvas } from "fabric";

export interface JerseyImages {
  front?: string;
  back?: string;
  leftSleeve?: string;
  rightSleeve?: string;
  collar?: string;
}

export interface PlayerData {
  playerName: string;
  jerseyNumber: string;
  size: string;
  position: string;
  teamName: string;
  customTag: string;
}

const Index = () => {
  const [showHomePage, setShowHomePage] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [jerseyImages, setJerseyImages] = useState<JerseyImages>({});
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [canvasRef, setCanvasRef] = useState<FabricCanvas | null>(null);

  // Sync selectedPlayer when playerData changes
  useEffect(() => {
    if (playerData.length > 0 && !selectedPlayer) {
      setSelectedPlayer(playerData[0]);
    }
  }, [playerData, selectedPlayer]);

  const hasRequiredData = Object.keys(jerseyImages).length > 0 && playerData.length > 0;

  const steps = [
    {
      id: 1,
      title: "Upload Assets",
      description: "Jersey images & player data",
      completed: hasRequiredData
    },
    {
      id: 2,
      title: "Preview Canvas",
      description: "Review imported data",
      completed: currentStep > 2
    },
    {
      id: 3,
      title: "Customize Design",
      description: "Add logos & text",
      completed: currentStep > 3
    },
    {
      id: 4,
      title: "Export & Download",
      description: "Final production files",
      completed: currentStep > 4
    }
  ];

  const canGoToStep = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return hasRequiredData;
    if (step === 3) return hasRequiredData;
    if (step === 4) return hasRequiredData;
    return false;
  };

  const handleStepChange = (step: number) => {
    if (canGoToStep(step)) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCurrentStep(1);
    setShowHomePage(true);
    setJerseyImages({});
    setPlayerData([]);
    setSelectedPlayer(null);
    setCanvasRef(null);
  };

  const handleStartDesigning = () => {
    setShowHomePage(false);
    setCurrentStep(1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Upload
            jerseyImages={jerseyImages}
            playerData={playerData}
            onImagesChange={setJerseyImages}
            onDataChange={setPlayerData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2Canvas
            jerseyImages={jerseyImages}
            playerData={playerData}
            selectedPlayer={selectedPlayer}
            onPlayerSelect={setSelectedPlayer}
            onCanvasReady={setCanvasRef}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <Step3Customize
            jerseyImages={jerseyImages}
            playerData={playerData}
            selectedPlayer={selectedPlayer}
            onPlayerSelect={setSelectedPlayer}
            canvasRef={canvasRef}
            onCanvasReady={setCanvasRef}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <Step4Export
            canvasRef={canvasRef}
            selectedPlayer={selectedPlayer || (playerData.length > 0 ? playerData[0] : null)}
            playerData={playerData}
            onPrev={handlePrev}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  // Show HomePage if showHomePage is true
  if (showHomePage) {
    return <HomePage onStart={handleStartDesigning} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        {hasRequiredData ? (
          <>
            <StepNavigation
              currentStep={currentStep}
              steps={steps}
              onStepChange={handleStepChange}
              canGoToStep={canGoToStep}
            />
            {renderCurrentStep()}
          </>
        ) : (
          <>
            {currentStep === 1 && renderCurrentStep()}
            {currentStep !== 1 && (
              <Card className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={heroImage} 
                    alt="DotStitch Interface" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-primary/80 flex items-center justify-center">
                    <div className="text-center text-primary-foreground">
                      <h2 className="text-3xl font-bold mb-2">DotStitch</h2>
                      <p className="text-primary-foreground/90 text-lg">
                        Professional Customization
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-8 text-lg">
                    Upload your jersey images and player data to start customizing professional sports jerseys with our advanced design tools.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <div className="text-2xl mb-3">🎽</div>
                      <h4 className="font-semibold text-lg mb-2">Step 1: Upload Jersey Images</h4>
                      <p className="text-muted-foreground">Add front, back, sleeves, and collar images in high resolution for the best results</p>
                    </div>
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <div className="text-2xl mb-3">📊</div>
                      <h4 className="font-semibold text-lg mb-2">Step 2: Import Player Data</h4>
                      <p className="text-muted-foreground">Upload Excel file with player information including names, numbers, and sizes</p>
                    </div>
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <div className="text-2xl mb-3">🎨</div>
                      <h4 className="font-semibold text-lg mb-2">Step 3: Design & Customize</h4>
                      <p className="text-muted-foreground">Add logos, adjust text, and personalize each jersey with our intuitive tools</p>
                    </div>
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <div className="text-2xl mb-3">📦</div>
                      <h4 className="font-semibold text-lg mb-2">Step 4: Export & Share</h4>
                      <p className="text-muted-foreground">Download individual designs or export all jerseys as a ZIP file for production</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;