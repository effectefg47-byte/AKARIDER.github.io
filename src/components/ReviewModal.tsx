import { X, Star } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { Bike, Review } from '../types';

interface ReviewModalProps {
  bike: Bike;
  onClose: () => void;
  onReviewAdded: (bikeId: string, review: Review) => void;
}

export function ReviewModal({ bike, onClose, onReviewAdded }: ReviewModalProps) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/bikes/${bike.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, text, rating })
      });
      const newReview = await res.json();
      onReviewAdded(bike.id, newReview);
      setAuthor('');
      setText('');
      setRating(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0A0A0A] border-x-0 sm:border-x border-y border-[#D4AF37]/40 rounded-none sm:rounded-2xl w-full sm:max-w-2xl h-full sm:h-auto max-h-screen sm:max-h-[90vh] flex flex-col relative shadow-[0_0_40px_rgba(212,175,55,0.15)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors z-10 p-2 -mr-2 -mt-2">
          <X className="w-6 h-6" />
        </button>
        <div className="p-4 sm:p-6 border-b border-[#D4AF37]/20 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] uppercase tracking-wide pr-8 truncate">Отзывы: {bike.name}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {(!bike.reviews || bike.reviews.length === 0) ? (
            <p className="text-[#F3E5AB]/50 text-center py-8">Пока нет отзывов. Станьте первым!</p>
          ) : (
            bike.reviews.map(review => (
              <div key={review.id} className="bg-black/40 border border-[#D4AF37]/10 p-4 sm:p-5 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-bold text-[#D4AF37] tracking-wide">{review.author || 'Аноним'}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-zinc-800'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[#F3E5AB]/90 text-sm mb-3 leading-relaxed">{review.text}</p>
                <span className="text-xs text-[#F3E5AB]/40">{new Date(review.date).toLocaleDateString('ru-RU')}</span>
              </div>
            ))
          )}
        </div>

        <div className="p-4 sm:p-6 border-t border-[#D4AF37]/20 bg-black/40 rounded-none sm:rounded-b-2xl flex-shrink-0 pb-safe">
          <h3 className="text-base sm:text-lg font-bold text-[#D4AF37] mb-3 sm:mb-4 uppercase tracking-wide">Оставить отзыв</h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-4 mb-1 sm:mb-2">
              <span className="text-xs sm:text-sm font-medium text-[#F3E5AB]/70 uppercase tracking-widest">Оценка:</span>
              <div className="flex gap-2 sm:gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110 p-1 -m-1">
                    <Star className={`w-7 h-7 sm:w-6 sm:h-6 ${star <= rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-zinc-800 hover:text-[#D4AF37]/50'}`} />
                  </button>
                ))}
              </div>
            </div>
            <input 
              type="text" 
              placeholder="Ваше имя" 
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-lg px-4 py-3 sm:py-3 text-[#F3E5AB] placeholder:text-[#F3E5AB]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <textarea 
              placeholder="Поделитесь впечатлениями..." 
              value={text}
              onChange={e => setText(e.target.value)}
              required
              rows={3}
              className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-lg px-4 py-3 sm:py-3 text-[#F3E5AB] placeholder:text-[#F3E5AB]/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
            />
            <button 
              type="submit" 
              disabled={isSubmitting || !text}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:opacity-90 text-black font-bold py-3.5 sm:py-3.5 rounded-lg transition-opacity disabled:opacity-50 uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              {isSubmitting ? 'Отправка...' : 'Опубликовать'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
