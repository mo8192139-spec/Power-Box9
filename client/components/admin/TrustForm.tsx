import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { AdminFormSection } from "./AdminFormSection";
import { AdminInput } from "./AdminInput";
import { AdminActionButtons } from "./AdminActionButtons";
import { ContentStorage } from "@/lib/content-storage";
import { TrustContent } from "@shared/admin-content-types";
import { useToast } from "@/hooks/use-toast";

export function TrustForm() {
  const [trustContent, setTrustContent] = useState<TrustContent>(() => 
    ContentStorage.getSectionContent('trust')
  );
  const [originalContent, setOriginalContent] = useState<TrustContent>(trustContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('trust');
    setTrustContent(content);
    setOriginalContent(content);
  }, []);

  const updateField = <K extends keyof TrustContent>(
    field: K, 
    value: TrustContent[K]
  ) => {
    setTrustContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('trust', trustContent);
      if (success) {
        setOriginalContent(trustContent);
        toast({
          title: "Trust section saved",
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
    setTrustContent(originalContent);
    toast({
      title: "Changes reset",
      description: "All changes have been reverted to the last saved state.",
    });
  };

  const hasChanges = JSON.stringify(trustContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Trust Section"
        description="Configure trust indicators including Walmart branding and seller information"
        icon={<Shield className="h-5 w-5" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Walmart Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Walmart Information</h3>
            
            <AdminInput
              label="Walmart Title"
              value={trustContent.walmartTitle}
              onChange={(value) => updateField('walmartTitle', value as string)}
              placeholder="e.g., Official Walmart Seller"
              required
              description="Title for Walmart trust indicator"
            />

            <AdminInput
              label="Walmart Description"
              value={trustContent.walmartDescription}
              onChange={(value) => updateField('walmartDescription', value as string)}
              placeholder="e.g., Secure checkout and fast delivery"
              required
              description="Description for Walmart trust indicator"
            />
          </div>

          {/* Seller Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Seller Information</h3>
            
            <AdminInput
              label="Seller Title"
              value={trustContent.sellerTitle}
              onChange={(value) => updateField('sellerTitle', value as string)}
              placeholder="e.g., Pro Seller"
              required
              description="Title for seller rating section"
            />

            <div className="grid grid-cols-2 gap-4">
              <AdminInput
                label="Seller Rating"
                type="number"
                value={trustContent.sellerRating}
                onChange={(value) => updateField('sellerRating', value as number)}
                min={0}
                max={5}
                step={0.01}
                required
                description="Seller star rating (0-5)"
              />

              <AdminInput
                label="Review Count"
                type="number"
                value={trustContent.sellerReviewCount}
                onChange={(value) => updateField('sellerReviewCount', value as number)}
                min={0}
                required
                description="Number of seller reviews"
              />
            </div>
          </div>
        </div>

        {/* Returns Policy Section */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Returns Policy</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AdminInput
              label="Returns Title"
              value={trustContent.returnsTitle}
              onChange={(value) => updateField('returnsTitle', value as string)}
              placeholder="e.g., Free 90-Day Returns"
              required
              description="Title for returns policy"
            />

            <AdminInput
              label="Returns Description"
              value={trustContent.returnsDescription}
              onChange={(value) => updateField('returnsDescription', value as string)}
              placeholder="e.g., Shop with confidence - easy returns"
              required
              description="Description for returns policy"
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
