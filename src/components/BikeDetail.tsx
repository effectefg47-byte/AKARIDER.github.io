// =========================================================================
// СТРАНИЦА ПОДРОБНОЙ ИНФОРМАЦИИ О ВЕЛОСИПЕДЕ С 4 ФОТОГРАФИЯМИ
// =========================================================================
// Этот компонент отображает полный профиль выбранного электровелосипеда:
// 1. Фотогалерею из 4 качественных фотографий с переключением
// 2. Полные технические характеристики (мощность, батарея, тормоза и т.д.)
// 3. Подробное описание и ключевые преимущества
// 4. Кнопки заказа в Telegram и звонка
// 5. Блок отзывов с возможностью оставить свой

import { useState } from 'react';
import { Bike, Review } from '../types';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Star, 
  Zap, 
  Battery as BatteryIcon, 
  Clock, 
  Weight, 
  Gauge, 
  ShieldCheck, 
  Sliders, 
  Check, 
  MessageSquare 
} from 'lucide-react';
import { motion } from 'motion/react';
import { ReviewModal } from './ReviewModal';

interface BikeDetailProps {
  bike: Bike;
  onBack: () => void;
  onReviewAdded: (bikeId: string, review: Review) => void;
}

export function BikeDetail({ bike, onBack, onReviewAdded }: BikeDetailProps) {
  // Список из 4 фотографий (если у велика нет 4 фото, дополняем главным фото)
  const photos = bike.images && bike.images.length > 0
    ? bike.images.slice(0, 4)
    : [bike.image, bike.image, bike.image, bike.image];

  // Индекс активной фотографии в галерее
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  // Выбранный тариф (если у байка есть опция 1 АКБ / 2 АКБ)
  const [selectedTariffIndex, setSelectedTariffIndex] = useState(0);
  // Модальное окно для отзыва
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const reviewCount = bike.reviews?.length || 0;
  const avgRating = reviewCount > 0 
    ? (bike.reviews!.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
    : '—';

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Кнопка "Назад к каталогу" */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-[#D4AF37]/30 text-[#F3E5AB] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-sm font-medium tracking-wide group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Вернуться в каталог</span>
          </button>
        </div>

        {/* Главный блок: 4 ФОТО слева + Основная информация справа */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* ========================================================= */}
          {/* ЛЕВАЯ КОЛОНКА: ГАЛЕРЕЯ ИЗ 4 ФОТОГРАФИЙ                    */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Большое главное превью */}
            <motion.div 
              key={activePhotoIndex}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/3] w-full bg-[#050505] rounded-2xl border border-[#D4AF37]/30 overflow-hidden relative shadow-[0_0_35px_rgba(212,175,55,0.12)] group"
            >
              <img
                src={photos[activePhotoIndex]}
                alt={`${bike.name} фото ${activePhotoIndex + 1}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
              
              {/* Бейдж номера фото */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-lg">
                Фото {activePhotoIndex + 1} из {photos.length}
              </div>

              {/* Бейдж типа */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#F3E5AB] text-xs uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg">
                {bike.type}
              </div>
            </motion.div>

            {/* 4 МИНИАТЮРЫ (Нажмите для переключения) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {photos.map((photoUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all relative ${
                    activePhotoIndex === idx
                      ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                      : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/60 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photoUrl}
                    alt={`Миниатюра ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {activePhotoIndex === idx && (
                    <div className="absolute inset-0 bg-[#D4AF37]/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* ПРАВАЯ КОЛОНКА: ЦЕНА, ОПИСАНИЕ И КНОПКИ ДЕЙСТВИЯ          */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0A0A0A]/70 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
            <div>
              {/* Категория и рейтинг */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
                  {bike.type}
                </span>
                
                <button 
                  onClick={() => setIsReviewOpen(true)}
                  className="flex items-center gap-1.5 bg-black/60 border border-[#D4AF37]/30 text-[#D4AF37] px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#D4AF37]/15 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span>{avgRating} ({reviewCount} отзывов)</span>
                </button>
              </div>

              {/* Название байка */}
              <h1 className="text-3xl sm:text-4xl font-bold text-[#F3E5AB] mb-4 tracking-tight">
                {bike.name}
              </h1>

              {/* Стоимость аренды и покупки */}
              {bike.tariffs && bike.tariffs.length > 0 ? (
                <div className="bg-[#050505]/90 rounded-xl border border-[#D4AF37]/30 p-4 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Тарифы аренды:
                    </span>
                    <span className="text-[11px] text-[#F3E5AB]/50">Выберите комплектацию</span>
                  </div>

                  {/* Переключатель тарифов 1 АКБ / 2 АКБ */}
                  <div className="grid grid-cols-2 gap-2">
                    {bike.tariffs.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTariffIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedTariffIndex === idx
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                            : 'bg-black/50 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#F3E5AB] block mb-1">{t.label}</span>
                        <span className="text-base sm:text-lg font-bold text-[#D4AF37] block leading-tight">{t.weekPrice}</span>
                        <span className="text-[11px] text-[#F3E5AB]/60 block mt-0.5">{t.monthPrice}</span>
                      </button>
                    ))}
                  </div>

                  {/* Цена покупки */}
                  <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs">
                    <span className="text-[#F3E5AB]/60">Цена покупки нового байка:</span>
                    <span className="font-bold text-[#F3E5AB]">{bike.purchasePrice || 'Уточняйте у менеджера'}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#050505]/90 rounded-xl border border-[#D4AF37]/30 mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#F3E5AB]/50 uppercase tracking-wider block">
                      Аренда (неделя / месяц)
                    </span>
                    <span className="text-2xl font-bold text-[#D4AF37]">
                      {bike.price}
                    </span>
                    {bike.priceMonth && (
                      <span className="text-xs text-[#F3E5AB]/70 block mt-0.5">
                        {bike.priceMonth}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#F3E5AB]/50 uppercase tracking-wider block">
                      Цена покупки
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-[#F3E5AB]">
                      {bike.purchasePrice || 'Уточняйте у менеджера'}
                    </span>
                  </div>
                </div>
              )}

              {/* Текстовое описание */}
              <p className="text-[#F3E5AB]/80 text-sm sm:text-base leading-relaxed mb-6">
                {bike.description || 'Надежный электровелосипед с продуманной эргономикой, высоким комфортом и солидным запасом хода для решения любых транспортных задач.'}
              </p>

              {/* Быстрые характеристики */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#050505]/60 border border-[#D4AF37]/15 rounded-xl p-3 flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#F3E5AB]/50 uppercase tracking-wider block">Скорость</span>
                    <span className="text-sm font-bold text-[#F3E5AB]">{bike.speed}</span>
                  </div>
                </div>

                <div className="bg-[#050505]/60 border border-[#D4AF37]/15 rounded-xl p-3 flex items-center gap-3">
                  <BatteryIcon className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#F3E5AB]/50 uppercase tracking-wider block">Запас хода</span>
                    <span className="text-sm font-bold text-[#F3E5AB]">{bike.range}</span>
                  </div>
                </div>

                <div className="bg-[#050505]/60 border border-[#D4AF37]/15 rounded-xl p-3 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#F3E5AB]/50 uppercase tracking-wider block">Мощность</span>
                    <span className="text-sm font-bold text-[#F3E5AB]">{bike.power || '500W'}</span>
                  </div>
                </div>

                <div className="bg-[#050505]/60 border border-[#D4AF37]/15 rounded-xl p-3 flex items-center gap-3">
                  <Weight className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#F3E5AB]/50 uppercase tracking-wider block">Нагрузка</span>
                    <span className="text-sm font-bold text-[#F3E5AB]">{bike.maxLoad || '140 кг'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* КНОПКИ ДЕЙСТВИЯ */}
            <div className="space-y-3 pt-4 border-t border-[#D4AF37]/20">
              {/* Забронировать в аренду */}
              {(() => {
                const currentTariff = bike.tariffs && bike.tariffs[selectedTariffIndex]
                  ? `${bike.tariffs[selectedTariffIndex].label} (${bike.tariffs[selectedTariffIndex].weekPrice})`
                  : bike.price;

                const rentTgUrl = `https://t.me/grand_monk?text=${encodeURIComponent(
                  `Здравствуйте! Хочу забронировать в аренду электровелосипед ${bike.name}, тариф: ${currentTariff}`
                )}`;

                const purchaseText = bike.purchasePrice && !bike.purchasePrice.toLowerCase().includes('уточняйте')
                  ? `Здравствуйте! Хочу купить новый электровелосипед ${bike.name} за ${bike.purchasePrice}`
                  : `Здравствуйте! Подскажите стоимость покупки электровелосипеда ${bike.name}`;

                const purchaseTgUrl = `https://t.me/grand_monk?text=${encodeURIComponent(purchaseText)}`;

                return (
                  <>
                    <a
                      href={rentTgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-center font-bold py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:opacity-90 transition-opacity uppercase tracking-widest text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Забронировать аренду ({currentTariff})</span>
                    </a>

                    <a
                      href={purchaseTgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-center font-bold py-3 rounded-xl bg-black/70 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors uppercase tracking-wider text-xs"
                    >
                      <span>
                        {bike.purchasePrice && !bike.purchasePrice.toLowerCase().includes('уточняйте')
                          ? `Купить за ${bike.purchasePrice} в TG`
                          : 'Уточнить цену покупки в TG'}
                      </span>
                    </a>
                  </>
                );
              })()}

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:+79195016881"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black/60 border border-[#D4AF37]/30 text-[#F3E5AB] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors text-xs font-bold uppercase tracking-wider text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Позвонить</span>
                </a>

                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black/60 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-xs font-bold uppercase tracking-wider text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Отзывы ({reviewCount})</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* ПОЛНЫЕ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ                         */}
        {/* ========================================================= */}
        <div className="bg-[#0A0A0A]/70 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 mb-12 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-8 uppercase tracking-widest flex items-center gap-3">
            <Sliders className="w-6 h-6" />
            <span>Технические характеристики</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Двигатель и тяга</span>
              <span className="text-base font-bold text-[#F3E5AB]">{bike.power || '400W-500W редукторный'}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Аккумулятор (АКБ)</span>
              <span className="text-base font-bold text-[#F3E5AB]">{bike.battery || '48V Li-ion съемный'}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Максимальная скорость</span>
              <span className="text-base font-bold text-[#D4AF37]">{bike.speed}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Дистанция на одном заряде</span>
              <span className="text-base font-bold text-[#D4AF37]">{bike.range}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Время полной зарядки</span>
              <span className="text-base font-bold text-[#F3E5AB]">{bike.chargeTime || '5-6 часов'}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Тормозная система</span>
              <span className="text-base font-bold text-[#F3E5AB]">{bike.brakes || 'Дисковые перед/зад'}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Диаметр и тип колес</span>
              <span className="text-base font-bold text-[#F3E5AB]">{bike.wheels || 'Усиленные городские'}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Вес электровелосипеда</span>
              <span className="text-base font-bold text-[#F3E5AB]">{bike.weight || '25 кг'}</span>
            </div>

            <div className="p-4 bg-[#050505]/80 rounded-xl border border-[#D4AF37]/15">
              <span className="text-xs text-[#F3E5AB]/40 uppercase tracking-wider block mb-1">Максимальная грузоподъемность</span>
              <span className="text-base font-bold text-[#F3E5AB]">{bike.maxLoad || '140 кг'}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА                                     */}
        {/* ========================================================= */}
        {bike.features && bike.features.length > 0 && (
          <div className="bg-[#0A0A0A]/70 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 mb-12 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-6 uppercase tracking-widest flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <span>Ключевые преимущества</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bike.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#050505]/60 border border-[#D4AF37]/15 rounded-xl p-4">
                  <div className="p-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#F3E5AB] text-sm sm:text-base font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* БЛОК ОТЗЫВОВ К ЭТОМУ ВЕЛОСИПЕДУ                           */}
        {/* ========================================================= */}
        <div className="bg-[#0A0A0A]/70 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] uppercase tracking-widest">
                Отзывы владельцев
              </h2>
              <p className="text-xs text-[#F3E5AB]/60 mt-1">
                Реальные впечатления клиентов о {bike.name}
              </p>
            </div>

            <button
              onClick={() => setIsReviewOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs hover:bg-[#B8860B] transition-colors"
            >
              Написать отзыв
            </button>
          </div>

          {(!bike.reviews || bike.reviews.length === 0) ? (
            <div className="text-center py-10 border border-dashed border-[#D4AF37]/20 rounded-xl">
              <p className="text-[#F3E5AB]/50 mb-3">Для этой модели пока нет отзывов.</p>
              <button
                onClick={() => setIsReviewOpen(true)}
                className="text-sm font-bold text-[#D4AF37] hover:underline"
              >
                Оставьте первый отзыв!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bike.reviews.map(review => (
                <div key={review.id} className="p-5 bg-[#050505]/80 border border-[#D4AF37]/15 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#D4AF37]">{review.author || 'Аноним'}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-zinc-800'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#F3E5AB]/90 text-sm leading-relaxed mb-2">{review.text}</p>
                  <span className="text-xs text-[#F3E5AB]/40">{new Date(review.date).toLocaleDateString('ru-RU')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Модальное окно добавления отзыва */}
      {isReviewOpen && (
        <ReviewModal
          bike={bike}
          onClose={() => setIsReviewOpen(false)}
          onReviewAdded={onReviewAdded}
        />
      )}
    </div>
  );
}
