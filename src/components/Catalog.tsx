// ==========================================
// КАТАЛОГ ВЕЛОСИПЕДОВ (АРЕНДА)
// ==========================================
// Этот компонент отображает список электровелосипедов для аренды.
// На каждой карточке есть:
// 1. Кнопка "Подробнее" — открывает отдельную страницу с 4 фото и всеми параметрами
// 2. Кнопка "Забронировать" — ведет в Telegram @grand_monk
// 3. Кнопка "Отзывы о модели" — открывает модальное окно с отзывами

import { useEffect, useState } from 'react';
import { Bike, Review } from '../types';
import { ReviewModal } from './ReviewModal';
import { MessageSquare, Star, ArrowRight, Zap, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface CatalogProps {
  onSelectBike: (bike: Bike) => void;
}

export function Catalog({ onSelectBike }: CatalogProps) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReviewBike, setSelectedReviewBike] = useState<Bike | null>(null);
  const [brandFilter, setBrandFilter] = useState<string>('all');

  // Загрузка данных с сервера при открытии страницы
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch('/api/bikes');
        const data = await res.json();
        setBikes(data);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  const handleReviewAdded = (bikeId: string, review: Review) => {
    setBikes(bikes.map(b => {
      if (b.id === bikeId) {
        return { ...b, reviews: [review, ...(b.reviews || [])] };
      }
      return b;
    }));
    if (selectedReviewBike?.id === bikeId) {
      setSelectedReviewBike({ ...selectedReviewBike, reviews: [review, ...(selectedReviewBike.reviews || [])] });
    }
  };

  const filteredBikes = bikes.filter(bike => {
    if (brandFilter === 'all') return true;
    return bike.brand?.toLowerCase() === brandFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="py-32 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================== */}
        {/* ГЛАВНЫЙ ЗАГОЛОВОК И ТЕКСТ ПОД НИМ        */}
        {/* ========================================== */}
        <div className="mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
            Аренда электровелосипедов в Кирове
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-[#D4AF37] mb-4 uppercase" style={{ textShadow: '0 2px 20px rgba(212,175,55,0.2)' }}>
            Каталог AKARider
          </h1>
          <p className="text-[#F3E5AB]/70 text-base sm:text-lg max-w-2xl mx-auto font-light tracking-wide">
            15 проверенных моделей Liming, Wendbox и KKSbike. Аренда от 3 000 ₽ в неделю или 12 000 ₽ в месяц. Опции с 1 и 2 АКБ.
          </p>
        </div>

        {/* ========================================== */}
        {/* ФИЛЬТРЫ ПО БРЕНДАМ                        */}
        {/* ========================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: `Все модели (${bikes.length})` },
            { id: 'Liming', label: `Liming (${bikes.filter(b => b.brand === 'Liming').length})` },
            { id: 'Wendbox', label: `Wendbox (${bikes.filter(b => b.brand === 'Wendbox').length})` },
            { id: 'KKSbike', label: `KKSbike (${bikes.filter(b => b.brand === 'KKSbike').length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setBrandFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                brandFilter === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'bg-[#0A0A0A]/80 border border-[#D4AF37]/20 text-[#F3E5AB]/70 hover:border-[#D4AF37]/60 hover:text-[#F3E5AB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBikes.map((bike, index) => {
            const reviewCount = bike.reviews?.length || 0;
            const avgRating = reviewCount > 0 
              ? (bike.reviews!.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
              : '5.0';

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (index % 3) * 0.1 }}
                whileHover={{ scale: 1.015 }}
                key={bike.id}
                className="bg-[#0A0A0A]/70 backdrop-blur-xl rounded-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.18)] group"
              >
                {/* Картинка велосипеда с кликом на Подробнее */}
                <div 
                  onClick={() => onSelectBike(bike)}
                  className="aspect-[4/3] w-full overflow-hidden bg-[#050505] relative border-b border-[#D4AF37]/20 cursor-pointer"
                >
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-90" />
                  
                  {/* Бейдж бренда */}
                  {bike.brand && (
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                      {bike.brand}
                    </div>
                  )}

                  {/* Кнопка с рейтингом */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReviewBike(bike);
                    }}
                    className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-[#D4AF37]/20 transition-colors shadow-lg"
                  >
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <span>{avgRating} ({reviewCount})</span>
                  </button>
                </div>
                
                <div className="p-5 sm:p-7 flex-1 flex flex-col">
                  {/* Информация о велосипеде */}
                  <div className="mb-4">
                    <p className="text-[#D4AF37]/70 text-xs font-bold tracking-widest uppercase mb-1">{bike.type}</p>
                    <h3 
                      onClick={() => onSelectBike(bike)}
                      className="text-xl sm:text-2xl font-bold text-[#F3E5AB] mb-2 cursor-pointer hover:text-[#D4AF37] transition-colors"
                    >
                      {bike.name}
                    </h3>

                    {/* Блок тарифов аренды */}
                    {bike.tariffs && bike.tariffs.length > 0 ? (
                      <div className="bg-[#050505]/90 border border-[#D4AF37]/20 rounded-xl p-3 space-y-1.5">
                        <div className="text-[10px] uppercase tracking-wider text-[#F3E5AB]/50 font-medium">Тарифы аренды:</div>
                        {bike.tariffs.map((t, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-[#F3E5AB]/90 font-medium flex items-center gap-1.5">
                              <Zap className="w-3 h-3 text-[#D4AF37]" />
                              {t.label}:
                            </span>
                            <span className="font-bold text-[#D4AF37]">
                              {t.weekPrice} <span className="text-[#F3E5AB]/60 font-normal">({t.monthPrice})</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#050505]/90 border border-[#D4AF37]/20 rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#F3E5AB]/50 block">Аренда неделя</span>
                          <span className="text-base sm:text-lg font-bold text-[#D4AF37]">{bike.price}</span>
                        </div>
                        {bike.priceMonth && (
                          <div className="text-right">
                            <span className="text-[10px] uppercase tracking-wider text-[#F3E5AB]/50 block">В месяц</span>
                            <span className="text-base sm:text-lg font-bold text-[#F3E5AB]">{bike.priceMonth}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Характеристики (Скорость и Запас хода) */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center py-2.5 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/10">
                      <p className="text-[10px] text-[#F3E5AB]/40 font-medium mb-0.5 uppercase tracking-wider">Скорость</p>
                      <p className="font-bold text-[#F3E5AB] text-xs sm:text-sm">{bike.speed}</p>
                    </div>
                    <div className="text-center py-2.5 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/10">
                      <p className="text-[10px] text-[#F3E5AB]/40 font-medium mb-0.5 uppercase tracking-wider">Запас хода</p>
                      <p className="font-bold text-[#F3E5AB] text-xs sm:text-sm">{bike.range}</p>
                    </div>
                  </div>

                  {/* Плашка покупки */}
                  <div className="mb-5 px-3 py-2 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/15 flex items-center justify-between text-xs">
                    <span className="text-[#F3E5AB]/70 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Покупка:
                    </span>
                    <span className="font-bold text-[#D4AF37]">
                      {bike.purchasePrice || 'Уточняйте у менеджера'}
                    </span>
                  </div>

                  <div className="mt-auto space-y-2.5">
                    {/* КНОПКА "ПОДРОБНЕЕ" */}
                    <button
                      onClick={() => onSelectBike(bike)}
                      className="w-full flex items-center justify-center gap-2 text-center font-bold py-3 rounded-xl border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-all uppercase tracking-wider text-xs sm:text-sm group/btn"
                    >
                      <span>Подробнее (4 фото и ТХ)</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    {/* КНОПКА ЗАБРОНИРОВАТЬ НА КАРТОЧКЕ */}
                    <a 
                      href={`https://t.me/grand_monk?text=${encodeURIComponent(`Здравствуйте! Хочу забронировать в аренду электровелосипед ${bike.name} (${bike.price})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center text-center font-bold py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:opacity-90 transition-opacity uppercase tracking-widest text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    >
                      Забронировать
                    </a>
                    
                    {/* КНОПКА ОТЗЫВЫ */}
                    <button 
                      onClick={() => setSelectedReviewBike(bike)}
                      className="w-full flex items-center justify-center gap-2 text-center font-medium py-2 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37]/80 hover:bg-[#D4AF37]/10 transition-colors text-xs tracking-wide"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Отзывы о модели</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Окно отзывов */}
      {selectedReviewBike && (
        <ReviewModal 
          bike={selectedReviewBike} 
          onClose={() => setSelectedReviewBike(null)} 
          onReviewAdded={handleReviewAdded}
        />
      )}
    </div>
  );
}
