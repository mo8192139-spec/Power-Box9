import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  Upload,
  Star,
  Save,
  X,
  User,
  MapPin,
  Calendar,
  CheckCircle2,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Testimonial } from "@shared/admin-types";
import { cn } from "@/lib/utils";

interface TestimonialsFormProps {
  data: Testimonial[];
  onChange: (data: Testimonial[]) => void;
}

export function TestimonialsForm({ data, onChange }: TestimonialsFormProps) {
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createNewTestimonial = (): Testimonial => ({
    id: generateId(),
    name: "",
    rating: 5,
    review: "",
    profileImage: "",
    verified: true,
    location: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  const handleDelete = (id: string) => {
    const updated = data.filter((testimonial) => testimonial.id !== id);
    onChange(updated);
  };

  const handleSave = (testimonial: Testimonial) => {
    if (isAddingNew) {
      onChange([...data, testimonial]);
      setIsAddingNew(false);
    } else {
      const updated = data.map((t) =>
        t.id === testimonial.id ? testimonial : t,
      );
      onChange(updated);
    }
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setEditingTestimonial(createNewTestimonial());
    setIsAddingNew(true);
  };

  const averageRating =
    data.length > 0
      ? (data.reduce((sum, t) => sum + t.rating, 0) / data.length).toFixed(1)
      : "0";

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
              <CardTitle>Testimonials Management</CardTitle>
              <CardDescription>
                Add, edit, and manage customer reviews and testimonials
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{averageRating}</span>
                </div>
                <p className="text-xs text-gray-500">{data.length} reviews</p>
              </div>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Review
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Testimonials List */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <Alert>
                <AlertDescription>
                  No testimonials added yet. Click "Add Review" to create your
                  first customer testimonial.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          data.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage
                    src={testimonial.profileImage}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {testimonial.name || "Anonymous"}
                      </h4>
                      {testimonial.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {testimonial.rating}/5
                    </span>
                  </div>

                  {/* Review */}
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {testimonial.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </div>
                    )}
                    {testimonial.purchaseDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(
                          testimonial.purchaseDate,
                        ).toLocaleDateString()}
                      </div>
                    )}
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Edit/Add Modal */}
      <Dialog
        open={!!editingTestimonial}
        onOpenChange={(open) => {
          if (!open) {
            setEditingTestimonial(null);
            setIsAddingNew(false);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? "Add New Testimonial" : "Edit Testimonial"}
            </DialogTitle>
            <DialogDescription>
              Configure the customer review details and rating
            </DialogDescription>
          </DialogHeader>

          {editingTestimonial && (
            <TestimonialEditor
              testimonial={editingTestimonial}
              onChange={setEditingTestimonial}
              onSave={handleSave}
              onCancel={() => {
                setEditingTestimonial(null);
                setIsAddingNew(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Testimonial Editor Component
interface TestimonialEditorProps {
  testimonial: Testimonial;
  onChange: (testimonial: Testimonial) => void;
  onSave: (testimonial: Testimonial) => void;
  onCancel: () => void;
}

function TestimonialEditor({
  testimonial,
  onChange,
  onSave,
  onCancel,
}: TestimonialEditorProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    testimonial.profileImage,
  );

  const updateField = (field: keyof Testimonial, value: any) => {
    onChange({
      ...testimonial,
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
        updateField("profileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!testimonial.name.trim()) {
      alert("Please enter a customer name");
      return;
    }
    if (!testimonial.review.trim()) {
      alert("Please enter a review");
      return;
    }
    onSave(testimonial);
  };

  return (
    <div className="space-y-6">
      {/* Customer Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Customer Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              value={testimonial.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              value={testimonial.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="California, US"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="purchaseDate">Purchase Date (Optional)</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={testimonial.purchaseDate || ""}
              onChange={(e) => updateField("purchaseDate", e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="verified"
              checked={testimonial.verified}
              onCheckedChange={(checked) => updateField("verified", checked)}
            />
            <Label htmlFor="verified">Verified Purchase</Label>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="space-y-4">
        <h3 className="font-medium">Profile Image</h3>

        {imagePreview && (
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={imagePreview} alt="Profile preview" />
              <AvatarFallback>
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm text-gray-600">Current profile image</div>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Label htmlFor="profileImage">Image URL</Label>
            <Input
              id="profileImage"
              value={testimonial.profileImage}
              onChange={(e) => {
                updateField("profileImage", e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/profile.jpg"
            />
          </div>

          <div>
            <Label htmlFor="profileImageUpload">Or Upload Image</Label>
            <Input
              id="profileImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>

      {/* Rating & Review */}
      <div className="space-y-4">
        <h3 className="font-medium">Rating & Review</h3>

        <div>
          <Label htmlFor="rating">Rating</Label>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-6 w-6 cursor-pointer transition-colors",
                    star <= testimonial.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 hover:text-yellow-200",
                  )}
                  onClick={() => updateField("rating", star)}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {testimonial.rating} of 5 stars
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="review">Review Text *</Label>
          <Textarea
            id="review"
            value={testimonial.review}
            onChange={(e) => updateField("review", e.target.value)}
            placeholder="Write the customer's review..."
            className="min-h-[120px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Write in the customer's voice. Keep it authentic and helpful.
          </p>
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
          Save Testimonial
        </Button>
      </div>
    </div>
  );
}
