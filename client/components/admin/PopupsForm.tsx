import { useState, useEffect } from "react";
import { Zap, MousePointer } from "lucide-react";
import { AdminFormSection } from "./AdminFormSection";
import { AdminInput } from "./AdminInput";
import { AdminActionButtons } from "./AdminActionButtons";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentStorage } from "@/lib/content-storage";
import { PopupsContent, PopupContent } from "@shared/admin-content-types";
import { useToast } from "@/hooks/use-toast";

export function PopupsForm() {
  const [popupsContent, setPopupsContent] = useState<PopupsContent>(() => 
    ContentStorage.getSectionContent('popups')
  );
  const [originalContent, setOriginalContent] = useState<PopupsContent>(popupsContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('popups');
    setPopupsContent(content);
    setOriginalContent(content);
  }, []);

  const updatePopup = (popupType: 'buttonTriggeredPopup' | 'exitIntentPopup', field: keyof PopupContent, value: any) => {
    setPopupsContent(prev => ({
      ...prev,
      [popupType]: {
        ...prev[popupType],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('popups', popupsContent);
      if (success) {
        setOriginalContent(popupsContent);
        toast({
          title: "Popups settings saved",
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
    setPopupsContent(originalContent);
    toast({
      title: "Changes reset",
      description: "All changes have been reverted to the last saved state.",
    });
  };

  const hasChanges = JSON.stringify(popupsContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Popup Management"
        description="Configure popup content and behavior for lead generation and user engagement"
        icon={<Zap className="h-5 w-5" />}
      >
        <div className="space-y-8">
          {/* Button Triggered Popup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-blue-600" />
                Button Triggered Popup
              </CardTitle>
              <p className="text-sm text-gray-600">
                Popup that appears when users click a specific button or CTA
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="button-popup-enabled" className="text-sm font-medium">
                  Enable Button Popup
                </Label>
                <Switch
                  id="button-popup-enabled"
                  checked={popupsContent.buttonTriggeredPopup.enabled}
                  onCheckedChange={(checked) => updatePopup('buttonTriggeredPopup', 'enabled', checked)}
                />
              </div>

              <AdminInput
                label="Popup Title"
                value={popupsContent.buttonTriggeredPopup.title}
                onChange={(value) => updatePopup('buttonTriggeredPopup', 'title', value)}
                placeholder="Enter popup title"
                required
              />

              <AdminInput
                label="Content Text"
                type="textarea"
                value={popupsContent.buttonTriggeredPopup.content}
                onChange={(value) => updatePopup('buttonTriggeredPopup', 'content', value)}
                placeholder="Enter popup content"
                required
                rows={3}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput
                  label="Button Text"
                  value={popupsContent.buttonTriggeredPopup.buttonText}
                  onChange={(value) => updatePopup('buttonTriggeredPopup', 'buttonText', value)}
                  placeholder="e.g., Claim Offer"
                  required
                />

                <AdminInput
                  label="Button Link"
                  type="url"
                  value={popupsContent.buttonTriggeredPopup.buttonLink}
                  onChange={(value) => updatePopup('buttonTriggeredPopup', 'buttonLink', value)}
                  placeholder="https://..."
                  required
                />
              </div>

              <AdminInput
                label="Email Link (Optional)"
                type="email"
                value={popupsContent.buttonTriggeredPopup.emailLink || ''}
                onChange={(value) => updatePopup('buttonTriggeredPopup', 'emailLink', value)}
                placeholder="mailto:offers@example.com?subject=Special Offer"
                description="Optional email link for lead collection"
              />

              {/* Preview */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
                  <h3 className="text-lg font-bold mb-2">
                    {popupsContent.buttonTriggeredPopup.title || "Popup Title"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {popupsContent.buttonTriggeredPopup.content || "Popup content will appear here"}
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                    {popupsContent.buttonTriggeredPopup.buttonText || "Button Text"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exit Intent Popup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                Exit Intent Popup
              </CardTitle>
              <p className="text-sm text-gray-600">
                Popup that appears when users attempt to leave the page
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="exit-popup-enabled" className="text-sm font-medium">
                  Enable Exit Intent Popup
                </Label>
                <Switch
                  id="exit-popup-enabled"
                  checked={popupsContent.exitIntentPopup.enabled}
                  onCheckedChange={(checked) => updatePopup('exitIntentPopup', 'enabled', checked)}
                />
              </div>

              <AdminInput
                label="Popup Title"
                value={popupsContent.exitIntentPopup.title}
                onChange={(value) => updatePopup('exitIntentPopup', 'title', value)}
                placeholder="Enter popup title"
                required
              />

              <AdminInput
                label="Content Text"
                type="textarea"
                value={popupsContent.exitIntentPopup.content}
                onChange={(value) => updatePopup('exitIntentPopup', 'content', value)}
                placeholder="Enter popup content"
                required
                rows={3}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput
                  label="Button Text"
                  value={popupsContent.exitIntentPopup.buttonText}
                  onChange={(value) => updatePopup('exitIntentPopup', 'buttonText', value)}
                  placeholder="e.g., Subscribe Now"
                  required
                />

                <AdminInput
                  label="Button Link"
                  type="url"
                  value={popupsContent.exitIntentPopup.buttonLink}
                  onChange={(value) => updatePopup('exitIntentPopup', 'buttonLink', value)}
                  placeholder="https://... or mailto:..."
                  required
                />
              </div>

              <AdminInput
                label="Email Link (Optional)"
                type="email"
                value={popupsContent.exitIntentPopup.emailLink || ''}
                onChange={(value) => updatePopup('exitIntentPopup', 'emailLink', value)}
                placeholder="mailto:newsletter@example.com?subject=Newsletter"
                description="Optional email link for newsletter subscription"
              />

              {/* Preview */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md border-l-4 border-orange-500">
                  <h3 className="text-lg font-bold mb-2">
                    {popupsContent.exitIntentPopup.title || "Exit Popup Title"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {popupsContent.exitIntentPopup.content || "Exit popup content will appear here"}
                  </p>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium">
                    {popupsContent.exitIntentPopup.buttonText || "Button Text"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
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
