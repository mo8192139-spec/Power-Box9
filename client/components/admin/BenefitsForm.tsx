import { useState, useEffect } from "react";
import { Star, Plus, Trash2, GripVertical } from "lucide-react";
import { AdminFormSection } from "./AdminFormSection";
import { AdminInput } from "./AdminInput";
import { AdminImageUpload } from "./AdminImageUpload";
import { AdminActionButtons } from "./AdminActionButtons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ContentStorage } from "@/lib/content-storage";
import { BenefitsContent, BenefitCard } from "@shared/admin-content-types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const iconOptions = [
  "Package",
  "Gift",
  "Zap",
  "Users",
  "Heart",
  "BadgeCheck",
  "Shield",
  "Star",
  "Check",
  "Truck",
  "Clock",
  "Award",
];

const colorOptions: Array<BenefitCard["color"]> = [
  "blue",
  "purple",
  "green",
  "orange",
  "red",
  "indigo",
];

export function BenefitsForm() {
  const [benefitsContent, setBenefitsContent] = useState<BenefitsContent>(() =>
    ContentStorage.getSectionContent("benefits"),
  );
  const [originalContent, setOriginalContent] =
    useState<BenefitsContent>(benefitsContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent("benefits");
    setBenefitsContent(content);
    setOriginalContent(content);
  }, []);

  const updateSectionTitle = (title: string) => {
    setBenefitsContent((prev) => ({ ...prev, sectionTitle: title }));
  };

  const updateBenefit = (
    index: number,
    field: keyof BenefitCard,
    value: any,
  ) => {
    setBenefitsContent((prev) => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) =>
        i === index ? { ...benefit, [field]: value } : benefit,
      ),
    }));
  };

  const addBenefit = () => {
    const newBenefit: BenefitCard = {
      id: `benefit-${Date.now()}`,
      title: "New Benefit",
      description: "Describe this benefit",
      image: "",
      iconName: "Star",
      color: "blue",
    };

    setBenefitsContent((prev) => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit],
    }));
  };

  const removeBenefit = (index: number) => {
    setBenefitsContent((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const moveBenefit = (fromIndex: number, toIndex: number) => {
    setBenefitsContent((prev) => {
      const newBenefits = [...prev.benefits];
      const [removed] = newBenefits.splice(fromIndex, 1);
      newBenefits.splice(toIndex, 0, removed);
      return { ...prev, benefits: newBenefits };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent(
        "benefits",
        benefitsContent,
      );
      if (success) {
        setOriginalContent(benefitsContent);
        toast({
          title: "Benefits section saved",
          description: "Changes have been saved successfully.",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error saving changes",
        description:
          "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setBenefitsContent(originalContent);
    toast({
      title: "Changes reset",
      description: "All changes have been reverted to the last saved state.",
    });
  };

  const hasChanges =
    JSON.stringify(benefitsContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Benefits Section"
        description="Configure the product benefits and features section"
        icon={<Star className="h-5 w-5" />}
      >
        {/* Section Title */}
        <AdminInput
          label="Section Title"
          value={benefitsContent.sectionTitle}
          onChange={updateSectionTitle}
          placeholder="Enter section title"
          required
          description="The main title for the benefits section"
        />

        {/* Benefits Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Benefits ({benefitsContent.benefits.length})
            </h3>
            <Button
              type="button"
              onClick={addBenefit}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Benefit
            </Button>
          </div>

          <div className="space-y-4">
            {benefitsContent.benefits.map((benefit, index) => (
              <Card key={benefit.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Drag Handle */}
                    <div className="flex flex-col items-center gap-2 pt-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                      <span className="text-xs text-gray-500 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>

                    {/* Benefit Form */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Left Column - Text Fields */}
                      <div className="space-y-4">
                        <AdminInput
                          label="Title"
                          value={benefit.title}
                          onChange={(value) =>
                            updateBenefit(index, "title", value)
                          }
                          placeholder="Benefit title"
                          required
                        />

                        <AdminInput
                          label="Description"
                          type="textarea"
                          value={benefit.description}
                          onChange={(value) =>
                            updateBenefit(index, "description", value)
                          }
                          placeholder="Benefit description"
                          required
                          rows={2}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Icon
                            </Label>
                            <Select
                              value={benefit.iconName}
                              onValueChange={(value) =>
                                updateBenefit(index, "iconName", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {iconOptions.map((icon) => (
                                  <SelectItem key={icon} value={icon}>
                                    {icon}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Color
                            </Label>
                            <Select
                              value={benefit.color}
                              onValueChange={(value) =>
                                updateBenefit(
                                  index,
                                  "color",
                                  value as BenefitCard["color"],
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {colorOptions.map((color) => (
                                  <SelectItem key={color} value={color}>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={cn(
                                          "w-3 h-3 rounded-full",
                                          color === "blue" && "bg-blue-500",
                                          color === "purple" && "bg-purple-500",
                                          color === "green" && "bg-green-500",
                                          color === "orange" && "bg-orange-500",
                                          color === "red" && "bg-red-500",
                                          color === "indigo" && "bg-indigo-500",
                                        )}
                                      />
                                      {color}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Image */}
                      <div>
                        <AdminImageUpload
                          label="Benefit Image"
                          value={benefit.image}
                          onChange={(value) =>
                            updateBenefit(index, "image", value)
                          }
                          aspectRatio="landscape"
                          description="Image representing this benefit"
                        />
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeBenefit(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {benefitsContent.benefits.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No benefits added yet.</p>
              <Button
                type="button"
                onClick={addBenefit}
                variant="outline"
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Benefit
              </Button>
            </div>
          )}
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
