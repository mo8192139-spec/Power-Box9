import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Image as ImageIcon,
  Upload,
  Tag,
  Link,
  Globe,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { SEOSettings } from "@shared/admin-types";

interface SEOFormProps {
  data: SEOSettings;
  onChange: (data: SEOSettings) => void;
}

export function SEOForm({ data, onChange }: SEOFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(data.ogImage);

  const updateField = (field: keyof SEOSettings, value: any) => {
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
        updateField("ogImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeywordChange = (value: string) => {
    const keywords = value
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    updateField("keywords", keywords);
  };

  const titleLength = data.metaTitle.length;
  const descriptionLength = data.metaDescription.length;
  const keywordsText = data.keywords.join(", ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Meta Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Meta Tags
          </CardTitle>
          <CardDescription>
            Configure page title and description for search engines and social
            media
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Meta Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="metaTitle" className="text-sm font-medium">
                Meta Title *
              </Label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    titleLength > 60
                      ? "destructive"
                      : titleLength > 50
                        ? "secondary"
                        : "outline"
                  }
                  className="text-xs"
                >
                  {titleLength}/60
                </Badge>
              </div>
            </div>
            <Input
              id="metaTitle"
              value={data.metaTitle}
              onChange={(e) => updateField("metaTitle", e.target.value)}
              placeholder="Enter your page title..."
              className={titleLength > 60 ? "border-red-300" : ""}
            />
            <p className="text-xs text-gray-500">
              Optimal length: 50-60 characters. This appears as the clickable
              headline in search results.
            </p>
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="metaDescription" className="text-sm font-medium">
                Meta Description *
              </Label>
              <Badge
                variant={
                  descriptionLength > 160
                    ? "destructive"
                    : descriptionLength > 140
                      ? "secondary"
                      : "outline"
                }
                className="text-xs"
              >
                {descriptionLength}/160
              </Badge>
            </div>
            <Textarea
              id="metaDescription"
              value={data.metaDescription}
              onChange={(e) => updateField("metaDescription", e.target.value)}
              placeholder="Write a compelling description of your page..."
              className={`min-h-[80px] resize-none ${descriptionLength > 160 ? "border-red-300" : ""}`}
            />
            <p className="text-xs text-gray-500">
              Optimal length: 140-160 characters. This appears as the
              description in search results.
            </p>
          </div>

          <Separator />

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-sm font-medium">
              Keywords
            </Label>
            <Input
              id="keywords"
              value={keywordsText}
              onChange={(e) => handleKeywordChange(e.target.value)}
              placeholder="snack box, gift, healthy snacks, breakfast bars"
            />
            <p className="text-xs text-gray-500">
              Enter keywords separated by commas. These help with internal
              organization and content planning.
            </p>
            {data.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {data.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Open Graph (Social Media) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Social Media Preview
          </CardTitle>
          <CardDescription>
            Configure how your page appears when shared on social media
            platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OG Image */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Open Graph Image</Label>

            {imagePreview && (
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Preview</div>
                <div className="max-w-md border rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="OG image preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 bg-white border-t">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {data.metaTitle}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {data.metaDescription}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {data.canonicalUrl || "your-domain.com"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <Label htmlFor="ogImage">Image URL</Label>
                <Input
                  id="ogImage"
                  value={data.ogImage}
                  onChange={(e) => {
                    updateField("ogImage", e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/social-image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="ogImageUpload">Or Upload Image</Label>
                <Input
                  id="ogImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1200x630px (1.91:1 ratio). Maximum file size:
                  8MB.
                </p>
              </div>

              <div>
                <Label htmlFor="ogImageAlt">Image Alt Text</Label>
                <Input
                  id="ogImageAlt"
                  value={data.ogImageAlt}
                  onChange={(e) => updateField("ogImageAlt", e.target.value)}
                  placeholder="Describe the social media image..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical SEO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Technical SEO
          </CardTitle>
          <CardDescription>
            Advanced SEO settings for search engine optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Canonical URL */}
          <div className="space-y-2">
            <Label htmlFor="canonicalUrl" className="text-sm font-medium">
              Canonical URL (Optional)
            </Label>
            <Input
              id="canonicalUrl"
              value={data.canonicalUrl || ""}
              onChange={(e) => updateField("canonicalUrl", e.target.value)}
              placeholder="https://yourdomain.com/page-url"
            />
            <p className="text-xs text-gray-500">
              The preferred URL for this page. Helps prevent duplicate content
              issues.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Search Engine Preview</CardTitle>
          <CardDescription>
            How your page might appear in Google search results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-lg">
            <div className="text-sm text-blue-700 hover:underline cursor-pointer">
              {data.metaTitle}
            </div>
            <div className="text-green-700 text-xs mt-1">
              {data.canonicalUrl || "https://your-domain.com/page"}
            </div>
            <div className="text-gray-700 text-sm mt-1 leading-relaxed">
              {data.metaDescription}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">SEO Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>
              Include your main keyword in the title (preferably at the
              beginning)
            </li>
            <li>
              Write unique, compelling meta descriptions that encourage clicks
            </li>
            <li>Use high-quality, relevant images for social media sharing</li>
            <li>
              Keep titles under 60 characters and descriptions under 160
              characters
            </li>
            <li>
              Make sure your content matches what the meta description promises
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
