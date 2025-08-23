import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Star,
  DollarSign,
  Image as ImageIcon,
  Link,
  Type,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { HeroContent } from "@shared/admin-types";

interface HeroFormProps {
  data: HeroContent;
  onChange: (data: HeroContent) => void;
}

export function HeroForm({ data, onChange }: HeroFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(data.heroImage);

  const updateField = (field: keyof HeroContent, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        updateField("heroImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Hero Content
          </CardTitle>
          <CardDescription>
            Edit the main headline, subtitle, and key messaging for your landing
            page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Main Title *
            </Label>
            <Textarea
              id="title"
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter your main headline..."
              className="min-h-[80px] resize-none"
            />
            <p className="text-xs text-gray-500">
              This is the main headline visitors will see first. Keep it
              compelling and clear.
            </p>
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-sm font-medium">
              Subtitle (Optional)
            </Label>
            <Input
              id="subtitle"
              value={data.subtitle || ""}
              onChange={(e) => updateField("subtitle", e.target.value)}
              placeholder="Optional subtitle or tagline..."
            />
          </div>

          <Separator />

          {/* Urgency & Delivery Text */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="urgencyText" className="text-sm font-medium">
                Urgency Text
              </Label>
              <Input
                id="urgencyText"
                value={data.urgencyText}
                onChange={(e) => updateField("urgencyText", e.target.value)}
                placeholder="e.g., Limited stock available"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryText" className="text-sm font-medium">
                Delivery Text
              </Label>
              <Input
                id="deliveryText"
                value={data.deliveryText}
                onChange={(e) => updateField("deliveryText", e.target.value)}
                placeholder="e.g., Fast & reliable delivery"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing & Rating
          </CardTitle>
          <CardDescription>
            Configure pricing display and customer rating information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salePrice" className="text-sm font-medium">
                Sale Price * <Badge variant="outline">USD</Badge>
              </Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                value={data.salePrice}
                onChange={(e) =>
                  updateField("salePrice", parseFloat(e.target.value) || 0)
                }
                placeholder="31.95"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice" className="text-sm font-medium">
                Original Price (Optional) <Badge variant="outline">USD</Badge>
              </Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={data.originalPrice || ""}
                onChange={(e) =>
                  updateField(
                    "originalPrice",
                    parseFloat(e.target.value) || undefined,
                  )
                }
                placeholder="49.99"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-sm font-medium">
                Rating Value
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={data.rating}
                  onChange={(e) =>
                    updateField("rating", parseFloat(e.target.value) || 0)
                  }
                  placeholder="4.6"
                  className="w-24"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(data.rating)
                          ? "text-yellow-400 fill-current"
                          : i < data.rating
                            ? "text-yellow-400 fill-current opacity-50"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ratingReviews" className="text-sm font-medium">
                Number of Reviews
              </Label>
              <Input
                id="ratingReviews"
                type="number"
                value={data.ratingReviews}
                onChange={(e) =>
                  updateField("ratingReviews", parseInt(e.target.value) || 0)
                }
                placeholder="23"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons & Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Call-to-Action Buttons
          </CardTitle>
          <CardDescription>
            Configure the main action buttons and their destinations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Button */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
            <h4 className="font-medium text-blue-900">Primary Button</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="primaryButtonText"
                  className="text-sm font-medium"
                >
                  Button Text
                </Label>
                <Input
                  id="primaryButtonText"
                  value={data.primaryButtonText}
                  onChange={(e) =>
                    updateField("primaryButtonText", e.target.value)
                  }
                  placeholder="View Product Details"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="primaryButtonLink"
                  className="text-sm font-medium"
                >
                  Button Link
                </Label>
                <Input
                  id="primaryButtonLink"
                  value={data.primaryButtonLink}
                  onChange={(e) =>
                    updateField("primaryButtonLink", e.target.value)
                  }
                  placeholder="#product-modal or https://..."
                />
              </div>
            </div>
          </div>

          {/* Secondary Button */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900">Secondary Button</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="secondaryButtonText"
                  className="text-sm font-medium"
                >
                  Button Text
                </Label>
                <Input
                  id="secondaryButtonText"
                  value={data.secondaryButtonText}
                  onChange={(e) =>
                    updateField("secondaryButtonText", e.target.value)
                  }
                  placeholder="Learn More About This Product"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="secondaryButtonLink"
                  className="text-sm font-medium"
                >
                  Button Link
                </Label>
                <Input
                  id="secondaryButtonLink"
                  value={data.secondaryButtonLink}
                  onChange={(e) =>
                    updateField("secondaryButtonLink", e.target.value)
                  }
                  placeholder="#product-section or https://..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Hero Image
          </CardTitle>
          <CardDescription>
            Upload or provide a URL for the main hero image
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Image Preview */}
          {imagePreview && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Current Image</Label>
              <div className="relative max-w-md">
                <img
                  src={imagePreview}
                  alt="Hero image preview"
                  className="w-full h-48 object-contain bg-gray-50 rounded-lg border"
                />
              </div>
            </div>
          )}

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="heroImage" className="text-sm font-medium">
              Image URL
            </Label>
            <Input
              id="heroImage"
              value={data.heroImage}
              onChange={(e) => {
                updateField("heroImage", e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="heroImageUpload" className="text-sm font-medium">
              Or Upload New Image
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="heroImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="heroImageUpload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Browse
                </label>
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Recommended: 800x600px or larger. Supports JPG, PNG, WebP.
            </p>
          </div>

          {/* Alt Text */}
          <div className="space-y-2">
            <Label htmlFor="heroImageAlt" className="text-sm font-medium">
              Image Alt Text
            </Label>
            <Input
              id="heroImageAlt"
              value={data.heroImageAlt}
              onChange={(e) => updateField("heroImageAlt", e.target.value)}
              placeholder="Describe the image for accessibility..."
            />
            <p className="text-xs text-gray-500">
              Important for SEO and accessibility. Describe what's in the image.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
