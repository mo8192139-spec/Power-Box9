import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  Link as LinkIcon,
  ExternalLink,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import type { LinkSettings } from "@shared/admin-types";

interface LinksFormProps {
  data: LinkSettings[];
  onChange: (data: LinkSettings[]) => void;
}

const categoryOptions = [
  { value: "social", label: "Social Media", color: "blue" },
  { value: "footer", label: "Footer Link", color: "gray" },
  { value: "button", label: "Button Link", color: "green" },
  { value: "navigation", label: "Navigation", color: "purple" },
];

const socialIcons = [
  "Facebook",
  "Instagram",
  "Twitter",
  "Youtube",
  "LinkedIn",
  "TikTok",
  "Pinterest",
  "Snapchat",
];

export function LinksForm({ data, onChange }: LinksFormProps) {
  const [editingLink, setEditingLink] = useState<LinkSettings | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createNewLink = (): LinkSettings => ({
    id: generateId(),
    label: "",
    url: "",
    category: "footer",
    target: "_blank",
  });

  const handleDelete = (id: string) => {
    const updated = data.filter((link) => link.id !== id);
    onChange(updated);
  };

  const handleSave = (link: LinkSettings) => {
    if (isAddingNew) {
      onChange([...data, link]);
      setIsAddingNew(false);
    } else {
      const updated = data.map((l) => (l.id === link.id ? link : l));
      onChange(updated);
    }
    setEditingLink(null);
  };

  const handleEdit = (link: LinkSettings) => {
    setEditingLink({ ...link });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setEditingLink(createNewLink());
    setIsAddingNew(true);
  };

  const groupedLinks = data.reduce(
    (acc, link) => {
      if (!acc[link.category]) acc[link.category] = [];
      acc[link.category].push(link);
      return acc;
    },
    {} as Record<string, LinkSettings[]>,
  );

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
              <CardTitle>Links & Navigation</CardTitle>
              <CardDescription>
                Manage all links, social media connections, and navigation
                elements
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{data.length} links total</Badge>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Links by Category */}
      <div className="space-y-6">
        {categoryOptions.map((category) => {
          const links = groupedLinks[category.value] || [];
          return (
            <Card key={category.value}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Badge
                    variant="outline"
                    className={`bg-${category.color}-50 text-${category.color}-700`}
                  >
                    {links.length}
                  </Badge>
                  {category.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {links.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      No {category.label.toLowerCase()} added yet.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {links.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <LinkIcon className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {link.label}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              {link.url}
                              {link.target === "_blank" && (
                                <ExternalLink className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(link)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(link.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit/Add Modal */}
      <Dialog
        open={!!editingLink}
        onOpenChange={(open) => {
          if (!open) {
            setEditingLink(null);
            setIsAddingNew(false);
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? "Add New Link" : "Edit Link"}
            </DialogTitle>
            <DialogDescription>
              Configure the link details and destination
            </DialogDescription>
          </DialogHeader>

          {editingLink && (
            <LinkEditor
              link={editingLink}
              onChange={setEditingLink}
              onSave={handleSave}
              onCancel={() => {
                setEditingLink(null);
                setIsAddingNew(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Link Editor Component
interface LinkEditorProps {
  link: LinkSettings;
  onChange: (link: LinkSettings) => void;
  onSave: (link: LinkSettings) => void;
  onCancel: () => void;
}

function LinkEditor({ link, onChange, onSave, onCancel }: LinkEditorProps) {
  const updateField = (field: keyof LinkSettings, value: any) => {
    onChange({
      ...link,
      [field]: value,
    });
  };

  const handleSave = () => {
    if (!link.label.trim()) {
      alert("Please enter a link label");
      return;
    }
    if (!link.url.trim()) {
      alert("Please enter a URL");
      return;
    }
    onSave(link);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="linkLabel">Label *</Label>
        <Input
          id="linkLabel"
          value={link.label}
          onChange={(e) => updateField("label", e.target.value)}
          placeholder="e.g., Facebook, About Us, Contact"
        />
      </div>

      <div>
        <Label htmlFor="linkUrl">URL *</Label>
        <Input
          id="linkUrl"
          value={link.url}
          onChange={(e) => updateField("url", e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div>
        <Label htmlFor="linkCategory">Category</Label>
        <Select
          value={link.category}
          onValueChange={(value) => updateField("category", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {link.category === "social" && (
        <div>
          <Label htmlFor="linkIcon">Social Icon</Label>
          <Select
            value={link.icon || ""}
            onValueChange={(value) => updateField("icon", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select social platform" />
            </SelectTrigger>
            <SelectContent>
              {socialIcons.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="linkTarget">Open In</Label>
        <Select
          value={link.target}
          onValueChange={(value) => updateField("target", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_blank">New Tab</SelectItem>
            <SelectItem value="_self">Same Tab</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Link
        </Button>
      </div>
    </div>
  );
}
