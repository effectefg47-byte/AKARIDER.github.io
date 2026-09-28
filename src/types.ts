// ==========================================
// ТИПЫ ДАННЫХ ДЛЯ ПРИЛОЖЕНИЯ (TYPESCRIPT)
// ==========================================

// Структура отзыва
export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
}

// Структура велосипеда (для аренды и продажи)
export interface BikeTariff {
  label: string;       // Например, "С 1 АКБ" или "С 2 АКБ"
  weekPrice: string;   // Например, "3875 ₽/нед"
  monthPrice: string;  // Например, "15 500 ₽/мес"
}

export interface Bike {
  id: string;
  name: string;
  brand?: string;         // Liming, Wendbox, KKSbike
  type: string;
  image: string;          // Главное фото карточки
  images: string[];       // 4 детальных фотографии для страницы "Подробнее"
  speed: string;          // Макс. скорость
  range: string;          // Запас хода
  price: string;          // Базовая цена аренды в неделю (например, "3000 ₽/нед")
  priceMonth?: string;    // Базовая цена аренды в месяц (например, "12 000 ₽/мес")
  purchasePrice?: string; // Цена покупки (например, "50 900 ₽" или "Уточняйте у менеджера")
  tariffs?: BikeTariff[]; // Дополнительные тарифы (например, с 1 АКБ и с 2 АКБ)
  
  // Дополнительные подробные характеристики:
  power?: string;         // Мощность мотора (например, "500W")
  battery?: string;       // Емкость АКБ (например, "60V 21Ah Li-ion")
  chargeTime?: string;    // Время зарядки (например, "5-6 часов")
  weight?: string;        // Вес велосипеда (например, "28 кг")
  maxLoad?: string;       // Максимальная нагрузка (например, "160 кг")
  brakes?: string;        // Тормоза (например, "Дисковые гидравлические")
  wheels?: string;        // Колеса (например, "16x3.0" или "24"")
  description?: string;   // Подробное описание модели
  features?: string[];    // Список ключевых преимуществ/фишек
  reviews?: Review[];     // Массив отзывов
}

// Структура аккумулятора (АКБ)
export interface Battery {
  id: string;
  name: string;           // Название батареи
  voltage: string;        // Напряжение (48V, 60V)
  capacity: string;       // Емкость (13Ah, 21Ah, 30Ah)
  cells: string;          // Тип ячеек (Samsung, Panasonic, EVE Grade A)
  range: string;          // Запас хода
  weight: string;         // Вес АКБ
  dimensions: string;     // Габариты
  price: string;          // Стоимость покупки
  image: string;          // Фото аккумулятора
  description: string;    // Описание
  compatibility: string;  // Совместимость с моделями
  features: string[];     // Особенности (замок, индикатор, BMS защита)
}
