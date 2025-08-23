import { motion } from "framer-motion";
import { Star, Users, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { RatingSettings } from "@shared/admin-types";
import { cn } from "@/lib/utils";

interface RatingFormProps {
  data: RatingSettings;
  onChange: (data: RatingSettings) => void;
}

export function RatingForm({ data, onChange }: RatingFormProps) {
  const updateField = (field: keyof RatingSettings, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const renderStars = (style: string) => {
    const stars = [];
    for (let i = 1; i <= data.maxStars; i++) {
      let starClass = "text-gray-300";

      if (i <= Math.floor(data.value)) {
        starClass = "text-yellow-400 fill-current";
      } else if (i === Math.ceil(data.value)) {
        // Partial star
        if (style === "half" && data.value % 1 >= 0.5) {
          starClass = "text-yellow-400 fill-current";
        } else if (style === "three-quarters" && data.value % 1 >= 0.75) {
          starClass = "text-yellow-400 fill-current";
        } else if (style === "full") {
          starClass = "text-yellow-400 fill-current";
        }
      }

      stars.push(<Star key={i} className={cn("h-5 w-5", starClass)} />);
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Rating Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Rating Configuration
          </CardTitle>
          <CardDescription>
            Configure how customer ratings are displayed across your landing
            page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Value */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ratingValue" className="text-sm font-medium">
                Rating Value
              </Label>
              <Input
                id="ratingValue"
                type="number"
                step="0.1"
                min="0"
                max={data.maxStars}
                value={data.value}
                onChange={(e) =>
                  updateField("value", parseFloat(e.target.value) || 0)
                }
                placeholder="4.6"
              />
              <p className="text-xs text-gray-500">
                The average rating value (e.g., 4.6 out of 5)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStars" className="text-sm font-medium">
                Maximum Stars
              </Label>
              <Input
                id="maxStars"
                type="number"
                min="3"
                max="10"
                value={data.maxStars}
                onChange={(e) =>
                  updateField("maxStars", parseInt(e.target.value) || 5)
                }
                placeholder="5"
              />
              <p className="text-xs text-gray-500">
                Total number of stars (usually 5)
              </p>
            </div>
          </div>

          {/* Review Count */}
          <div className="space-y-2">
            <Label htmlFor="reviewCount" className="text-sm font-medium">
              Number of Reviews
            </Label>
            <Input
              id="reviewCount"
              type="number"
              min="0"
              value={data.reviewCount}
              onChange={(e) =>
                updateField("reviewCount", parseInt(e.target.value) || 0)
              }
              placeholder="23"
            />
            <p className="text-xs text-gray-500">
              Total number of customer reviews
            </p>
          </div>

          {/* Display Style */}
          <div className="space-y-2">
            <Label htmlFor="ratingStyle" className="text-sm font-medium">
              Star Display Style
            </Label>
            <Select
              value={data.style}
              onValueChange={(value) => updateField("style", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Stars Only</SelectItem>
                <SelectItem value="half">Half Star Precision</SelectItem>
                <SelectItem value="three-quarters">
                  Three-Quarter Precision
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              How to display partial star ratings
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Rating Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Preview</CardTitle>
          <CardDescription>
            See how your rating will appear with current settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Preview */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="flex">{renderStars(data.style)}</div>
              <span className="font-semibold text-gray-700">
                {data.value} ⭐
              </span>
              <span className="text-gray-600">
                from {data.reviewCount} reviews
              </span>
            </div>
          </div>

          {/* Style Comparisons */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Style Comparisons:</h4>

            <div className="grid gap-3">
              {["full", "half", "three-quarters"].map((style) => (
                <div
                  key={style}
                  className="flex items-center justify-between p-3 bg-white border rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex">{renderStars(style)}</div>
                    <span className="text-sm font-medium capitalize">
                      {style.replace("-", " ")} Style
                    </span>
                  </div>
                  {data.style === style && (
                    <Badge variant="default" className="text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Display Settings
          </CardTitle>
          <CardDescription>
            Choose where ratings should be displayed on your landing page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hero Section */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Hero Section</h4>
                <p className="text-sm text-blue-700">
                  Display rating prominently in the main hero area
                </p>
              </div>
            </div>
            <Switch
              checked={data.showInHero}
              onCheckedChange={(checked) => updateField("showInHero", checked)}
            />
          </div>

          {/* Trust Section */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-900">
                  Trust/Seller Section
                </h4>
                <p className="text-sm text-green-700">
                  Show rating in the trust badges and seller information area
                </p>
              </div>
            </div>
            <Switch
              checked={data.showInTrust}
              onCheckedChange={(checked) => updateField("showInTrust", checked)}
            />
          </div>

          {/* Summary */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Badge variant="outline" className="text-xs">
                {[data.showInHero, data.showInTrust].filter(Boolean).length}{" "}
                locations enabled
              </Badge>
              Rating will appear in{" "}
              {data.showInHero && data.showInTrust
                ? "both"
                : data.showInHero
                  ? "hero"
                  : data.showInTrust
                    ? "trust"
                    : "no"}{" "}
              section{data.showInHero && data.showInTrust ? "s" : ""}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-900">
            Rating Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-800 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>
              Keep ratings realistic and believable (4.0-4.8 range is most
              credible)
            </li>
            <li>
              Ensure review count matches the quality of your testimonials
            </li>
            <li>
              Use three-quarter precision for more authentic-looking ratings
            </li>
            <li>
              Display ratings consistently across all sections where they appear
            </li>
            <li>
              Consider local regulations about displaying ratings and reviews
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
