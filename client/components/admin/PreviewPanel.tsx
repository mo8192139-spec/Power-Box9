import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { LandingPageData } from "@shared/admin-types";
import { cn } from "@/lib/utils";

interface PreviewPanelProps {
  data: LandingPageData;
}

export function PreviewPanel({ data }: PreviewPanelProps) {
  const [activeDevice, setActiveDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const deviceSizes = {
    desktop: { width: "100%", height: "600px" },
    tablet: { width: "768px", height: "1024px" },
    mobile: { width: "375px", height: "667px" },
  };

  const currentSize = deviceSizes[activeDevice];

  // Generate preview data summary
  const getDataSummary = () => {
    const enabledFeatures = data.features.filter((f) => f.enabled).length;
    const enabledPopups = data.popups.filter((p) => p.enabled).length;
    const avgRating =
      data.testimonials.length > 0
        ? (
            data.testimonials.reduce((sum, t) => sum + t.rating, 0) /
            data.testimonials.length
          ).toFixed(1)
        : "0";

    return {
      enabledFeatures,
      totalFeatures: data.features.length,
      testimonials: data.testimonials.length,
      avgRating,
      enabledPopups,
      totalPopups: data.popups.length,
      seoScore:
        data.seo.metaTitle && data.seo.metaDescription
          ? "Good"
          : "Needs Improvement",
    };
  };

  const summary = getDataSummary();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
              <CardDescription>
                See how your landing page will look with current settings
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">
                Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={() => window.open("/", "_blank")}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Live Site
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {summary.enabledFeatures}/{summary.totalFeatures}
              </div>
              <div className="text-sm text-blue-700">Features Active</div>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {summary.testimonials}
              </div>
              <div className="text-sm text-green-700">Testimonials</div>
            </div>

            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">
                {summary.avgRating}⭐
              </div>
              <div className="text-sm text-yellow-700">Avg Rating</div>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {summary.enabledPopups}
              </div>
              <div className="text-sm text-purple-700">Active Popups</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">SEO Status:</span>
              <Badge
                variant={summary.seoScore === "Good" ? "default" : "secondary"}
              >
                {summary.seoScore}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Device Preview</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={activeDevice === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDevice("desktop")}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={activeDevice === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDevice("tablet")}
              >
                <Tablet className="h-4 w-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={activeDevice === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDevice("mobile")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div
              className={cn(
                "border rounded-lg overflow-hidden bg-white shadow-lg transition-all duration-300",
                activeDevice === "mobile" &&
                  "rounded-3xl border-8 border-gray-800",
              )}
              style={{
                width: currentSize.width,
                height: currentSize.height,
                maxWidth: "100%",
              }}
            >
              <iframe
                key={refreshKey}
                src="/"
                className="w-full h-full"
                style={{
                  transform:
                    activeDevice === "mobile" ? "scale(0.8)" : "scale(1)",
                  transformOrigin: "top left",
                }}
                title="Landing page preview"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Overview Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
          <CardDescription>
            Detailed breakdown of your landing page content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="testimonials">Reviews</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="popups">Popups</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Content</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Title:</strong> {data.hero.title || "Not set"}
                    </div>
                    <div>
                      <strong>Price:</strong> ${data.hero.salePrice}
                    </div>
                    <div>
                      <strong>Rating:</strong> {data.hero.rating}/5 (
                      {data.hero.ratingReviews} reviews)
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Buttons</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Primary:</strong> {data.hero.primaryButtonText}
                    </div>
                    <div>
                      <strong>Secondary:</strong>{" "}
                      {data.hero.secondaryButtonText}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-3">
                {data.features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Badge variant={feature.enabled ? "default" : "secondary"}>
                      {feature.enabled ? "Active" : "Disabled"}
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium">{feature.title}</div>
                      <div className="text-sm text-gray-600">
                        {feature.description}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Order: {feature.order}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-4">
              <div className="space-y-3">
                {data.testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      "{testimonial.review}"
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Meta Title</h4>
                  <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    {data.seo.metaTitle || "Not set"}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Meta Description</h4>
                  <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    {data.seo.metaDescription || "Not set"}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {data.seo.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="popups" className="space-y-4">
              <div className="space-y-3">
                {data.popups.length === 0 ? (
                  <Alert>
                    <AlertDescription>No popups configured</AlertDescription>
                  </Alert>
                ) : (
                  data.popups.map((popup) => (
                    <div
                      key={popup.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Badge variant={popup.enabled ? "default" : "secondary"}>
                        {popup.enabled ? "Active" : "Disabled"}
                      </Badge>
                      <div className="flex-1">
                        <div className="font-medium">{popup.title}</div>
                        <div className="text-sm text-gray-600">
                          {popup.type} popup
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Preview Notes */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-900">Preview Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-800 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>This preview shows the live site with your current settings</li>
            <li>
              Changes made in the admin panel may require saving to appear in
              preview
            </li>
            <li>
              Some interactive features (like popups) may behave differently in
              the iframe
            </li>
            <li>Use "Open Live Site" to test the full user experience</li>
            <li>
              Mobile preview is scaled for visibility - actual mobile experience
              may differ
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
