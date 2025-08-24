import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { AdminFormSection } from "./AdminFormSection";
import { AdminInput } from "./AdminInput";
import { AdminActionButtons } from "./AdminActionButtons";
import { ContentStorage } from "@/lib/content-storage";
import { SEOContent } from "@shared/admin-content-types";
import { useToast } from "@/hooks/use-toast";

export function SEOForm() {
  const [seoContent, setSeoContent] = useState<SEOContent>(() => 
    ContentStorage.getSectionContent('seo')
  );
  const [originalContent, setOriginalContent] = useState<SEOContent>(seoContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('seo');
    setSeoContent(content);
    setOriginalContent(content);
  }, []);

  const updateField = <K extends keyof SEOContent>(
    field: K, 
    value: SEOContent[K]
  ) => {
    setSeoContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('seo', seoContent);
      if (success) {
        setOriginalContent(seoContent);
        
        // Update meta tags immediately
        updateMetaTags(seoContent);
        
        toast({
          title: "SEO settings saved",
          description: "Meta tags have been updated and applied to the page.",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSeoContent(originalContent);
    toast({
      title: "Changes reset",
      description: "All changes have been reverted to the last saved state.",
    });
  };

  const hasChanges = JSON.stringify(seoContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="SEO Settings"
        description="Configure meta tags for search engine optimization. Changes are applied immediately to the page."
        icon={<Search className="h-5 w-5" />}
      >
        <div className="space-y-6">
          <AdminInput
            label="Meta Title"
            value={seoContent.metaTitle}
            onChange={(value) => updateField('metaTitle', value as string)}
            placeholder="Enter page title for search engines"
            required
            description="Recommended length: 50-60 characters. This appears as the clickable headline in search results."
          />

          <AdminInput
            label="Meta Description"
            type="textarea"
            value={seoContent.metaDescription}
            onChange={(value) => updateField('metaDescription', value as string)}
            placeholder="Enter page description for search engines"
            required
            rows={3}
            description="Recommended length: 150-160 characters. This appears as the snippet below the title in search results."
          />

          <AdminInput
            label="Meta Keywords"
            value={seoContent.metaKeywords}
            onChange={(value) => updateField('metaKeywords', value as string)}
            placeholder="keyword1, keyword2, keyword3"
            description="Comma-separated keywords related to your content. While not as important for modern SEO, some search engines still use these."
          />

          {/* SEO Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Search Result Preview</h3>
            <div className="space-y-2">
              <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                {seoContent.metaTitle || "Your page title will appear here"}
              </div>
              <div className="text-green-700 text-sm">
                www.yoursite.com
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                {seoContent.metaDescription || "Your meta description will appear here as a snippet that describes your page content to search engine users."}
              </div>
            </div>
          </div>

          {/* Character Counters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Title length:</span>
              <span className={`font-medium ${
                seoContent.metaTitle.length > 60 ? 'text-red-600' : 
                seoContent.metaTitle.length > 50 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {seoContent.metaTitle.length}/60
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Description length:</span>
              <span className={`font-medium ${
                seoContent.metaDescription.length > 160 ? 'text-red-600' : 
                seoContent.metaDescription.length > 150 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {seoContent.metaDescription.length}/160
              </span>
            </div>
          </div>
        </div>

        <AdminActionButtons
          onSave={handleSave}
          onReset={handleReset}
          isSaving={isSaving}
          saveDisabled={!hasChanges}
        />
      </AdminFormSection>
    </div>
  );
}

// Utility function to update meta tags in the document head
function updateMetaTags(seoContent: SEOContent) {
  // Update page title
  document.title = seoContent.metaTitle;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = seoContent.metaDescription;

  // Update or create meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = seoContent.metaKeywords;

  // Update Open Graph tags for social sharing
  updateOrCreateMetaTag('property', 'og:title', seoContent.metaTitle);
  updateOrCreateMetaTag('property', 'og:description', seoContent.metaDescription);
  
  // Update Twitter Card tags
  updateOrCreateMetaTag('name', 'twitter:title', seoContent.metaTitle);
  updateOrCreateMetaTag('name', 'twitter:description', seoContent.metaDescription);
}

function updateOrCreateMetaTag(attribute: string, value: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, value);
    document.head.appendChild(meta);
  }
  meta.content = content;
}
