import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  FileText,
  Star,
  Users,
  Image,
  Link,
  MessageSquare,
  Search,
  Eye,
  Save,
  RotateCcw,
  Home,
  Menu,
  X,
  ChevronRight,
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  defaultLandingPageData,
  type LandingPageData,
} from "@shared/admin-types";

// Import admin form components (we'll create these next)
import { HeroForm } from "@/components/admin/HeroForm";
import { FeaturesForm } from "@/components/admin/FeaturesForm";
import { TestimonialsForm } from "@/components/admin/TestimonialsForm";
import { SEOForm } from "@/components/admin/SEOForm";
import { LinksForm } from "@/components/admin/LinksForm";
import { RatingForm } from "@/components/admin/RatingForm";
import { PopupsForm } from "@/components/admin/PopupsForm";
import { PreviewPanel } from "@/components/admin/PreviewPanel";

type AdminSection =
  | "hero"
  | "features"
  | "testimonials"
  | "seo"
  | "links"
  | "rating"
  | "popups"
  | "preview";

interface SidebarItem {
  id: AdminSection;
  label: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "hero",
    label: "Hero Section",
    icon: FileText,
    description: "Edit main headline, pricing, and CTA buttons",
    badge: "Essential",
  },
  {
    id: "features",
    label: "Features",
    icon: Settings,
    description: "Manage feature points, reorder, and toggle visibility",
    badge: `${defaultLandingPageData.features.length} items`,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: Users,
    description: "Add, edit, and manage customer reviews",
    badge: `${defaultLandingPageData.testimonials.length} reviews`,
  },
  {
    id: "seo",
    label: "SEO Settings",
    icon: Search,
    description: "Meta titles, descriptions, and social sharing",
  },
  {
    id: "links",
    label: "Links & Navigation",
    icon: Link,
    description: "Manage footer links, social media, and buttons",
    badge: `${defaultLandingPageData.links.length} links`,
  },
  {
    id: "rating",
    label: "Rating Display",
    icon: Star,
    description: "Configure star ratings and review counts",
  },
  {
    id: "popups",
    label: "Popups & Modals",
    icon: MessageSquare,
    description: "Exit intent popups and promotional modals",
    badge: defaultLandingPageData.popups.some((p) => p.enabled)
      ? "Active"
      : "Inactive",
  },
  {
    id: "preview",
    label: "Preview",
    icon: Eye,
    description: "See how your changes look on the live site",
    badge: "Live",
  },
];

export default function Admin() {
  const [activeSection, setActiveSection] = useState<AdminSection>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<LandingPageData>(defaultLandingPageData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateData = (section: keyof LandingPageData, newData: any) => {
    setData((prev) => ({
      ...prev,
      [section]: newData,
      lastUpdated: new Date().toISOString(),
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    // TODO: Replace with actual API call to save data
    console.log("Saving data:", data);
    setHasUnsavedChanges(false);
    // Show success toast
  };

  const handleReset = () => {
    setData(defaultLandingPageData);
    setHasUnsavedChanges(false);
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case "hero":
        return (
          <HeroForm
            data={data.hero}
            onChange={(heroData) => updateData("hero", heroData)}
          />
        );
      case "features":
        return (
          <FeaturesForm
            data={data.features}
            onChange={(featuresData) => updateData("features", featuresData)}
          />
        );
      case "testimonials":
        return (
          <TestimonialsForm
            data={data.testimonials}
            onChange={(testimonialsData) =>
              updateData("testimonials", testimonialsData)
            }
          />
        );
      case "seo":
        return (
          <SEOForm
            data={data.seo}
            onChange={(seoData) => updateData("seo", seoData)}
          />
        );
      case "links":
        return (
          <LinksForm
            data={data.links}
            onChange={(linksData) => updateData("links", linksData)}
          />
        );
      case "rating":
        return (
          <RatingForm
            data={data.rating}
            onChange={(ratingData) => updateData("rating", ratingData)}
          />
        );
      case "popups":
        return (
          <PopupsForm
            data={data.popups}
            onChange={(popupsData) => updateData("popups", popupsData)}
          />
        );
      case "preview":
        return <PreviewPanel data={data} />;
      default:
        return <div>Section not found</div>;
    }
  };

  const activeItem = sidebarItems.find((item) => item.id === activeSection);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0",
          "lg:block",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">Landing Page Editor</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-b bg-gray-50">
            <div className="space-y-2">
              <Button
                onClick={handleSave}
                className="w-full"
                disabled={!hasUnsavedChanges}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
                {hasUnsavedChanges && (
                  <Badge variant="destructive" className="ml-auto">
                    Unsaved
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset to Default
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-4",
                    activeSection === item.id
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <div className="flex items-center w-full">
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              activeSection === item.id
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs opacity-80 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open("/", "_blank")}
            >
              <Home className="mr-2 h-4 w-4" />
              View Live Site
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top bar */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Admin</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900 font-medium">
                  {activeItem?.label || "Dashboard"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="animate-pulse">
                  Unsaved Changes
                </Badge>
              )}
              <Badge variant="outline">
                Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Section Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {activeItem?.icon && (
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <activeItem.icon className="h-6 w-6 text-blue-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeItem?.label}
                  </h2>
                  <p className="text-gray-600">{activeItem?.description}</p>
                </div>
              </div>
              <Separator />
            </div>

            {/* Form Content */}
            <div className="max-w-4xl">{renderActiveForm()}</div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
