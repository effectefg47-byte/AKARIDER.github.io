// =========================================================================
// СТРАНИЦА: КАТАЛОГ И ПОКУПКА АКБ (АККУМУЛЯТОРОВ)
// =========================================================================
// ПОМЕТКА ДЛЯ ВЛАДЕЛЬЦА:
// В этом разделе отображаются ровно 3 тяговых аккумулятора 60V:
// - 60/30 (60V 30Ah)
// - 60/42 (60V 42Ah)
// - 60/70 (60V 70Ah)
// Вы можете фильтровать их по кнопкам или посмотреть все сразу.
// Сами данные (цены, фото, емкость) меняются в файле server.ts в массиве 'batteries'.

import { useEffect, useState } from 'react';
import { Battery } from '../types';
import { 
  Zap, 
  Send, 
  Phone, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

export function BatteryCatalog() {
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Фильтр по емкости: все или конкретный вид (30Ah, 42Ah, 70Ah)
  const [filterCapacity, setFilterCapacity] = useState<'all' | '30' | '42' | '70'>('all');

  // Загрузка аккумуляторов с сервера
  useEffect(() => {
    const fetchBatteries = async () => {
      try {
        const res = await fetch('/api/batteries');
        const data = await res.json();
        setBatteries(data);
      } catch (error) {
        console.error('Error fetching batteries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatteries();
  }, []);

  // Фильтрация батарей по выбранной емкости
  const filteredBatteries = batteries.filter(bat => {
    if (filterCapacity === 'all') return true;
    if (filterCapacity === '30') return bat.capacity.includes('30');
    if (filterCapacity === '42') return bat.capacity.includes('42');
    if (filterCapacity === '70') return bat.capacity.includes('70');
    return true;
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
        
        {/* Заголовок раздела АКБ */}
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
            Тяговые аккумуляторы 60V
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-[#D4AF37] mb-6 uppercase" style={{ textShadow: '0 2px 20px rgba(212,175,55,0.2)' }}>
            Купить аккумулятор (АКБ)
          </h1>
          <p className="text-[#F3E5AB]/70 text-base sm:text-lg max-w-2xl mx-auto font-light tracking-wide">
            Оригинальные тяговые батареи 60V в металлическом корпусе: 60/30, 60/42 и 60/70. Полная совместимость с моделями Wendbox, Liming и KKSbike. Запас хода до 250 км.
          </p>
        </div>

        {/* Фильтры по 3 видам аккумуляторов */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setFilterCapacity('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border ${
              filterCapacity === 'all'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-black/50 text-[#F3E5AB]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
            }`}
          >
            Все 3 вида ({batteries.length})
          </button>
          
          <button
            onClick={() => setFilterCapacity('30')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border ${
              filterCapacity === '30'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-black/50 text-[#F3E5AB]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
            }`}
          >
            60/30 (30 Ah)
          </button>

          <button
            onClick={() => setFilterCapacity('42')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border ${
              filterCapacity === '42'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-black/50 text-[#F3E5AB]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
            }`}
          >
            60/42 (42 Ah)
          </button>

          <button
            onClick={() => setFilterCapacity('70')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border ${
              filterCapacity === '70'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-black/50 text-[#F3E5AB]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
            }`}
          >
            60/70 (70 Ah)
          </button>
        </div>

        {/* Сетка аккумуляторов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredBatteries.map((battery, index) => (
            <motion.div
              key={battery.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0A0A0A]/70 backdrop-blur-xl rounded-2xl border border-[#D4AF37]/30 overflow-hidden flex flex-col hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] group"
            >
              {/* Фото и бейджи */}
              <div className="aspect-[4/3] w-full bg-[#050505] relative border-b border-[#D4AF37]/20 overflow-hidden">
                <img
                  src={battery.image}
                  alt={battery.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-85" />
                
                {/* Бейдж напряжения и емкости */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                  <Zap className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span>{battery.voltage} • {battery.capacity}</span>
                </div>

                {/* Бейдж запаса хода */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {battery.range}
                </div>
              </div>

              {/* Описание и характеристики */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#F3E5AB] mb-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {battery.name}
                  </h3>
                  
                  {/* Стоимость */}
                  <div className="text-2xl font-bold text-[#D4AF37] mb-4">
                    {battery.price}
                  </div>

                  <p className="text-xs text-[#F3E5AB]/70 mb-4 line-clamp-2">
                    {battery.description}
                  </p>

                  {/* Спецификации в мини-плашках */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="p-2.5 bg-[#050505]/80 rounded-lg border border-[#D4AF37]/10">
                      <span className="text-[10px] text-[#F3E5AB]/40 uppercase block">Ячейки</span>
                      <span className="font-semibold text-[#F3E5AB]">{battery.cells}</span>
                    </div>

                    <div className="p-2.5 bg-[#050505]/80 rounded-lg border border-[#D4AF37]/10">
                      <span className="text-[10px] text-[#F3E5AB]/40 uppercase block">Вес</span>
                      <span className="font-semibold text-[#F3E5AB]">{battery.weight}</span>
                    </div>
                  </div>

                  {/* Совместимость с нашими моделями */}
                  <div className="p-3.5 bg-gradient-to-br from-[#050505] to-[#121212] rounded-xl border border-[#D4AF37]/25 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider">
                        Совместимость с моделями:
                      </span>
                    </div>
                    <p className="text-[#F3E5AB]/90 leading-relaxed font-medium">
                      {battery.compatibility}
                    </p>
                  </div>

                  {/* Особенности */}
                  <div className="space-y-1.5 mb-6">
                    {battery.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#F3E5AB]/80">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопка заказа в Telegram */}
                <div className="space-y-2 mt-auto pt-2">
                  <a
                    href={`https://t.me/grand_monk?text=Здравствуйте! Хочу купить аккумулятор: ${encodeURIComponent(battery.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:opacity-90 transition-opacity uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Заказать АКБ в Telegram</span>
                  </a>

                  <a
                    href="tel:+79195016881"
                    className="w-full flex items-center justify-center gap-2 font-medium py-2.5 rounded-xl border border-[#D4AF37]/30 text-[#F3E5AB] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors text-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Уточнить совместимость</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Баннер: Сборка АКБ под заказ */}
        <div className="bg-gradient-to-r from-[#0A0A0A] via-[#141414] to-[#0A0A0A] border border-[#D4AF37]/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Индивидуальный сервис</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#F3E5AB] mb-4 tracking-tight">
              Сборка аккумуляторов под заказ любой конфигурации
            </h2>

            <p className="text-[#F3E5AB]/80 text-sm sm:text-base leading-relaxed mb-6">
              Нужна батарея нестандартного размера, повышенной емкости или на другое напряжение? 
              Мы собираем аккумуляторные сборки на аппарате точечной сварки с использованием никелевой ленты и оригинальных ячеек. 
              Тестируем под реальной нагрузкой на стенде.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://t.me/grand_monk?text=Здравствуйте! Нужна индивидуальная сборка АКБ для электровелосипеда"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs hover:bg-[#B8860B] transition-colors shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Написать мастеру в Telegram</span>
              </a>

              <a
                href="tel:+79195016881"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#D4AF37]/40 text-[#F3E5AB] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors text-xs font-bold uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Консультация: 8 919 501-68-81</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
