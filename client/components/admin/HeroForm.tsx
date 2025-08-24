import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { AdminFormSection } from "./AdminFormSection";
import { AdminInput } from "./AdminInput";
import { AdminImageUpload } from "./AdminImageUpload";
import { AdminActionButtons } from "./AdminActionButtons";
import { ContentStorage } from "@/lib/content-storage";
import { HeroContent } from "@shared/admin-content-types";
import { useToast } from "@/hooks/use-toast";

export function HeroForm() {
  const [heroContent, setHeroContent] = useState<HeroContent>(() => 
    ContentStorage.getSectionContent('hero')
  );
  const [originalContent, setOriginalContent] = useState<HeroContent>(heroContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('hero');
    setHeroContent(content);
    setOriginalContent(content);
  }, []);

  const updateField = <K extends keyof HeroContent>(
    field: K, 
    value: HeroContent[K]
  ) => {
    setHeroContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('hero', heroContent);
      if (success) {
        setOriginalContent(heroContent);
        toast({
          title: "Hero section saved",
          description: "Changes have been saved successfully.",
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
    setHeroContent(originalContent);
    toast({
      title: "Changes reset",
      description: "All changes have been reverted to the last saved state.",
    });
  };

  const hasChanges = JSON.stringify(heroContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Hero Section"
        description="Configure the main hero section with title, pricing, and primary image"
        icon={<Home className="h-5 w-5" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Text Content */}
          <div className="space-y-4">
            <AdminInput
              label="Product Title"
              type="textarea"
              value={heroContent.title}
              onChange={(value) => updateField('title', value as string)}
              placeholder="Enter the main product title"
              required
              rows={3}
              description="This is the main headline that appears at the top of the page"
            />

            <div className="grid grid-cols-2 gap-4">
              <AdminInput
                label="Rating"
                type="number"
                value={heroContent.rating}
                onChange={(value) => updateField('rating', value as number)}
                min={0}
                max={5}
                step={0.1}
                required
                description="Star rating (0-5)"
              />

              <AdminInput
                label="Review Count"
                type="number"
                value={heroContent.reviewCount}
                onChange={(value) => updateField('reviewCount', value as number)}
                min={0}
                required
                description="Number of reviews"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <AdminInput
                label="Sale Price"
                type="number"
                value={heroContent.salePrice}
                onChange={(value) => updateField('salePrice', value as number)}
                min={0}
                step={0.01}
                required
                description="Current sale price in USD"
              />

              <AdminInput
                label="Regular Price"
                type="number"
                value={heroContent.regularPrice}
                onChange={(value) => updateField('regularPrice', value as number)}
                min={0}
                step={0.01}
                required
                description="Original price for comparison"
              />
            </div>

            <AdminInput
              label="Walmart URL"
              type="url"
              value={heroContent.walmartUrl}
              onChange={(value) => updateField('walmartUrl', value as string)}
              placeholder="https://www.walmart.com/..."
              required
              description="Link to the product page on Walmart"
            />
          </div>

          {/* Right Column - Image */}
          <div>
            <AdminImageUpload
              label="Hero Image"
              value={heroContent.mainImage}
              onChange={(value) => updateField('mainImage', value)}
              required
              aspectRatio="landscape"
              description="Main product image displayed in the hero section"
            />
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
