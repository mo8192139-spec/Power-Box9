// Admin data models for landing page content

export interface HeroContent {
  title: string;
  subtitle?: string;
  rating: number;
  ratingReviews: number;
  salePrice: number;
  originalPrice?: number;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  heroImage: string;
  heroImageAlt: string;
  urgencyText: string;
  deliveryText: string;
}

export interface Feature {
  id: string;
  icon: string; // Icon name from Lucide React
  title: string;
  description: string;
  color: string; // Color theme
  image: string;
  imageAlt: string;
  enabled: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  profileImage: string;
  verified: boolean;
  location?: string;
  purchaseDate?: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  ogImageAlt: string;
  keywords: string[];
  canonicalUrl?: string;
}

export interface PopupContent {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  image?: string;
  imageAlt?: string;
  enabled: boolean;
  type: "exit-intent" | "timed" | "scroll";
  delay?: number; // for timed popups
  scrollPercentage?: number; // for scroll-triggered popups
}

export interface RatingSettings {
  value: number; // e.g., 4.5
  maxStars: number; // usually 5
  reviewCount: number;
  style: "full" | "half" | "three-quarters";
  showInHero: boolean;
  showInTrust: boolean;
}

export interface LinkSettings {
  id: string;
  label: string;
  url: string;
  category: "social" | "footer" | "button" | "navigation";
  icon?: string; // For social links
  target: "_blank" | "_self";
}

export interface TrustBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export interface LandingPageData {
  hero: HeroContent;
  features: Feature[];
  testimonials: Testimonial[];
  seo: SEOSettings;
  popups: PopupContent[];
  rating: RatingSettings;
  links: LinkSettings[];
  trustBadges: TrustBadge[];
  lastUpdated: string;
}

