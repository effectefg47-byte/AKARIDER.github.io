// ==========================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ (ОБЕРТКА САЙТА)
// ==========================================
// Здесь настраивается общий фон, шрифты, переключение страниц:
// 1. Аренда велосипедов (Catalog)
// 2. Покупка велосипедов (SaleCatalog)
// 3. Каталог АКБ (BatteryCatalog)
// 4. Страница конкретного велосипеда с 4 фото и подробным описанием (BikeDetail)

import { useState } from 'react';
import { Header, NavPage } from './components/Header';
import { Catalog } from './components/Catalog';
import { SaleCatalog } from './components/SaleCatalog';
import { BatteryCatalog } from './components/BatteryCatalog';
import { BikeDetail } from './components/BikeDetail';
import { Footer } from './components/Footer';
import { Bike, Review } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Текущий активный раздел ('rent' | 'sale' | 'batteries')
  const [currentPage, setCurrentPage] = useState<NavPage>('rent');
  // Выбранный велосипед для просмотра подробностей (если null — отображается каталог)
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  // Переход по разделам из шапки или подвала
  const handleNavigate = (page: NavPage) => {
    setSelectedBike(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Открытие подробной страницы велосипеда
  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Возврат из карточки товара обратно в каталог
  const handleBackFromDetail = () => {
    setSelectedBike(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewAdded = (_bikeId: string, review: Review) => {
    if (selectedBike) {
      setSelectedBike({
        ...selectedBike,
        reviews: [review, ...(selectedBike.reviews || [])]
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#F3E5AB] font-sans selection:bg-[#D4AF37]/30 flex flex-col antialiased relative overflow-hidden">
      
      {/* ========================================== */}
      {/* ФОНОВОЕ ИЗОБРАЖЕНИЕ                        */}
      {/* ========================================== */}
      {/* Чтобы изменить картинку на фоне сайта, замените ссылку в 'backgroundImage' ниже. */}
      <div 
        className="fixed inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600172454520-134a542a2255?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* ========================================== */}
      {/* АНИМАЦИИ ПЕРЕЛИВАЮЩИХСЯ ГРАДИЕНТОВ       */}
      {/* ========================================== */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(212,175,55,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(212,175,55,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(212,175,55,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(212,175,55,0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(184,134,11,0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(243,229,171,0.05) 0%, transparent 40%)',
            'radial-gradient(circle at 50% 50%, rgba(184,134,11,0.1) 0%, transparent 60%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />



      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Шапка сайта с логотипом, вкладками и контактами */}
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
        />

        {/* Основной контент страницы */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {selectedBike ? (
              <motion.div
                key={`detail-${selectedBike.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BikeDetail 
                  bike={selectedBike} 
                  onBack={handleBackFromDetail}
                  onReviewAdded={handleReviewAdded}
                />
              </motion.div>
            ) : currentPage === 'rent' ? (
              <motion.div
                key="page-rent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Catalog onSelectBike={handleSelectBike} />
              </motion.div>
            ) : currentPage === 'sale' ? (
              <motion.div
                key="page-sale"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SaleCatalog onSelectBike={handleSelectBike} />
              </motion.div>
            ) : (
              <motion.div
                key="page-batteries"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BatteryCatalog />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Подвал сайта */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
