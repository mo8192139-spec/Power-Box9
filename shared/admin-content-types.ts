export interface HeroContent {
  title: string;
  rating: number;
  reviewCount: number;
  salePrice: number;
  regularPrice: number;
  mainImage: string;
  walmartUrl: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName: string; // We'll map these to icons
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo';
}

export interface BenefitsContent {
  sectionTitle: string;
  benefits: BenefitCard[];
}

export interface TrustContent {
  walmartTitle: string;
  walmartDescription: string;
  sellerRating: number;
  sellerReviewCount: number;
  sellerTitle: string;
  returnsTitle: string;
  returnsDescription: string;
}

export interface GalleryContent {
  sectionTitle: string;
  images: {
    id: string;
    url: string;
    title: string;
    alt: string;
  }[];
}

export interface CustomerReview {
  id: string;
  name: string;
  photo: string;
  rating: number;
  review: string;
}

export interface ReviewsContent {
  sectionTitle: string;
  sectionDescription: string;
  reviews: CustomerReview[];
}

export interface FinalCTAContent {
  sectionTitle: string;
  sectionDescription: string;
  productImage: string;
  benefits: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
}

export interface FooterContent {
  socialLinks: SocialLink[];
}

export interface SEOContent {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface PopupContent {
  id: string;
  type: 'button-triggered' | 'exit-intent';
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  emailLink?: string;
  enabled: boolean;
}

export interface PopupsContent {
  buttonTriggeredPopup: PopupContent;
  exitIntentPopup: PopupContent;
}

export interface Button {
  id: string;
  text: string;
  link: string;
  type: 'primary' | 'secondary' | 'outline';
}

export interface SiteContent {
  seo: SEOContent;
  hero: HeroContent;
  benefits: BenefitsContent;
  trust: TrustContent;
  gallery: GalleryContent;
  reviews: ReviewsContent;
  finalCTA: FinalCTAContent;
  footer: FooterContent;
  popups: PopupsContent;
}

// Default content structure for initialization
export const defaultSiteContent: SiteContent = {
  seo: {
    metaTitle: "Nutritious Snack Box with Breakfast Bars and Delicious Chips | Gift A Snack (42 Count)",
    metaDescription: "Get your 42-count nutritious snack box today! Perfect mix of breakfast bars and savory snacks. High-quality packaging, fast delivery, and satisfaction guaranteed.",
    metaKeywords: "snack box, healthy snacks, breakfast bars, gift box, nutritious snacks, office snacks, college care package"
  },
  hero: {
    title: "Nutritious Snack Box with Breakfast Bars and Delicious Chips | Gift A Snack (42 Count)",
    rating: 4.6,
    reviewCount: 23,
    salePrice: 31.95,
    regularPrice: 49.95,
    mainImage: "https://cdn.builder.io/api/v1/image/assets%2F84282e2d620247d2b8d8845fda2c790e%2F79d471e5bc56457eb2c3b1c3eb6586ae?format=webp&width=800",
    walmartUrl: "https://www.walmart.com/ip/Healthy-Snack-Box-Tasty-Nutrient-Rich-Variety-42-Count-by-Gift-A-Snack/14479818419"
  },
  benefits: {
    sectionTitle: "Why Choose Our Nutritious Snack Box?",
    benefits: [
      {
        id: "variety",
        title: "Variety of Snacks",
        description: "Perfect mix of breakfast bars and savory snacks for any time of day",
        image: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F4d9abe9f679440fcb3470285697707f4?format=webp&width=800",
        iconName: "Package",
        color: "blue"
      },
      {
        id: "packaging",
        title: "High-End Packaging",
        description: "Attractive and professional packaging that makes a great impression",
        image: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F6305c43f8b6449fc8926c50b002e25fe?format=webp&width=800",
        iconName: "Gift",
        color: "purple"
      },
      {
        id: "convenience",
        title: "Grab-and-Go Convenience",
        description: "Individually packaged snacks perfect for busy lifestyles",
        image: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F26b950db7e9644baa7113c5a0046d0fa?format=webp&width=800",
        iconName: "Zap",
        color: "green"
      },
      {
        id: "ages",
        title: "Suitable for All Ages",
        description: "Perfect for adults, teens, and college students alike",
        image: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fa7c068e933744309b8f41ed0726156a2?format=webp&width=800",
        iconName: "Users",
        color: "orange"
      },
      {
        id: "greeting",
        title: "Heartwarming Greeting Card",
        description: "Comes with a special greeting card to show you care",
        image: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F19d8d6717d2a4dc6b633c9494573527a?format=webp&width=800",
        iconName: "Heart",
        color: "red"
      },
      {
        id: "value",
        title: "42 Count Value",
        description: "Generous quantity ensuring lasting satisfaction and value",
        image: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F74bff8b15ba640b1acf1428f6b9b71b9?format=webp&width=800",
        iconName: "BadgeCheck",
        color: "indigo"
      }
    ]
  },
  trust: {
    walmartTitle: "Official Walmart Seller",
    walmartDescription: "Secure checkout and fast delivery",
    sellerRating: 4.75,
    sellerReviewCount: 570,
    sellerTitle: "Pro Seller",
    returnsTitle: "Free 90-Day Returns",
    returnsDescription: "Shop with confidence - easy returns"
  },
  gallery: {
    sectionTitle: "See What's Inside Your Box",
    images: [
      {
        id: "main",
        url: "https://cdn.builder.io/api/v1/image/assets%2F84282e2d620247d2b8d8845fda2c790e%2F79d471e5bc56457eb2c3b1c3eb6586ae?format=webp&width=800",
        title: "Complete Collection",
        alt: "Nutritious Snack Box complete collection"
      },
      {
        id: "inside",
        url: "https://cdn.builder.io/api/v1/image/assets%2F84282e2d620247d2b8d8845fda2c790e%2F05b5599b733643de9ed02db80950feb9?format=webp&width=800",
        title: "Inside View",
        alt: "Inside view of snack box"
      },
      {
        id: "packaging",
        url: "https://cdn.builder.io/api/v1/image/assets%2F84282e2d620247d2b8d8845fda2c790e%2Fec2c685b6b9d438f97083ea2cdb4458b?format=webp&width=800",
        title: "Beautiful Packaging",
        alt: "Beautiful packaging of snack box"
      }
    ]
  },
  reviews: {
    sectionTitle: "What Our Customers Say",
    sectionDescription: "Join thousands of satisfied customers who love our nutritious snack boxes",
    reviews: [
      {
        id: "sarah",
        name: "Sarah Johnson",
        photo: "https://images.pexels.com/photos/8872492/pexels-photo-8872492.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        rating: 5,
        review: "Amazing variety of snacks! Perfect for my office team. The breakfast bars are especially delicious and the packaging is so professional."
      },
      {
        id: "michael",
        name: "Michael Chen",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
        rating: 5,
        review: "Great value for 42 snacks! My college daughter loves these. Fast delivery and everything arrived in perfect condition."
      },
      {
        id: "emily",
        name: "Emily Rodriguez",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
        rating: 5,
        review: "The perfect gift! Sent this to my brother in college and he was thrilled. Quality snacks and beautiful presentation with the greeting card."
      }
    ]
  },
  finalCTA: {
    sectionTitle: "Ready to Fuel Your Day?",
    sectionDescription: "Get your 42-count nutritious snack box today!",
    productImage: "https://cdn.builder.io/api/v1/image/assets%2F84282e2d620247d2b8d8845fda2c790e%2F79d471e5bc56457eb2c3b1c3eb6586ae?format=webp&width=800",
    benefits: [
      "42 premium snacks included",
      "Fresh & high-quality snacks from top brands",
      "Perfect for gifting or office sharing",
      "Fast & reliable delivery nationwide",
      "Greeting card included"
    ]
  },
  footer: {
    socialLinks: [
      { id: "facebook", platform: "Facebook", url: "https://facebook.com", iconName: "Facebook" },
      { id: "instagram", platform: "Instagram", url: "https://instagram.com", iconName: "Instagram" },
      { id: "twitter", platform: "Twitter", url: "https://twitter.com", iconName: "Twitter" },
      { id: "youtube", platform: "YouTube", url: "https://youtube.com", iconName: "Youtube" }
    ]
  },
  popups: {
    buttonTriggeredPopup: {
      id: "button-popup",
      type: "button-triggered",
      title: "Special Offer!",
      content: "Get 20% off your first order when you sign up for our newsletter. Don't miss out on this limited-time offer!",
      buttonText: "Claim Offer",
      buttonLink: "https://www.walmart.com/ip/Healthy-Snack-Box-Tasty-Nutrient-Rich-Variety-42-Count-by-Gift-A-Snack/14479818419",
      emailLink: "mailto:offers@giftasnack.com?subject=Newsletter Signup",
      enabled: true
    },
    exitIntentPopup: {
      id: "exit-popup",
      type: "exit-intent",
      title: "Wait! Don't Leave Empty-Handed",
      content: "Subscribe to our newsletter and get exclusive deals on healthy snacks delivered to your inbox!",
      buttonText: "Subscribe Now",
      buttonLink: "mailto:newsletter@giftasnack.com?subject=Newsletter Subscription",
      emailLink: "mailto:newsletter@giftasnack.com?subject=Newsletter Subscription",
      enabled: true
    }
  }
};
