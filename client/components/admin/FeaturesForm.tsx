import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  GripVertical,
  Upload,
  Eye,
  EyeOff,
  Save,
  X,
  Image as ImageIcon,
  Type,
  Palette,
  Package,
  Gift,
  Zap,
  Users,
  Heart,
  BadgeCheck,
  Shield,
  Star,
  Truck,
  Clock,
  CheckCircle,
  Award,
  Target,
  Sparkles,
  Crown,
  Gem,
  Lightbulb,
  Rocket,
  Trophy,
  Handshake,
  LucideIcon,
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Feature } from "@shared/admin-types";
import { cn } from "@/lib/utils";

interface FeaturesFormProps {
  data: Feature[];
  onChange: (data: Feature[]) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Package,
  Gift,
  Zap,
  Users,
  Heart,
  BadgeCheck,
  Shield,
  Star,
  Truck,
  Clock,
  CheckCircle,
  Award,
  Target,
  Sparkles,
  Crown,
  Gem,
  Lightbulb,
  Rocket,
  Trophy,
  Handshake,
};

const iconOptions = Object.keys(iconMap);

const colorOptions = [
  { value: "blue", label: "Blue", class: "text-blue-600" },
  { value: "purple", label: "Purple", class: "text-purple-600" },
  { value: "green", label: "Green", class: "text-green-600" },
  { value: "orange", label: "Orange", class: "text-orange-600" },
  { value: "red", label: "Red", class: "text-red-600" },
  { value: "indigo", label: "Indigo", class: "text-indigo-600" },
  { value: "yellow", label: "Yellow", class: "text-yellow-600" },
  { value: "pink", label: "Pink", class: "text-pink-600" },
  { value: "gray", label: "Gray", class: "text-gray-600" },
];

