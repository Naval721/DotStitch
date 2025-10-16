import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Type, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface CustomizationToolsProps {
  onAddText?: (text: string) => void;
  onAddLogo?: (logoUrl: string) => void;
}

export const CustomizationTools = ({ onAddText, onAddLogo }: CustomizationToolsProps) => {
  const [customText, setCustomText] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleAddText = () => {
    if (!customText.trim()) {
      toast.error("Please enter some text");
      return;
    }
    onAddText?.(customText);
    setCustomText("");
    toast.success("Text added to canvas");
  };

  const handleAddLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const logoUrl = event.target?.result as string;
      onAddLogo?.(logoUrl);
      toast.success("Logo added to canvas");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block">Custom Text</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter text..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddText()}
          />
          <Button onClick={handleAddText} size="icon">
            <Type className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Custom Logo</Label>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          onChange={handleAddLogo}
          className="hidden"
        />
        <Button
          onClick={() => logoInputRef.current?.click()}
          variant="outline"
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Logo
        </Button>
      </div>
    </div>
  );
};

