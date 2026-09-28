// ==========================================
// ПОДВАЛ САЙТА (FOOTER)
// ==========================================

import { Send, Phone } from 'lucide-react';
import { NavPage } from './Header';

interface FooterProps {
  onNavigate?: (page: NavPage) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#050505]/95 py-12 border-t border-[#D4AF37]/20 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-[#D4AF37] text-xl font-bold tracking-widest uppercase">AKARider</span>
          {/* Текст-описание под логотипом в подвале */}
          <p className="text-[#F3E5AB]/50 text-sm mt-2 font-light">
            Премиальный прокат, продажа электровелосипедов и тяговых аккумуляторов.
          </p>
        </div>

        {/* Быстрые ссылки по разделам */}
        {onNavigate && (
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-wider text-[#F3E5AB]/70 font-semibold">
            <button 
              onClick={() => onNavigate('rent')} 
              className="hover:text-[#D4AF37] transition-colors"
            >
              Аренда
            </button>
            <button 
              onClick={() => onNavigate('sale')} 
              className="hover:text-[#D4AF37] transition-colors"
            >
              Покупка байков
            </button>
            <button 
              onClick={() => onNavigate('batteries')} 
              className="hover:text-[#D4AF37] transition-colors"
            >
              Купить АКБ
            </button>
          </div>
        )}
        
        <div className="flex gap-6 sm:gap-8">
          {/* ========================================== */}
          {/* ССЫЛКА НА ТЕЛЕГРАМ (В ПОДВАЛЕ)             */}
          {/* ========================================== */}
          <a 
            href="https://t.me/grand_monk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#F3E5AB]/60 hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
          >
            <Send className="w-4 h-4 text-[#D4AF37]" />
            <span>@grand_monk</span>
          </a>
          
          {/* ========================================== */}
          {/* НОМЕР ТЕЛЕФОНА (В ПОДВАЛЕ)                 */}
          {/* ========================================== */}
          <a 
            href="tel:+79195016881" 
            className="flex items-center gap-2 text-[#F3E5AB]/60 hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>8 919 501-68-81</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
