// =========================================================================
// СТРАНИЦА: ПРОДАЖА ЭЛЕКТРОВЕЛОСИПЕДОВ (ПОКУПКА БАЙКОВ)
// =========================================================================
// ПОМЕТКА ДЛЯ ВЛАДЕЛЬЦА:
// Этот компонент отображает каталог покупки абсолютно всех 15 моделей из аренды:
// - Каждая карточка содержит: фото, название, бренд, характеристики и цену покупки
// - Кнопка "Подробнее": открывает отдельную страницу с подробным описанием и 4 фото
// - Кнопка "Купить в TG" или "Узнать цену в TG"
// - Редактировать цены покупки можно в файле server.ts в массиве 'bikes'.

import { useEffect, useState } from 'react';
import { Bike, Review } from '../types';
import { Star, ArrowRight, ShieldCheck, Truck, Wrench, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ReviewModal } from './ReviewModal';

interface SaleCatalogProps {
  onSelectBike: (bike: Bike) => void;
}

export function SaleCatalog({ onSelectBike }: SaleCatalogProps) {
  const [saleBikes, setSaleBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewBike, setReviewBike] = useState<Bike | null>(null);
  const [brandFilter, setBrandFilter] = useState<string>('all');

  // Загрузка велосипедов для продажи с сервера
  useEffect(() => {
    const fetchSaleBikes = async () => {
      try {
        const res = await fetch('/api/sale-bikes');
        const data = await res.json();
        setSaleBikes(data);
      } catch (error) {
        console.error('Error fetching sale bikes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSaleBikes();
  }, []);

  const handleReviewAdded = (bikeId: string, review: Review) => {
    setSaleBikes(saleBikes.map(b => {
      if (b.id === bikeId) {
        return { ...b, reviews: [review, ...(b.reviews || [])] };
      }
      return b;
    }));
    if (reviewBike?.id === bikeId) {
      setReviewBike({ ...reviewBike, reviews: [review, ...(reviewBike.reviews || [])] });
    }
  };

  const filteredBikes = saleBikes.filter(bike => {
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
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Главный заголовок страницы покупки */}
        <div className="mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
            Продажа электровелосипедов
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-[#D4AF37] mb-4 uppercase" style={{ textShadow: '0 2px 20px rgba(212,175,55,0.2)' }}>
            Купить электровелосипед
          </h1>
          <p className="text-[#F3E5AB]/70 text-base sm:text-lg max-w-2xl mx-auto font-light tracking-wide">
            Все 15 моделей доступны к покупке. Новые, собранные и полностью настроенные байки с гарантией 1 год.
          </p>
        </div>

        {/* Преимущества покупки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <div className="bg-[#0A0A0A]/60 border border-[#D4AF37]/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#F3E5AB] text-sm sm:text-base">Официальная гарантия</h3>
              <p className="text-xs text-[#F3E5AB]/50 mt-0.5">12 месяцев гарантии на мотор, раму и электронику</p>
            </div>
          </div>

          <div className="bg-[#0A0A0A]/60 border border-[#D4AF37]/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#F3E5AB] text-sm sm:text-base">Бесплатная сборка</h3>
              <p className="text-xs text-[#F3E5AB]/50 mt-0.5">Полная протяжка, настройка тормозов и гидроизоляция</p>
            </div>
          </div>

          <div className="bg-[#0A0A0A]/60 border border-[#D4AF37]/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#F3E5AB] text-sm sm:text-base">Быстрая доставка</h3>
              <p className="text-xs text-[#F3E5AB]/50 mt-0.5">Отправка в день заказа по всей России и самовывоз в Кирове</p>
            </div>
          </div>
        </div>

        {/* Фильтры брендов */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: `Все модели (${saleBikes.length})` },
            { id: 'Liming', label: `Liming (${saleBikes.filter(b => b.brand === 'Liming').length})` },
            { id: 'Wendbox', label: `Wendbox (${saleBikes.filter(b => b.brand === 'Wendbox').length})` },
            { id: 'KKSbike', label: `KKSbike (${saleBikes.filter(b => b.brand === 'KKSbike').length})` },
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

        {/* Сетка товаров для покупки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBikes.map((bike, index) => {
            const reviewCount = bike.reviews?.length || 0;
            const avgRating = reviewCount > 0 
              ? (bike.reviews!.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
              : '5.0';

            const hasFixedPrice = bike.purchasePrice && !bike.purchasePrice.toLowerCase().includes('уточняйте');

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (index % 3) * 0.1 }}
                whileHover={{ scale: 1.015 }}
                key={bike.id}
                className="bg-[#0A0A0A]/70 backdrop-blur-xl rounded-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.18)] group"
              >
                {/* Фото товара с кликом на Подробнее */}
                <div 
                  onClick={() => onSelectBike(bike)}
                  className="aspect-[4/3] w-full overflow-hidden bg-[#050505] relative border-b border-[#D4AF37]/20 cursor-pointer"
                >
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
                  
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
                      setReviewBike(bike);
                    }}
                    className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-[#D4AF37]/20 transition-colors shadow-lg"
                  >
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <span>{avgRating} ({reviewCount})</span>
                  </button>
                </div>
                
                <div className="p-5 sm:p-7 flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-[#D4AF37]/70 text-xs font-bold tracking-widest uppercase mb-1">{bike.type}</p>
                    <h3 
                      onClick={() => onSelectBike(bike)}
                      className="text-xl sm:text-2xl font-bold text-[#F3E5AB] mb-2 hover:text-[#D4AF37] cursor-pointer transition-colors"
                    >
                      {bike.name}
                    </h3>
                    
                    {/* Цена покупки */}
                    <div className="bg-[#050505]/90 border border-[#D4AF37]/20 rounded-xl p-3">
                      <div className="text-[10px] text-[#F3E5AB]/50 uppercase tracking-wider mb-0.5">
                        Цена покупки:
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={`font-bold ${hasFixedPrice ? 'text-2xl text-[#D4AF37]' : 'text-base sm:text-lg text-[#F3E5AB]'}`}>
                          {bike.purchasePrice || 'Уточняйте у менеджера'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#F3E5AB]/70 text-xs sm:text-sm mb-4 line-clamp-2">
                    {bike.description}
                  </p>

                  {/* Характеристики */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="text-center py-2 px-1 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/10">
                      <p className="text-[10px] text-[#F3E5AB]/40 uppercase tracking-wider">Скорость</p>
                      <p className="font-bold text-xs text-[#F3E5AB]">{bike.speed}</p>
                    </div>
                    <div className="text-center py-2 px-1 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/10">
                      <p className="text-[10px] text-[#F3E5AB]/40 uppercase tracking-wider">Запас хода</p>
                      <p className="font-bold text-xs text-[#F3E5AB]">{bike.range}</p>
                    </div>
                    <div className="text-center py-2 px-1 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/10">
                      <p className="text-[10px] text-[#F3E5AB]/40 uppercase tracking-wider">Мощность</p>
                      <p className="font-bold text-xs text-[#F3E5AB]">{bike.power || '500W'}</p>
                    </div>
                  </div>

                  {/* Кнопки */}
                  <div className="mt-auto space-y-2.5">
                    {/* Кнопка "Подробнее" (переход к информации и 4 фото) */}
                    <button
                      onClick={() => onSelectBike(bike)}
                      className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors uppercase tracking-wider text-xs"
                    >
                      <span>Подробнее (4 фото)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Кнопка покупки или уточнения */}
                    {hasFixedPrice ? (
                      <a 
                        href={`https://t.me/grand_monk?text=${encodeURIComponent(`Здравствуйте! Хочу купить новый электровелосипед ${bike.name} за ${bike.purchasePrice}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:opacity-90 transition-opacity uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                      >
                        Купить за {bike.purchasePrice}
                      </a>
                    ) : (
                      <a 
                        href={`https://t.me/grand_monk?text=${encodeURIComponent(`Здравствуйте! Подскажите, пожалуйста, актуальную цену покупки электровелосипеда ${bike.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/25 transition-colors uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Узнать цену в TG
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Окно отзывов */}
      {reviewBike && (
        <ReviewModal 
          bike={reviewBike} 
          onClose={() => setReviewBike(null)} 
          onReviewAdded={handleReviewAdded}
        />
      )}
    </div>
  );
}