// Default data structure
export const defaultLandingPageData: LandingPageData = {
  hero: {
    title:
      "Nutritious Snack Box with Breakfast Bars and Delicious Chips | Gift A Snack (42 Count)",
    rating: 4.6,
    ratingReviews: 23,
    salePrice: 31.95,
    originalPrice: 49.99,
    primaryButtonText: "View Product Details",
    primaryButtonLink: "#product-modal",
    secondaryButtonText: "Learn More About This Product",
    secondaryButtonLink: "#product-section",
    heroImage:
      "https://cdn.builder.io/api/v1/image/assets%2F84282e2d620247d2b8d8845fda2c790e%2F79d471e5bc56457eb2c3b1c3eb6586ae?format=webp&width=800",
    heroImageAlt:
      "Nutritious Snack Box with Breakfast Bars and Delicious Chips - 42 Count",
    urgencyText: "Limited stock available",
    deliveryText: "Fast & reliable delivery",
  },
  features: [
    {
      id: "1",
      icon: "Package",
      title: "Variety of Snacks",
      description:
        "Perfect mix of breakfast bars and savory snacks for any time of day",
      color: "blue",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F4d9abe9f679440fcb3470285697707f4?format=webp&width=800",
      imageAlt: "Variety of snacks in the box",
      enabled: true,
      order: 1,
    },
    {
      id: "2",
      icon: "Gift",
      title: "High-End Packaging",
      description:
        "Attractive and professional packaging that makes a great impression",
      color: "purple",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F6305c43f8b6449fc8926c50b002e25fe?format=webp&width=800",
      imageAlt: "High-end packaging design",
      enabled: true,
      order: 2,
    },
    {
      id: "3",
      icon: "Zap",
      title: "Grab-and-Go Convenience",
      description: "Individually packaged snacks perfect for busy lifestyles",
      color: "green",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F26b950db7e9644baa7113c5a0046d0fa?format=webp&width=800",
      imageAlt: "Grab-and-go convenient packaging",
      enabled: true,
      order: 3,
    },
    {
      id: "4",
      icon: "Users",
      title: "Suitable for All Ages",
      description: "Perfect for adults, teens, and college students alike",
      color: "orange",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fa7c068e933744309b8f41ed0726156a2?format=webp&width=800",
      imageAlt: "Suitable for all ages",
      enabled: true,
      order: 4,
    },
    {
      id: "5",
      icon: "Heart",
      title: "Heartwarming Greeting Card",
      description: "Comes with a special greeting card to show you care",
      color: "red",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F19d8d6717d2a4dc6b633c9494573527a?format=webp&width=800",
      imageAlt: "Heartwarming greeting card included",
      enabled: true,
      order: 5,
    },
    {
      id: "6",
      icon: "BadgeCheck",
      title: "42 Count Value",
      description: "Generous quantity ensuring lasting satisfaction and value",
      color: "indigo",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F74bff8b15ba640b1acf1428f6b9b71b9?format=webp&width=800",
      imageAlt: "42 count value pack",
      enabled: true,
      order: 6,
    },
  ],
  testimonials: [
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      review:
        "Amazing variety of snacks! Perfect for our office break room. Everyone loves them!",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616c65ce15a?w=150&h=150&fit=crop&crop=face",
      verified: true,
      location: "California, US",
      purchaseDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Mike Chen",
      rating: 5,
      review:
        "Great gift idea! My college-aged daughter absolutely loved this care package.",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
      location: "Texas, US",
      purchaseDate: "2024-01-10",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      rating: 4,
      review:
        "Good quality snacks and beautiful packaging. Arrived quickly and in perfect condition.",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: true,
      location: "New York, US",
      purchaseDate: "2024-01-08",
    },
  ],
  seo: {
    metaTitle:
      "Nutritious Snack Box - 42 Count Gift Pack | Premium Breakfast Bars & Chips",
    metaDescription:
      "Premium 42-count snack box with breakfast bars and delicious chips. Perfect gift for all ages with beautiful packaging and greeting card included.",
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2F84282e2d620247d2b8d8845fda2c790e%2F79d471e5bc56457eb2c3b1c3eb6586ae?format=webp&width=1200",
    ogImageAlt: "Nutritious Snack Box - 42 Count Gift Pack",
    keywords: [
      "snack box",
      "gift",
      "breakfast bars",
      "healthy snacks",
      "42 count",
      "care package",
    ],
    canonicalUrl: "https://your-domain.com/",
  },
  popups: [
    {
      id: "1",
      title: "Don't Miss Out!",
      subtitle: "Get 15% off your first order",
      description:
        "Join our newsletter and receive exclusive deals on premium snack boxes.",
      buttonText: "Get 15% Off",
      buttonLink: "#newsletter",
      secondaryButtonText: "No Thanks",
      secondaryButtonLink: "#close",
      enabled: true,
      type: "exit-intent",
    },
  ],
  rating: {
    value: 4.6,
    maxStars: 5,
    reviewCount: 23,
    style: "three-quarters",
    showInHero: true,
    showInTrust: true,
  },
  links: [
    {
      id: "1",
      label: "Facebook",
      url: "https://facebook.com",
      category: "social",
      icon: "Facebook",
      target: "_blank",
    },
    {
      id: "2",
      label: "Instagram",
      url: "https://instagram.com",
      category: "social",
      icon: "Instagram",
      target: "_blank",
    },
    {
      id: "3",
      label: "Twitter",
      url: "https://twitter.com",
      category: "social",
      icon: "Twitter",
      target: "_blank",
    },
    {
      id: "4",
      label: "YouTube",
      url: "https://youtube.com",
      category: "social",
      icon: "Youtube",
      target: "_blank",
    },
  ],
  trustBadges: [
    {
      id: "1",
      title: "Official Walmart Seller",
      description: "Secure checkout and fast delivery",
      icon: "BadgeCheck",
      color: "blue",
      enabled: true,
    },
    {
      id: "2",
      title: "Pro Seller",
      description: "4.6 stars from 570 reviews",
      icon: "Star",
      color: "yellow",
      enabled: true,
    },
    {
      id: "3",
      title: "Free 90-Day Returns",
      description: "Shop with confidence - easy returns",
      icon: "Shield",
      color: "green",
      enabled: true,
    },
  ],
  lastUpdated: new Date().toISOString(),
};
