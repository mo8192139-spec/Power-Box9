import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ContentStorage } from "@/lib/content-storage";
import { CustomerReview, ReviewsContent } from "@shared/admin-content-types";

// Memoized review card component for better performance
const ReviewCard = ({
  review,
  isDuplicate = false,
}: {
  review: CustomerReview;
  isDuplicate?: boolean;
}) => (
  <div
    className="flex-shrink-0 w-72 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-5 border-2 hover:shadow-2xl transition-all duration-300"
    style={{ borderColor: "#007BFF" }}
  >
    {/* Quotation Mark Icon */}
    <div className="flex justify-center mb-3">
      <div className="bg-blue-100 rounded-full p-2">
        <Quote className="h-5 w-5 text-blue-600" />
      </div>
    </div>

    {/* Customer Photo */}
    <div className="flex justify-center mb-4">
      {review.photo ? (
        <img
          src={review.photo}
          alt={review.name}
          className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md"
          loading="lazy"
          width={56}
          height={56}
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-gray-200 border-3 border-white shadow-md flex items-center justify-center">
          <span className="text-gray-500 font-semibold text-lg">
            {review.name.charAt(0)}
          </span>
        </div>
      )}
    </div>

    {/* Customer Name and Rating */}
    <div className="text-center mb-4">
      <h3 className="font-semibold text-gray-900 text-base mb-2">
        {review.name}
      </h3>
      <div className="flex justify-center gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 text-yellow-500 fill-current drop-shadow-sm"
          />
        ))}
      </div>
    </div>

    {/* Review Text */}
    <p className="text-gray-700 text-center leading-relaxed text-sm font-medium">
      {review.review}
    </p>
  </div>
);

export function CustomerReviewsDynamic() {
  const [reviewsContent, setReviewsContent] = useState<ReviewsContent | null>(null);

  useEffect(() => {
    const content = ContentStorage.getSectionContent('reviews');
    setReviewsContent(content);
  }, []);

  if (!reviewsContent) {
    return null; // Don't render anything if content is not loaded
  }

  // Double the array for seamless infinite scroll
  const extendedReviews = [...reviewsContent.reviews, ...reviewsContent.reviews];

  return (
    <section className="relative py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {reviewsContent.sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {reviewsContent.sectionDescription}
          </p>
        </div>

        {/* Only show scrolling animation if there are reviews */}
        {reviewsContent.reviews.length > 0 ? (
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Animation */}
            <motion.div
              className="flex gap-4 w-max"
              animate={{
                x: [0, -1500], // Adjusted for smaller card width
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {extendedReviews.map((review, index) => (
                <ReviewCard
                  key={`review-${review.id}-${Math.floor(index / reviewsContent.reviews.length)}`}
                  review={review}
                  isDuplicate={index >= reviewsContent.reviews.length}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews available yet.</p>
          </div>
        )}

        {/* Trust Indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-500 fill-current"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              Based on verified customer reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
