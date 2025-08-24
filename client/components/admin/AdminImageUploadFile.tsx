import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, ExternalLink, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface AdminImageUploadFileProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
  required?: boolean;
  description?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export function AdminImageUploadFile({
  label,
  value,
  onChange,
  className,
  required = false,
  description,
  aspectRatio = "landscape",
}: AdminImageUploadFileProps) {
  const [urlInput, setUrlInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setIsEditing(false);
      setImageError(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64
      const base64 = await fileToBase64(file);
      
      // Create a data URL for the image
      const dataUrl = `data:${file.type};base64,${base64}`;
      
      onChange(dataUrl);
      setImageError(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const aspectRatioClasses = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  const isDataUrl = value.startsWith('data:');

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
                  {!isDataUrl && (
                    <p className="text-xs text-gray-400 break-all px-2">{value}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Image Type Indicator */}
            {isDataUrl && (
              <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                <FileImage className="inline h-3 w-3 mr-1" />
                Uploaded
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
                {!imageError && !isDataUrl && (
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

      {/* Upload Options */}
      {(!value || isEditing) && (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">Image URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            {/* File Upload */}
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div 
                className={cn(
                  "border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100",
                  aspectRatioClasses[aspectRatio]
                )}
                onClick={triggerFileInput}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm font-medium text-gray-700">Uploading...</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Upload Image</p>
                        <p className="text-xs text-gray-500">Click to browse or drag & drop</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setUrlInput("");
                  }}
                  size="sm"
                  className="w-full"
                >
                  Cancel
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            {/* URL Input */}
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
              </div>

              {isEditing && (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setUrlInput("");
                  }}
                  size="sm"
                  className="w-full"
                >
                  Cancel
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
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
              <p className="text-sm font-medium text-gray-700">Add Image</p>
              <p className="text-xs text-gray-500">Upload file or enter URL</p>
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

// Utility function to convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix to get just the base64 data
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}
