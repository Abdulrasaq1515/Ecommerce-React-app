import React, { useEffect, useState } from 'react';
import '../../styles/reviews.css';

const Reviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const storageKey = productId ? `reviews:${productId}` : null;

  useEffect(() => {
    if (!storageKey) {
      setReviews([]);
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey);
      setReviews(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error('Failed to load reviews from localStorage', err);
      setReviews([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (err) {
      console.error('Failed to save reviews to localStorage', err);
    }
  }, [reviews, storageKey]);

  const handleRatingClick = (selected) => setRating(selected);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    const newReview = {
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
    };
    setReviews(prev => [...prev, newReview]);
    setRating(0);
    setComment('');
  };

  const avg = reviews.length ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="reviews-container">
      <div className="write-review">
        <h3>Write a Review</h3>
        {avg && <div className="avg-rating">Average rating: {avg} / 5 ({reviews.length})</div>}
        <div className="star-rating" aria-label="Rating">
          {[1,2,3,4,5].map(s => (
            <span
              key={s}
              className={`star ${s <= rating ? 'active' : ''}`}
              onClick={() => handleRatingClick(s)}
              role="button"
              aria-pressed={s <= rating}
            >★</span>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your review here..."
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>

      <div className="reviews-list">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="review-item">
              <div className="stars">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={`star ${s <= r.rating ? 'active' : ''}`}>★</span>
                ))}
              </div>
              <p className="review-comment">{r.comment}</p>
              <p className="review-date">{new Date(r.date).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