export function FeaturesForm({ data, onChange }: FeaturesFormProps) {
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createNewFeature = (): Feature => ({
    id: generateId(),
    icon: "Package",
    title: "",
    description: "",
    color: "blue",
    image: "",
    imageAlt: "",
    enabled: true,
    order: Math.max(...data.map((f) => f.order), 0) + 1,
  });

  const handleReorder = (newOrder: Feature[]) => {
    const reorderedFeatures = newOrder.map((feature, index) => ({
      ...feature,
      order: index + 1,
    }));
    onChange(reorderedFeatures);
  };

  const handleToggleEnabled = (id: string) => {
    const updated = data.map((feature) =>
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature,
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    const updated = data.filter((feature) => feature.id !== id);
    onChange(updated);
  };

  const handleSave = (feature: Feature) => {
    if (isAddingNew) {
      onChange([...data, feature]);
      setIsAddingNew(false);
    } else {
      const updated = data.map((f) => (f.id === feature.id ? feature : f));
      onChange(updated);
    }
    setEditingFeature(null);
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature({ ...feature });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setEditingFeature(createNewFeature());
    setIsAddingNew(true);
  };

  const enabledCount = data.filter((f) => f.enabled).length;
  const totalCount = data.length;

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
              <CardTitle>Features Management</CardTitle>
              <CardDescription>
                Add, edit, reorder, and manage feature highlights for your
                landing page
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">
                {enabledCount} of {totalCount} enabled
              </Badge>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Features List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Features</CardTitle>
          <CardDescription>
            Drag to reorder, toggle to enable/disable, or click edit to modify
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <Alert>
              <AlertDescription>
                No features added yet. Click "Add Feature" to create your first
                feature.
              </AlertDescription>
            </Alert>
          ) : (
            <Reorder.Group
              values={data}
              onReorder={handleReorder}
              className="space-y-3"
            >
              {data.map((feature) => (
                <Reorder.Item
                  key={feature.id}
                  value={feature}
                  className={cn(
                    "bg-white border rounded-lg p-4 cursor-grab active:cursor-grabbing",
                    feature.enabled
                      ? "border-gray-200"
                      : "border-gray-100 bg-gray-50",
                  )}
                  whileDrag={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Drag Handle */}
                    <div className="text-gray-400 hover:text-gray-600">
                      <GripVertical className="h-5 w-5" />
                    </div>

                    {/* Feature Icon & Content */}
                    <div className="flex-1 flex items-center gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          feature.enabled ? "bg-blue-100" : "bg-gray-100",
                        )}
                      >
                        {/* Icon placeholder - we'll use dynamic icons in actual implementation */}
                        {(() => {
                          const IconComponent =
                            iconMap[feature.icon] || Package;
                          return (
                            <IconComponent
                              className={cn(
                                "w-6 h-6",
                                feature.enabled
                                  ? colorOptions.find(
                                      (c) => c.value === feature.color,
                                    )?.class || "text-blue-600"
                                  : "text-gray-400",
                              )}
                            />
                          );
                        })()}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={cn(
                              "font-medium",
                              feature.enabled
                                ? "text-gray-900"
                                : "text-gray-500",
                            )}
                          >
                            {feature.title || "Untitled Feature"}
                          </h4>
                          {!feature.enabled && (
                            <Badge variant="secondary" className="text-xs">
                              Disabled
                            </Badge>
                          )}
                        </div>
                        <p
                          className={cn(
                            "text-sm",
                            feature.enabled ? "text-gray-600" : "text-gray-400",
                          )}
                        >
                          {feature.description || "No description"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => handleToggleEnabled(feature.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(feature)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(feature.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Dialog
        open={!!editingFeature}
        onOpenChange={(open) => {
          if (!open) {
            setEditingFeature(null);
            setIsAddingNew(false);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? "Add New Feature" : "Edit Feature"}
            </DialogTitle>
            <DialogDescription>
              Configure the feature details, appearance, and content
            </DialogDescription>
          </DialogHeader>

          {editingFeature && (
            <FeatureEditor
              feature={editingFeature}
              onChange={setEditingFeature}
              onSave={handleSave}
              onCancel={() => {
                setEditingFeature(null);
                setIsAddingNew(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Feature Editor Component
interface FeatureEditorProps {
  feature: Feature;
  onChange: (feature: Feature) => void;
  onSave: (feature: Feature) => void;
  onCancel: () => void;
}

function FeatureEditor({
  feature,
  onChange,
  onSave,
  onCancel,
}: FeatureEditorProps) {
  const [imagePreview, setImagePreview] = useState<string>(feature.image);

  const updateField = (field: keyof Feature, value: any) => {
    onChange({
      ...feature,
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
        updateField("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!feature.title.trim()) {
      alert("Please enter a feature title");
      return;
    }
    onSave(feature);
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Basic Information</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="featureTitle">Title *</Label>
            <Input
              id="featureTitle"
              value={feature.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter feature title..."
            />
          </div>

          <div>
            <Label htmlFor="featureDescription">Description</Label>
            <Textarea
              id="featureDescription"
              value={feature.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe this feature..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Appearance</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="featureIcon">Icon</Label>
            <Select
              value={feature.icon}
              onValueChange={(value) => updateField("icon", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((icon) => {
                  const IconComponent = iconMap[icon];
                  return (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {icon}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="featureColor">Color Theme</Label>
            <Select
              value={feature.color}
              onValueChange={(value) => updateField("color", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          `bg-${color.value}-600`,
                        )}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Feature Image */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Feature Image</h3>
        </div>

        {imagePreview && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <img
              src={imagePreview}
              alt="Feature preview"
              className="w-full max-w-sm h-32 object-cover bg-gray-50 rounded-lg border"
            />
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Label htmlFor="featureImage">Image URL</Label>
            <Input
              id="featureImage"
              value={feature.image}
              onChange={(e) => {
                updateField("image", e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="featureImageUpload">Or Upload Image</Label>
            <Input
              id="featureImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <Label htmlFor="featureImageAlt">Image Alt Text</Label>
            <Input
              id="featureImageAlt"
              value={feature.imageAlt}
              onChange={(e) => updateField("imageAlt", e.target.value)}
              placeholder="Describe the image for accessibility..."
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Feature
        </Button>
      </div>
    </div>
  );
}
