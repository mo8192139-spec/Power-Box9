import { useState } from "react";
import { Upload, X, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AdminImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
  required?: boolean;
  description?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export function AdminImageUpload({
  label,
  value,
  onChange,
  className,
  required = false,
  description,
  aspectRatio = "landscape",
}: AdminImageUploadProps) {
  const [urlInput, setUrlInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setIsEditing(false);
      setImageError(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const clearImage = () => {
    onChange("");
    setImageError(false);
  };

  const aspectRatioClasses = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div className={cn("space-y-3", className)}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {/* Image Preview */}
      {value && !isEditing && (
        <div className="relative group">
          <div className={cn(
            "relative border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50",
            aspectRatioClasses[aspectRatio]
          )}>
            {!imageError ? (
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Failed to load image</p>
                  <p className="text-xs text-gray-400 break-all px-2">{value}</p>
                </div>
              </div>
            )}
            
            {/* Overlay with action buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                  className="bg-white hover:bg-gray-100"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Change
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
                {!imageError && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(value, '_blank')}
                    className="bg-white hover:bg-gray-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* URL Input */}
      {(!value || isEditing) && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter image URL (https://...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              className="flex-1"
            />
            <Button 
              type="button"
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim()}
              size="sm"
            >
              Add
            </Button>
            {isEditing && (
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setUrlInput("");
                }}
                size="sm"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Upload area when no image */}
      {!value && !isEditing && (
        <div 
          className={cn(
            "border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100",
            aspectRatioClasses[aspectRatio]
          )}
          onClick={() => setIsEditing(true)}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Add Image URL</p>
              <p className="text-xs text-gray-500">Click to enter image URL</p>
            </div>
          </div>
        </div>
      )}

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}
