import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SEOForm } from "@/components/admin/SEOForm";
import { HeroForm } from "@/components/admin/HeroForm";
import { BenefitsForm } from "@/components/admin/BenefitsForm";
import { TrustForm } from "@/components/admin/TrustForm";
import {
  GalleryForm,
  ReviewsForm,
  FinalCTAForm,
  FooterForm,
} from "@/components/admin/OtherForms";
import { PopupsForm } from "@/components/admin/PopupsForm";
import { ContentStorage } from "@/lib/content-storage";
import { defaultSiteContent } from "@shared/admin-content-types";
import { Button } from "@/components/ui/button";
import { Download, Upload, RotateCcw, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("seo");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [importContent, setImportContent] = useState("");
  const { toast } = useToast();

  // Initialize content if needed
  useEffect(() => {
    if (!ContentStorage.hasCustomContent()) {
      ContentStorage.saveSiteContent(defaultSiteContent);
    }
  }, []);

  const handleExport = () => {
    try {
      const content = ContentStorage.exportContent();

      // Create and download file
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `site-content-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Content exported",
        description: "Site content has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the content.",
        variant: "destructive",
      });
    }
  };

  const handleImport = () => {
    try {
      if (!importContent.trim()) {
        toast({
          title: "No content provided",
          description: "Please paste the JSON content to import.",
          variant: "destructive",
        });
        return;
      }

      const success = ContentStorage.importContent(importContent);
      if (success) {
        setShowImportDialog(false);
        setImportContent("");
        toast({
          title: "Content imported",
          description:
            "Site content has been imported successfully. Please refresh the page to see changes.",
        });

        // Refresh the page to load new content
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error("Import failed");
      }
    } catch (error) {
      toast({
        title: "Import failed",
        description:
          "There was an error importing the content. Please check the JSON format.",
        variant: "destructive",
      });
    }
  };

  const handleResetAll = () => {
    try {
      ContentStorage.resetContent();
      setShowResetDialog(false);
      toast({
        title: "Content reset",
        description:
          "All content has been reset to defaults. Please refresh the page.",
      });

      // Refresh the page to load default content
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast({
        title: "Reset failed",
        description: "There was an error resetting the content.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    window.open("/", "_blank");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "seo":
        return <SEOForm />;
      case "hero":
        return <HeroForm />;
      case "benefits":
        return <BenefitsForm />;
      case "trust":
        return <TrustForm />;
      case "gallery":
        return <GalleryForm />;
      case "reviews":
        return <ReviewsForm />;
      case "finalCTA":
        return <FinalCTAForm />;
      case "popups":
        return <PopupsForm />;
      case "footer":
        return <FooterForm />;
      default:
        return <SEOForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onExport={handleExport}
        onImport={() => setShowImportDialog(true)}
        onResetAll={() => setShowResetDialog(true)}
        onPreview={handlePreview}
      />

      {/* Main Content */}
      <div className="lg:ml-80">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Content Management
            </h1>
            <p className="text-gray-600">
              Edit your site content and see changes in real-time.
              <Button
                variant="link"
                onClick={handlePreview}
                className="p-0 h-auto ml-1 text-blue-600"
              >
                Preview your site
              </Button>
            </p>
          </div>

          {/* Active Section Content */}
          <div className="max-w-4xl">{renderActiveSection()}</div>
        </div>
      </div>

      {/* Import Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Import Content
            </AlertDialogTitle>
            <AlertDialogDescription>
              Paste the exported JSON content below to import it. This will
              replace all current content.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="import-content">JSON Content</Label>
              <Textarea
                id="import-content"
                placeholder="Paste exported JSON content here..."
                value={importContent}
                onChange={(e) => setImportContent(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setImportContent("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleImport}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Import Content
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset All Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Reset All Content
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset ALL content to the default state?
              This will permanently delete all your customizations and cannot be
              undone. Consider exporting your current content before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleExport} variant="outline" className="mr-2">
              <Download className="h-4 w-4 mr-2" />
              Export First
            </Button>
            <AlertDialogAction
              onClick={handleResetAll}
              className="bg-red-600 hover:bg-red-700"
            >
              Reset Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
