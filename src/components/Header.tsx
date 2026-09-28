// ==========================================
// ШАПКА САЙТА (НАВИГАЦИЯ, ВКЛАДКИ И КОНТАКТЫ)
// ==========================================
// Здесь настроены вкладки переключения разделов:
// - Аренда
// - Покупка байков
// - Аккумуляторы (АКБ)
// А также ссылки на Telegram и телефон.

import { Send, Phone, Bike, BatteryCharging, ShoppingBag } from 'lucide-react';

export type NavPage = 'rent' | 'sale' | 'batteries';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#050505]/85 backdrop-blur-xl border-b border-[#D4AF37]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* ЛОГОТИП AKARider (клик возвращает в начало) */}
          <button 
            onClick={() => onNavigate('rent')}
            className="flex items-center gap-2 group text-left"
          >
            <span 
              className="text-[#D4AF37] text-xl sm:text-2xl font-bold tracking-widest uppercase transition-transform group-hover:scale-105" 
              style={{ textShadow: '0 2px 15px rgba(212,175,55,0.3)' }}
            >
              AKARider
            </span>
          </button>

          {/* НАВИГАЦИОННЫЕ ВКЛАДКИ (НА ПК) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0A0A0A] p-1.5 rounded-2xl border border-[#D4AF37]/20">
            <button
              onClick={() => onNavigate('rent')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                currentPage === 'rent'
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#F3E5AB]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Аренда</span>
            </button>

            <button
              onClick={() => onNavigate('sale')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                currentPage === 'sale'
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#F3E5AB]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Покупка байков</span>
            </button>

            <button
              onClick={() => onNavigate('batteries')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                currentPage === 'batteries'
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#F3E5AB]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              <BatteryCharging className="w-4 h-4" />
              <span>Купить АКБ</span>
            </button>
          </nav>

          {/* КОНТАКТЫ (TELEGRAM И ТЕЛЕФОН) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="https://t.me/grand_monk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F3E5AB]/70 hover:text-[#D4AF37] transition-colors text-xs sm:text-sm font-medium tracking-wide p-2 sm:px-3 sm:py-1.5 rounded-xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:block">@grand_monk</span>
            </a>
            
            <a 
              href="tel:+79195016881" 
              className="flex items-center gap-2 text-[#F3E5AB]/70 hover:text-[#D4AF37] transition-colors text-xs sm:text-sm font-medium tracking-wide p-2 sm:px-3 sm:py-1.5 rounded-xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden lg:block">8 919 501-68-81</span>
            </a>
          </div>

        </div>

        {/* НАВИГАЦИОННАЯ ПАНЕЛЬ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#D4AF37]/15">
          <button
            onClick={() => onNavigate('rent')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              currentPage === 'rent'
                ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                : 'text-[#F3E5AB]/60 hover:text-[#F3E5AB]'
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Аренда</span>
          </button>

          <button
            onClick={() => onNavigate('sale')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              currentPage === 'sale'
                ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                : 'text-[#F3E5AB]/60 hover:text-[#F3E5AB]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Покупка</span>
          </button>

          <button
            onClick={() => onNavigate('batteries')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              currentPage === 'batteries'
                ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                : 'text-[#F3E5AB]/60 hover:text-[#F3E5AB]'
            }`}
          >
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>АКБ</span>
          </button>
        </div>

      </div>
    </header>
  );
}
