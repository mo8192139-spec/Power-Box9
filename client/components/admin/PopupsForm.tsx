import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Save,
  X,
  MessageSquare,
  Upload,
  Clock,
  MousePointer,
  Scroll,
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
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PopupContent } from "@shared/admin-types";

interface PopupsFormProps {
  data: PopupContent[];
  onChange: (data: PopupContent[]) => void;
}

const popupTypes = [
  {
    value: "exit-intent",
    label: "Exit Intent",
    icon: MousePointer,
    description: "Triggers when user moves cursor to leave the page",
  },
  {
    value: "timed",
    label: "Timed Popup",
    icon: Clock,
    description: "Appears after a specified delay",
  },
  {
    value: "scroll",
    label: "Scroll Triggered",
    icon: Scroll,
    description: "Triggers when user scrolls to a certain percentage",
  },
];

export function PopupsForm({ data, onChange }: PopupsFormProps) {
  const [editingPopup, setEditingPopup] = useState<PopupContent | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createNewPopup = (): PopupContent => ({
    id: generateId(),
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    enabled: true,
    type: "exit-intent",
  });

  const handleToggleEnabled = (id: string) => {
    const updated = data.map((popup) =>
      popup.id === id ? { ...popup, enabled: !popup.enabled } : popup,
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    const updated = data.filter((popup) => popup.id !== id);
    onChange(updated);
  };

  const handleSave = (popup: PopupContent) => {
    if (isAddingNew) {
      onChange([...data, popup]);
      setIsAddingNew(false);
    } else {
      const updated = data.map((p) => (p.id === popup.id ? popup : p));
      onChange(updated);
    }
    setEditingPopup(null);
  };

  const handleEdit = (popup: PopupContent) => {
    setEditingPopup({ ...popup });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setEditingPopup(createNewPopup());
    setIsAddingNew(true);
  };

  const enabledCount = data.filter((p) => p.enabled).length;

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
              <CardTitle>Popups & Modals</CardTitle>
              <CardDescription>
                Manage exit intent popups, timed modals, and promotional
                overlays
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={enabledCount > 0 ? "default" : "secondary"}>
                {enabledCount} active
              </Badge>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Popup
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Popups List */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <Alert>
                <AlertDescription>
                  No popups created yet. Click "Add Popup" to create your first
                  popup or modal.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          data.map((popup) => {
            const typeInfo = popupTypes.find((t) => t.value === popup.type);
            const TypeIcon = typeInfo?.icon || MessageSquare;

            return (
              <motion.div
                key={popup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-all ${
                  popup.enabled
                    ? "border-l-4 border-l-blue-500"
                    : "border-l-4 border-l-gray-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon & Status */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        popup.enabled ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <TypeIcon
                        className={`h-6 w-6 ${
                          popup.enabled ? "text-blue-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`font-medium ${
                            popup.enabled ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {popup.title || "Untitled Popup"}
                        </h4>
                        <Badge
                          variant={popup.enabled ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {typeInfo?.label}
                        </Badge>
                        {!popup.enabled && (
                          <Badge variant="outline" className="text-xs">
                            Disabled
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-sm mb-3 ${
                        popup.enabled ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {popup.description || "No description"}
                    </p>

                    {/* Trigger Settings */}
                    <div className="text-xs text-gray-500 mb-3">
                      <span className="font-medium">
                        {typeInfo?.description}
                      </span>
                      {popup.type === "timed" && popup.delay && (
                        <span> • Delay: {popup.delay}ms</span>
                      )}
                      {popup.type === "scroll" && popup.scrollPercentage && (
                        <span>
                          {" "}
                          • Trigger at {popup.scrollPercentage}% scroll
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">
                        Primary: {popup.buttonText || "No text"}
                      </Badge>
                      {popup.secondaryButtonText && (
                        <Badge variant="outline">
                          Secondary: {popup.secondaryButtonText}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={popup.enabled}
                      onCheckedChange={() => handleToggleEnabled(popup.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(popup)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(popup.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Edit/Add Modal */}
      <Dialog
        open={!!editingPopup}
        onOpenChange={(open) => {
          if (!open) {
            setEditingPopup(null);
            setIsAddingNew(false);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? "Add New Popup" : "Edit Popup"}
            </DialogTitle>
            <DialogDescription>
              Configure popup content, appearance, and trigger settings
            </DialogDescription>
          </DialogHeader>

          {editingPopup && (
            <PopupEditor
              popup={editingPopup}
              onChange={setEditingPopup}
              onSave={handleSave}
              onCancel={() => {
                setEditingPopup(null);
                setIsAddingNew(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Popup Editor Component
interface PopupEditorProps {
  popup: PopupContent;
  onChange: (popup: PopupContent) => void;
  onSave: (popup: PopupContent) => void;
  onCancel: () => void;
}

function PopupEditor({ popup, onChange, onSave, onCancel }: PopupEditorProps) {
  const [imagePreview, setImagePreview] = useState<string>(popup.image || "");

  const updateField = (field: keyof PopupContent, value: any) => {
    onChange({
      ...popup,
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
    if (!popup.title.trim()) {
      alert("Please enter a popup title");
      return;
    }
    if (!popup.buttonText.trim()) {
      alert("Please enter button text");
      return;
    }
    onSave(popup);
  };

  const selectedType = popupTypes.find((t) => t.value === popup.type);

  return (
    <div className="space-y-6">
      {/* Basic Content */}
      <div className="space-y-4">
        <h3 className="font-medium">Content</h3>

        <div className="space-y-3">
          <div>
            <Label htmlFor="popupTitle">Title *</Label>
            <Input
              id="popupTitle"
              value={popup.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Don't Miss Out!"
            />
          </div>

          <div>
            <Label htmlFor="popupSubtitle">Subtitle (Optional)</Label>
            <Input
              id="popupSubtitle"
              value={popup.subtitle || ""}
              onChange={(e) => updateField("subtitle", e.target.value)}
              placeholder="Get 15% off your first order"
            />
          </div>

          <div>
            <Label htmlFor="popupDescription">Description</Label>
            <Textarea
              id="popupDescription"
              value={popup.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Join our newsletter and receive exclusive deals..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4">
        <h3 className="font-medium">Action Buttons</h3>

        <div className="space-y-4">
          {/* Primary Button */}
          <div className="p-4 bg-blue-50 rounded-lg border">
            <h4 className="font-medium text-blue-900 mb-3">Primary Button</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="buttonText">Button Text *</Label>
                <Input
                  id="buttonText"
                  value={popup.buttonText}
                  onChange={(e) => updateField("buttonText", e.target.value)}
                  placeholder="Get 15% Off"
                />
              </div>
              <div>
                <Label htmlFor="buttonLink">Button Link</Label>
                <Input
                  id="buttonLink"
                  value={popup.buttonLink}
                  onChange={(e) => updateField("buttonLink", e.target.value)}
                  placeholder="#newsletter or https://..."
                />
              </div>
            </div>
          </div>

          {/* Secondary Button */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">
              Secondary Button (Optional)
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="secondaryButtonText">Button Text</Label>
                <Input
                  id="secondaryButtonText"
                  value={popup.secondaryButtonText || ""}
                  onChange={(e) =>
                    updateField("secondaryButtonText", e.target.value)
                  }
                  placeholder="No Thanks"
                />
              </div>
              <div>
                <Label htmlFor="secondaryButtonLink">Button Link</Label>
                <Input
                  id="secondaryButtonLink"
                  value={popup.secondaryButtonLink || ""}
                  onChange={(e) =>
                    updateField("secondaryButtonLink", e.target.value)
                  }
                  placeholder="#close or https://..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Image */}
      <div className="space-y-4">
        <h3 className="font-medium">Image (Optional)</h3>

        {imagePreview && (
          <div className="space-y-2">
            <img
              src={imagePreview}
              alt="Popup preview"
              className="w-full max-w-sm h-32 object-cover bg-gray-50 rounded-lg border"
            />
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Label htmlFor="popupImage">Image URL</Label>
            <Input
              id="popupImage"
              value={popup.image || ""}
              onChange={(e) => {
                updateField("image", e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="popupImageUpload">Or Upload Image</Label>
            <Input
              id="popupImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {popup.image && (
            <div>
              <Label htmlFor="popupImageAlt">Image Alt Text</Label>
              <Input
                id="popupImageAlt"
                value={popup.imageAlt || ""}
                onChange={(e) => updateField("imageAlt", e.target.value)}
                placeholder="Describe the image..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Trigger Settings */}
      <div className="space-y-4">
        <h3 className="font-medium">Trigger Settings</h3>

        <div>
          <Label htmlFor="popupType">Popup Type</Label>
          <Select
            value={popup.type}
            onValueChange={(value) => updateField("type", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {popupTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedType && (
            <p className="text-xs text-gray-500 mt-1">
              {selectedType.description}
            </p>
          )}
        </div>

        {popup.type === "timed" && (
          <div>
            <Label htmlFor="popupDelay">Delay (milliseconds)</Label>
            <Input
              id="popupDelay"
              type="number"
              value={popup.delay || ""}
              onChange={(e) =>
                updateField("delay", parseInt(e.target.value) || undefined)
              }
              placeholder="5000"
            />
            <p className="text-xs text-gray-500 mt-1">
              How long to wait before showing the popup (5000 = 5 seconds)
            </p>
          </div>
        )}

        {popup.type === "scroll" && (
          <div>
            <Label htmlFor="scrollPercentage">Scroll Percentage</Label>
            <Input
              id="scrollPercentage"
              type="number"
              min="0"
              max="100"
              value={popup.scrollPercentage || ""}
              onChange={(e) =>
                updateField(
                  "scrollPercentage",
                  parseInt(e.target.value) || undefined,
                )
              }
              placeholder="50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Show popup when user scrolls this percentage down the page
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Popup
        </Button>
      </div>
    </div>
  );
}
