// components/ReviewSystem.tsx
'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  likes: number;
  date: string;
  userImage: string;
}

export const ReviewSystem = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      user: 'أحمد محمد',
      rating: 5,
      comment: 'أداة رائعة ساعدتني كثيراً في التواصل',
      likes: 24,
      date: '2024-02-10',
      userImage: '/api/placeholder/40/40'
    },
    // ... المزيد من المراجعات
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  const addReview = () => {
    const review: Review = {
      id: Date.now().toString(),
      user: 'مستخدم جديد',
      rating: newReview.rating,
      comment: newReview.comment,
      likes: 0,
      date: new Date().toISOString().split('T')[0],
      userImage: '/api/placeholder/40/40'
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">التقييمات والمراجعات</h2>

      {/* Add Review Form */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">أضف تقييمك</h3>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setNewReview({ ...newReview, rating: star })}
            />
          ))}
        </div>
        <textarea
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="اكتب مراجعتك هنا..."
          rows={4}
        />
        <button
          onClick={addReview}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          نشر التقييم
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-b pb-4"
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.userImage}
                  alt={review.user}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold">{review.user}</h4>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 mr-2">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-blue-600">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{review.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-600">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>رد</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
