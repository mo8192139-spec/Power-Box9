import { useState, useEffect } from "react";
import { Image, MessageCircle, Megaphone, Link, Plus, Trash2 } from "lucide-react";
import { AdminFormSection } from "./AdminFormSection";
import { AdminInput } from "./AdminInput";
import { AdminImageUpload } from "./AdminImageUpload";
import { AdminActionButtons } from "./AdminActionButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContentStorage } from "@/lib/content-storage";
import { GalleryContent, ReviewsContent, FinalCTAContent, FooterContent, CustomerReview, SocialLink } from "@shared/admin-content-types";
import { useToast } from "@/hooks/use-toast";

// Gallery Form Component
export function GalleryForm() {
  const [galleryContent, setGalleryContent] = useState<GalleryContent>(() => 
    ContentStorage.getSectionContent('gallery')
  );
  const [originalContent, setOriginalContent] = useState<GalleryContent>(galleryContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('gallery');
    setGalleryContent(content);
    setOriginalContent(content);
  }, []);

  const updateSectionTitle = (title: string) => {
    setGalleryContent(prev => ({ ...prev, sectionTitle: title }));
  };

  const updateImage = (index: number, field: keyof GalleryContent['images'][0], value: string) => {
    setGalleryContent(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const addImage = () => {
    const newImage = {
      id: `img-${Date.now()}`,
      url: "",
      title: "New Image",
      alt: "Product image"
    };
    
    setGalleryContent(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
  };

  const removeImage = (index: number) => {
    setGalleryContent(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('gallery', galleryContent);
      if (success) {
        setOriginalContent(galleryContent);
        toast({ title: "Gallery section saved", description: "Changes have been saved successfully." });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({ title: "Error saving changes", description: "There was a problem saving your changes. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setGalleryContent(originalContent);
    toast({ title: "Changes reset", description: "All changes have been reverted to the last saved state." });
  };

  const hasChanges = JSON.stringify(galleryContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Gallery Section"
        description="Configure the product image gallery"
        icon={<Image className="h-5 w-5" />}
      >
        <AdminInput
          label="Section Title"
          value={galleryContent.sectionTitle}
          onChange={updateSectionTitle}
          placeholder="Enter section title"
          required
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Images ({galleryContent.images.length})</h3>
            <Button type="button" onClick={addImage} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>

          <div className="space-y-4">
            {galleryContent.images.map((image, index) => (
              <Card key={image.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <AdminInput
                        label="Title"
                        value={image.title}
                        onChange={(value) => updateImage(index, 'title', value as string)}
                        required
                      />
                      <AdminInput
                        label="Alt Text"
                        value={image.alt}
                        onChange={(value) => updateImage(index, 'alt', value as string)}
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <AdminImageUpload
                        label="Image"
                        value={image.url}
                        onChange={(value) => updateImage(index, 'url', value)}
                        aspectRatio="landscape"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Image
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

// Reviews Form Component
export function ReviewsForm() {
  const [reviewsContent, setReviewsContent] = useState<ReviewsContent>(() => 
    ContentStorage.getSectionContent('reviews')
  );
  const [originalContent, setOriginalContent] = useState<ReviewsContent>(reviewsContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('reviews');
    setReviewsContent(content);
    setOriginalContent(content);
  }, []);

  const updateField = <K extends keyof ReviewsContent>(field: K, value: ReviewsContent[K]) => {
    setReviewsContent(prev => ({ ...prev, [field]: value }));
  };

  const updateReview = (index: number, field: keyof CustomerReview, value: any) => {
    setReviewsContent(prev => ({
      ...prev,
      reviews: prev.reviews.map((review, i) => 
        i === index ? { ...review, [field]: value } : review
      )
    }));
  };

  const addReview = () => {
    const newReview: CustomerReview = {
      id: `review-${Date.now()}`,
      name: "New Customer",
      photo: "",
      rating: 5,
      review: "Great product!"
    };
    
    setReviewsContent(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }));
  };

  const removeReview = (index: number) => {
    setReviewsContent(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('reviews', reviewsContent);
      if (success) {
        setOriginalContent(reviewsContent);
        toast({ title: "Reviews section saved", description: "Changes have been saved successfully." });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({ title: "Error saving changes", description: "There was a problem saving your changes. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setReviewsContent(originalContent);
    toast({ title: "Changes reset", description: "All changes have been reverted to the last saved state." });
  };

  const hasChanges = JSON.stringify(reviewsContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Reviews Section"
        description="Configure customer reviews and testimonials"
        icon={<MessageCircle className="h-5 w-5" />}
      >
        <AdminInput
          label="Section Title"
          value={reviewsContent.sectionTitle}
          onChange={(value) => updateField('sectionTitle', value as string)}
          required
        />

        <AdminInput
          label="Section Description"
          value={reviewsContent.sectionDescription}
          onChange={(value) => updateField('sectionDescription', value as string)}
          required
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Customer Reviews ({reviewsContent.reviews.length})</h3>
            <Button type="button" onClick={addReview} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
          </div>

          <div className="space-y-4">
            {reviewsContent.reviews.map((review, index) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <AdminInput
                        label="Customer Name"
                        value={review.name}
                        onChange={(value) => updateReview(index, 'name', value)}
                        required
                      />
                      <AdminInput
                        label="Rating"
                        type="number"
                        value={review.rating}
                        onChange={(value) => updateReview(index, 'rating', value)}
                        min={1}
                        max={5}
                        required
                      />
                      <AdminInput
                        label="Review Text"
                        type="textarea"
                        value={review.review}
                        onChange={(value) => updateReview(index, 'review', value)}
                        required
                        rows={3}
                      />
                    </div>
                    <div className="space-y-4">
                      <AdminImageUpload
                        label="Customer Photo"
                        value={review.photo}
                        onChange={(value) => updateReview(index, 'photo', value)}
                        aspectRatio="square"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeReview(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

// Final CTA Form Component
export function FinalCTAForm() {
  const [ctaContent, setCtaContent] = useState<FinalCTAContent>(() => 
    ContentStorage.getSectionContent('finalCTA')
  );
  const [originalContent, setOriginalContent] = useState<FinalCTAContent>(ctaContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('finalCTA');
    setCtaContent(content);
    setOriginalContent(content);
  }, []);

  const updateField = <K extends keyof FinalCTAContent>(field: K, value: FinalCTAContent[K]) => {
    setCtaContent(prev => ({ ...prev, [field]: value }));
  };

  const updateBenefit = (index: number, value: string) => {
    setCtaContent(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => 
        i === index ? value : benefit
      )
    }));
  };

  const addBenefit = () => {
    setCtaContent(prev => ({
      ...prev,
      benefits: [...prev.benefits, "New benefit"]
    }));
  };

  const removeBenefit = (index: number) => {
    setCtaContent(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('finalCTA', ctaContent);
      if (success) {
        setOriginalContent(ctaContent);
        toast({ title: "Final CTA section saved", description: "Changes have been saved successfully." });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({ title: "Error saving changes", description: "There was a problem saving your changes. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCtaContent(originalContent);
    toast({ title: "Changes reset", description: "All changes have been reverted to the last saved state." });
  };

  const hasChanges = JSON.stringify(ctaContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Final CTA Section"
        description="Configure the final call-to-action section"
        icon={<Megaphone className="h-5 w-5" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <AdminInput
              label="Section Title"
              value={ctaContent.sectionTitle}
              onChange={(value) => updateField('sectionTitle', value as string)}
              required
            />

            <AdminInput
              label="Section Description"
              value={ctaContent.sectionDescription}
              onChange={(value) => updateField('sectionDescription', value as string)}
              required
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Benefits</h3>
                <Button type="button" onClick={addBenefit} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>

              {ctaContent.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <AdminInput
                    label={`Benefit ${index + 1}`}
                    value={benefit}
                    onChange={(value) => updateBenefit(index, value as string)}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBenefit(index)}
                    className="text-red-600 hover:text-red-700 mt-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <AdminImageUpload
              label="Product Image"
              value={ctaContent.productImage}
              onChange={(value) => updateField('productImage', value)}
              aspectRatio="landscape"
              required
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

// Footer Form Component
export function FooterForm() {
  const [footerContent, setFooterContent] = useState<FooterContent>(() => 
    ContentStorage.getSectionContent('footer')
  );
  const [originalContent, setOriginalContent] = useState<FooterContent>(footerContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const content = ContentStorage.getSectionContent('footer');
    setFooterContent(content);
    setOriginalContent(content);
  }, []);

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setFooterContent(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      platform: "New Platform",
      url: "https://",
      iconName: "ExternalLink"
    };
    
    setFooterContent(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink]
    }));
  };

  const removeSocialLink = (index: number) => {
    setFooterContent(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = ContentStorage.updateSectionContent('footer', footerContent);
      if (success) {
        setOriginalContent(footerContent);
        toast({ title: "Footer section saved", description: "Changes have been saved successfully." });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({ title: "Error saving changes", description: "There was a problem saving your changes. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFooterContent(originalContent);
    toast({ title: "Changes reset", description: "All changes have been reverted to the last saved state." });
  };

  const hasChanges = JSON.stringify(footerContent) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6">
      <AdminFormSection
        title="Footer Section"
        description="Configure social media links and footer content"
        icon={<Link className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Social Media Links</h3>
            <Button type="button" onClick={addSocialLink} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Social Link
            </Button>
          </div>

          <div className="space-y-4">
            {footerContent.socialLinks.map((link, index) => (
              <Card key={link.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AdminInput
                      label="Platform"
                      value={link.platform}
                      onChange={(value) => updateSocialLink(index, 'platform', value as string)}
                      required
                    />
                    <AdminInput
                      label="URL"
                      type="url"
                      value={link.url}
                      onChange={(value) => updateSocialLink(index, 'url', value as string)}
                      required
                    />
                    <div className="flex items-end gap-2">
                      <AdminInput
                        label="Icon Name"
                        value={link.iconName}
                        onChange={(value) => updateSocialLink(index, 'iconName', value as string)}
                        required
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSocialLink(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
