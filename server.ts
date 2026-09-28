// ==========================================
// СЕРВЕР И БАЗА ДАННЫХ AKARider
// ==========================================
// Этот файл отвечает за бэкенд (серверную часть).
// Здесь хранятся каталоги:
// 1. Аренда велосипедов (bikes)
// 2. Покупка велосипедов (saleBikes)
// 3. Аккумуляторы / АКБ (batteries)
//
// 💡 ПОДСКАЗКА ДЛЯ РАЗРАБОТЧИКА:
// Вы можете легко менять ссылки на фото, цены, названия и характеристики прямо в массивах ниже!

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // =========================================================================
  // 1. ПОЛНЫЙ КАТАЛОГ ЭЛЕКТРОВЕЛОСИПЕДОВ (15 МОДЕЛЕЙ)
  // =========================================================================
  // ПОМЕТКА ДЛЯ ВЛАДЕЛЬЦА:
  // Здесь представлены ровно 15 ваших моделей байков (Liming, Wendbox, KKSbike).
  // В каждой модели указаны:
  // - price: стоимость аренды в неделю (например, '3000 ₽/нед')
  // - priceMonth: стоимость аренды в месяц (например, '12 000 ₽/мес')
  // - purchasePrice: цена покупки (например, '50 900 ₽' или 'Уточняйте у менеджера')
  // - tariffs: тарифы с 1 АКБ и с 2 АКБ (если применимо)
  // - image и images: главное фото и 4 фото для галереи
  let bikes = [
    {
      id: 'liming-l5',
      name: 'Liming L5',
      brand: 'Liming',
      type: 'Городской / Курьерский',
      image: 'https://b20.img.avito.st/image/1/1.AGWyyba4rIyEfi6BvtknYq1prooMaC6ahGWujgJgpIYE.cA_LrhsLXvbkjaD8Rq9EzpxlqNzk-PopPg_l3_pQBkc?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
      images: [
        'https://40.img.avito.st/image/1/1.A63D9ra4r0T1QS1JyYp5qtxWrUJ9Vy1S9VqtRnNfp051.6lJGOyw7yCAx-O872GXJBlsXHxIVQOP-2IAqmV8HZH4',
        'https://80.img.avito.st/image/1/1.UmwcB7a4_oUqsHyINDp2bAOn_IOipnyTKqv8h6yu9o-q.grndi_ZiiTMMpY1YRKZj7hwSPb983pTY-fvZRunXsNg',
        'https://10.img.avito.st/image/1/1.wRvjv7a4bfLVCO__7ejpHPwfb_RdHu_k1RNv8FMWZfhV.O-vAG1n7vA3dYyxQhQzyzAebomElnqBSh8qAIRkjpwo?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://b20.img.avito.st/image/1/1.AGWyyba4rIyEfi6BvtknYq1prooMaC6ahGWujgJgpIYE.cA_LrhsLXvbkjaD8Rq9EzpxlqNzk-PopPg_l3_pQBkc?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ=='
      ],
      speed: '35 км/ч',
      range: '55 км',
      price: '3000 ₽/нед',
      priceMonth: '12 000 ₽/мес',
      purchasePrice: '50 900 ₽', // <-- Цена покупки
      power: '450W тяговый мотор',
      battery: '48V 15Ah съемный Li-ion',
      chargeTime: '5 часов',
      weight: '25 кг',
      maxLoad: '145 кг',
      brakes: 'Передние и задние дисковые',
      wheels: '18" городские с усиленным ободом',
      description: 'Популярный электровелосипед для курьерской доставки и комфортных городских поездок. Сбалансированная посадка, вместительная корзина и мягкое широкое седло.',
      features: [
        'Усиленная стальная рама для ежедневной нагрузки',
        'Съемный аккумулятор с замком от кражи',
        'Передняя корзина и задний багажник под сумку',
        'Выгодная цена покупки: 50 900 ₽'
      ],
      reviews: [
        { id: 'r1', author: 'Алексей', rating: 5, text: 'Отличный байк для работы, за месяц окупился полностью. Никаких нареканий!', date: new Date().toISOString() }
      ]
    },
    {
      id: 'liming-turbo-s60',
      name: 'Liming Turbo S60',
      brand: 'Liming',
      type: 'Турбо 60V / Скоростной',
      image: 'https://b00.img.avito.st/image/1/1.7a7u_7a4QUfYSMNKuIjWuvFfQ0FQXsNR2FNDRV5WSU1Y.ozQR327GNw8atPc0h8cAja6SfBaeBsOghQFSJkcf2SY?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
      images: [
        'https://b00.img.avito.st/image/1/1.7a7u_7a4QUfYSMNKuIjWuvFfQ0FQXsNR2FNDRV5WSU1Y.ozQR327GNw8atPc0h8cAja6SfBaeBsOghQFSJkcf2SY?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://20.img.avito.st/image/1/1.KM1cYba4hCRq1gYpAFkL2UPBhiLiwAYyas2GJuzIjC7q.DpiN_j7AhanqzJdaXkDPjWEPT5OuIJuLmMLcAAvk8o0?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://20.img.avito.st/image/1/1.x_pZ9ba4axNvQukeW_7n7kZVaRXnVOkFb1lpEelcYxnv.y1-TARe2szc909SEXvKUoFJsSMSb_uRbuQAFnLbfZxc?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://b30.img.avito.st/image/1/1.wb5s3ba4bVdaau9aYqbD1XB9b1HSfO9BWnFvVdx0ZV3a.PpIox_HIMRMY0KbZ8MCkvJ2MiNFWbrx2ivuVXvPeG7Y?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ=='
      ],
      speed: '50 км/ч',
      range: '65 км',
      price: '3250 ₽/нед',
      priceMonth: '13 000 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      power: '800W Turbo High-Speed',
      battery: '60V тяговый литиевый АКБ',
      chargeTime: '6 часов',
      weight: '29 кг',
      maxLoad: '160 кг',
      brakes: 'Гидравлические дисковые 160мм',
      wheels: '16x3.0 широкие бескамерные',
      description: 'Турбированная 60-вольтовая модель с взрывной динамикой. Мгновенно преодолевает затяжные подъемы даже с полной загрузкой.',
      features: [
        'Турбо-контроллер 60V с быстрым разгоном',
        'Гидравлическая тормозная система',
        'Усиленная передняя амортизационная вилка',
        'Антипрокольные широкие покрышки'
      ],
      reviews: []
    },
    {
      id: 'kksbike',
      name: 'KKSbike',
      brand: 'KKSbike',
      type: 'Курьерский / Надежный',
      image: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=1200'
      ],
      speed: '35 км/ч',
      range: '60 км',
      price: '3250 ₽/нед',
      priceMonth: '13 000 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      power: '500W бесщеточный мотор',
      battery: '48V 16Ah Li-ion',
      chargeTime: '5.5 часов',
      weight: '27 кг',
      maxLoad: '150 кг',
      brakes: 'Дисковые тормоза спереди и сзади',
      wheels: '18" усиленные литые диски',
      description: 'Специально разработанный для интенсивных смен байк KKSbike. Прочные литые диски исключают поломку спиц при езде по брусчатке и бордюрам.',
      features: [
        'Цельные литые алюминиевые диски',
        'Влагозащита проводки и контроллера',
        'Удобный багажник под курьерский короб',
        'Штатная охранная сигнализация'
      ],
      reviews: []
    },
    {
      id: 'liming-l2',
      name: 'Liming L2',
      brand: 'Liming',
      type: 'Компактный городской',
      image: 'https://40.img.avito.st/image/1/1.06yDNra4f0W1gf1IqVH5q5yWfUM9l_1TtZp9RzOfd081.j3kYNW2q2l1BqkrcqZwoobVS2piCt3lWT9OLTferRes',
      images: [
        'https://40.img.avito.st/image/1/1.06yDNra4f0W1gf1IqVH5q5yWfUM9l_1TtZp9RzOfd081.j3kYNW2q2l1BqkrcqZwoobVS2piCt3lWT9OLTferRes',
        'https://b00.img.avito.st/image/1/1.9DUfj7a4WNwpONrRe4TKNQAvWtqhLtrKKSNa3q8mUNap.ikmijj1iQCBV_-7hrNu4MJf44kn8fFKfWUw3QTcgZIE?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://20.img.avito.st/image/1/1.iQzjtba4JeXVAqfo_duACvwVJ-NdFKfz1Rkn51McLe9V.YGoGXWER9icGUP8li33NqB2TdLwG6wU6A98dTFGWpjs?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://40.img.avito.st/image/1/1.xtLGCba4ajvwvug2xh7q1dmpaD14qOgt8KVoOXagYjFw.YjJbXt9W2vYuGPLyvU4XIdyj7nq5pHafOm7JkCfL9g4'
      ],
      speed: '30 км/ч',
      range: '50 км',
      price: '3000 ₽/нед',
      priceMonth: '12 000 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      power: '400W редукторный мотор',
      battery: '48V 13Ah съемный АКБ',
      chargeTime: '5 часов',
      weight: '24 кг',
      maxLoad: '135 кг',
      brakes: 'Дисковые механические',
      wheels: '16" маневренные городские',
      description: 'Легкий, юркий и максимально экономичный электровелосипед. Удобно заносить в подъезд, маневрировать в узких дворах и пешеходных зонах.',
      features: [
        'Легкий вес — всего 24 кг',
        'Низкая рама для комфортной посадки',
        'Экономичный расход аккумулятора',
        'Надежный замок батареи с ключом'
      ],
      reviews: []
    },
    {
      id: 'liming-u5',
      name: 'Liming U5',
      brand: 'Liming',
      type: 'Выносливый курьерский / Dual-Battery',
      image: 'https://90.img.avito.st/image/1/1.GTnkALa4tdDStzfd2kRDSfqgt9ZaoTfG0qy30lSpvdpS.jdkYshg3gH4GsJYlrS5_LaoKVB0ZcfwGooSEf_-SM8k',
      images: [
        'https://90.img.avito.st/image/1/1.GTnkALa4tdDStzfd2kRDSfqgt9ZaoTfG0qy30lSpvdpS.jdkYshg3gH4GsJYlrS5_LaoKVB0ZcfwGooSEf_-SM8k',
        'https://b00.img.avito.st/image/1/1.7cafCba4QS-pvsMiyUqgsYGpQykhqMM5qaVDLS-gSSUp.EpRlk9lZeZIb2_mQy_UXe0ogHH4lEvXvA_Yn6EwYnws?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://70.img.avito.st/image/1/1.t6HTrra4G0jlGZlFseDE1s0OGU5tD5le5QIZSmMHE0Jl.hdMd6d4-uIdU_SnGurLbqZBBNwHspmJUHMkoyKkvP6c',
        'https://50.img.avito.st/image/1/1.Gh5M8ra4tvd6RTT6dNoHa1JStPHyUzThel609fxbvv36.HfGMWT7vd0dp7MvEJk-JPafB0Yb3iZd2UY47wij-vjU'
      ],
      speed: '45 км/ч',
      range: 'до 110 км (с 2 АКБ)',
      price: '3875 ₽/нед',
      priceMonth: '15 500 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '3875 ₽/нед', monthPrice: '15 500 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '4375 ₽/нед', monthPrice: '17 500 ₽/мес' }
      ],
      power: '600W тяговый двигатель',
      battery: '60V съемная система (1 или 2 АКБ)',
      chargeTime: '6 часов',
      weight: '30 кг',
      maxLoad: '165 кг',
      brakes: 'Гидравлические дисковые',
      wheels: '16x3.0 антипрокольные',
      description: 'Тяжеловес для максимальных дистанций. Поддержка работы сразу с двумя аккумуляторами позволяет откатать двойную смену без подзарядки.',
      features: [
        'Тариф с 1 АКБ: 3875 ₽/нед (15 500 ₽/мес)',
        'Тариф с 2 АКБ: 4375 ₽/нед (17 500 ₽/мес)',
        'Гидравлические дисковые тормоза',
        'Запас хода до 110 км при установке 2 АКБ'
      ],
      reviews: []
    },
    {
      id: 'liming-u3',
      name: 'Liming U3',
      brand: 'Liming',
      type: 'Универсальный курьерский / Dual-Battery',
      image: 'https://20.img.avito.st/image/1/1.aj-8X7a4xtaK6ETb5DYIT6__xNAC_kTAivPE1Az2ztwK.d5t0T-xK1qX1grUn6qqO3UQ6nOPakiDLGA9LFXVyY7Q?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
      images: [
        'https://20.img.avito.st/image/1/1.aj-8X7a4xtaK6ETb5DYIT6__xNAC_kTAivPE1Az2ztwK.d5t0T-xK1qX1grUn6qqO3UQ6nOPakiDLGA9LFXVyY7Q?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://80.img.avito.st/image/1/1.xHFplra4aJhfIeqVbZ2WA3o2ap7XN-qOXzpqmtk_YJLf.Nvkrfp7xnqG07MpVJi2ikATI32vPMy_Ls7Ubu2ghnVA',
        'https://80.img.avito.st/image/1/1.sVjIRba4HbH-8p-8pmfhKtvlH7d25J-n_ukfs3jsFbt-.ZyQ9C2BKIC7Y8fLY_pWQrrDJzIoGkXXCOOUQPtlVQ4k',
        'https://80.img.avito.st/image/1/1.z3E2ELa4Y5gAp-GVJCOqASWwYZ6IseGOALxhmoa5a5KA.wAHYXllXmZP8BKkVGzLmeeREnFca73UyomwcDmoHbh8'
      ],
      speed: '42 км/ч',
      range: 'до 100 км (с 2 АКБ)',
      price: '3625 ₽/нед',
      priceMonth: '14 500 ₽/мес',
      purchasePrice: '60 900 ₽', // <-- Цена покупки
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '3625 ₽/нед', monthPrice: '14 500 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '4125 ₽/нед', monthPrice: '16 500 ₽/мес' }
      ],
      power: '500W бесщеточный мотор',
      battery: '60V быстросъемная батарея (1 или 2 АКБ)',
      chargeTime: '5-6 часов',
      weight: '28 кг',
      maxLoad: '155 кг',
      brakes: 'Передний и задний дисковый тормоз',
      wheels: '16x3.0 городские',
      description: 'Универсальный курьерский байк с отличным балансом мощности. Доступен в аренду с 1 или 2 АКБ, а также к покупке за 60 900 ₽.',
      features: [
        'Цена покупки: 60 900 ₽',
        'Тариф с 1 АКБ: 3625 ₽/нед (14 500 ₽/мес)',
        'Тариф с 2 АКБ: 4125 ₽/нед (16 500 ₽/мес)',
        'Усиленная центральная мотоподножка'
      ],
      reviews: []
    },
    {
      id: 'wendbox-24-pro',
      name: 'Wendbox 24 Pro',
      brand: 'Wendbox',
      type: 'Большие колеса 24" / Pro',
      image: 'https://30.img.avito.st/image/1/1.v91uS7a4EzRY_JE5HHH4vinqETLQ6pEiWOcRNt7iGz7Y.y93SSTwaHTmcpDMSE7ghz4aSkojcRSbQOicV4CIiF2A?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
      images: [
        'https://30.img.avito.st/image/1/1.v91uS7a4EzRY_JE5HHH4vinqETLQ6pEiWOcRNt7iGz7Y.y93SSTwaHTmcpDMSE7ghz4aSkojcRSbQOicV4CIiF2A?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://30.img.avito.st/image/1/1.m2SFbra4N42z2bWAv0CwB8LPNYs7z7Wbs8I1jzXHP4cz.KpXdjY8Gvay2Feec9lvbQ72VxZXg-dK9hQkAMmKsKog?cqp=2.YN7dHnrK-mhyvtTBpyubvaFoUVdTM3W7BFy5YaeXzZ_Q2glMrBb_s4irqaJhHlfJPgeDGUqVXQ==',
        'https://40.img.avito.st/image/1/1.es1xMLa41iRHh1QpCS1UrjaR1CLPkVQyR5zUJsGZ3i7H.aYvLxtmu2ZsP3AwfM2eMDjT02BJJEQ-rbcw118FiM6c',
        'https://60.img.avito.st/image/1/1.obOAjLa4DVq2O49Xzpqz0sctD1w-LY9MtiAPWDAlBVA2.45uPCDYpmGaa70lMu99QhRf7EGzHBsgCU9zydvGIWiI'
      ],
      speed: '38 км/ч',
      range: '65 км',
      price: '3000 ₽/нед',
      priceMonth: '12 000 ₽/мес',
      purchasePrice: '53 900 ₽', // <-- Цена покупки
      power: '500W мотор высокого наката',
      battery: '48V 18Ah Li-ion',
      chargeTime: '6 часов',
      weight: '26 кг',
      maxLoad: '150 кг',
      brakes: 'Дисковые механические',
      wheels: '24" спицованные большие колеса',
      description: 'Полноразмерный электробайк на 24-дюймовых колесах. Невероятная плавность хода по ямам, великолепный накат и комфорт для рослых райдеров.',
      features: [
        'Большие колеса 24" с прекрасным накатом',
        'Цена покупки: 53 900 ₽',
        'Аренда: 3000 ₽/нед (12 000 ₽/мес)',
        'Анатомическая спортивно-городская рама'
      ],
      reviews: []
    },
    {
      id: 'wendbox-21-pro',
      name: 'Wendbox 21 Pro',
      brand: 'Wendbox',
      type: 'Колеса 21" / Pro',
      image: 'https://ir.ozone.ru/s3/multimedia-1-i/wc1000/15018933042.jpg',
      images: [
        'https://ir.ozone.ru/s3/multimedia-1-i/wc1000/15018933042.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-r/wc1000/15018936183.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-4/wc1000/15018941740.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-k/wc1000/15018934700.jpg'
      ],
      speed: '35 км/ч',
      range: '60 км',
      price: '3000 ₽/нед',
      priceMonth: '12 000 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      power: '500W бесщеточный мотор',
      battery: '48V 16Ah Li-ion',
      chargeTime: '5.5 часов',
      weight: '25.5 кг',
      maxLoad: '145 кг',
      brakes: 'Дисковые тормоза',
      wheels: '21" универсальные колеса',
      description: 'Идеальный компромисс между крупными 24" колесами и компактными курьерскими моделями. Легкий ход и хорошая управляемость.',
      features: [
        'Универсальный размер колес 21"',
        'Аренда: 3000 ₽/нед (12 000 ₽/мес)',
        'Усиленные спицы и двойной алюминиевый обод',
        'Яркая головная фара с четкой светотеневой границей'
      ],
      reviews: []
    },
    {
      id: 'wendbox-w33-pro',
      name: 'Wendbox W 33 Pro',
      brand: 'Wendbox',
      type: 'Усиленный курьерский / Dual-Battery',
      image: 'https://ir.ozone.ru/s3/multimedia-1-9/wc1000/14885867133.jpg',
      images: [
        'https://ir.ozone.ru/s3/multimedia-1-9/wc1000/14885867133.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-h/wc1000/14885867465.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-d/wc1000/14885867605.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-x/wc1000/14885863917.jpg'
      ],
      speed: '40 км/ч',
      range: 'до 95 км (с 2 АКБ)',
      price: '3200 ₽/нед',
      priceMonth: '12 800 ₽/мес',
      purchasePrice: '60 000 ₽', // <-- Цена покупки
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '3200 ₽/нед', monthPrice: '12 800 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '3500 ₽/нед', monthPrice: '14 000 ₽/мес' }
      ],
      power: '600W мотор',
      battery: '48V/60V система под 1 или 2 АКБ',
      chargeTime: '6 часов',
      weight: '29 кг',
      maxLoad: '160 кг',
      brakes: 'Гидравлика спереди и сзади',
      wheels: '18x2.5 усиленный корд',
      description: 'Профессиональная серия Wendbox W 33 Pro. Доступна для покупки по специальной цене 60 000 ₽, а также в аренду с 1 или 2 батареями.',
      features: [
        'Цена покупки: 60 000 ₽',
        'Тариф с 1 АКБ: 3200 ₽/нед (12 800 ₽/мес)',
        'Тариф с 2 АКБ: 3500 ₽/нед (14 000 ₽/мес)',
        'Гидравлические дисковые тормоза'
      ],
      reviews: []
    },
    {
      id: 'wendbox-u2-pro',
      name: 'Wendbox U2 Pro',
      brand: 'Wendbox',
      type: 'Премиум курьерский Pro / Dual-Battery',
      image: 'https://ir.ozone.ru/s3/multimedia-1-r/wc1000/14884903791.jpg',
      images: [
        'https://ir.ozone.ru/s3/multimedia-1-r/wc1000/14884903791.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-y/wc1000/14884904518.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-j/wc1000/14884903423.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-j/wc1000/14884904503.jpg'
      ],
      speed: '45 км/ч',
      range: 'до 110 км (с 2 АКБ)',
      price: '4200 ₽/нед',
      priceMonth: '16 800 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '4200 ₽/нед', monthPrice: '16 800 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '4500 ₽/нед', monthPrice: '18 000 ₽/мес' }
      ],
      power: '750W тяговый двигатель',
      battery: '60V съемная система под 1 или 2 АКБ',
      chargeTime: '6-7 часов',
      weight: '31 кг',
      maxLoad: '170 кг',
      brakes: 'Усиленная гидравлика с увеличенными роторами',
      wheels: '16x3.0 бескамерные',
      description: 'Топовая Pro-модификация с мощным двигателем 750W. Превосходная гидравлика и опция подключения второго аккумулятора для работы нон-стоп.',
      features: [
        'Тариф с 1 АКБ: 4200 ₽/нед (16 800 ₽/мес)',
        'Тариф с 2 АКБ: 4500 ₽/нед (18 000 ₽/мес)',
        'Мощный мотор 750W с крутящим моментом 75 Н*м',
        'Премиальные гидравлические тормоза'
      ],
      reviews: []
    },
    {
      id: 'wendbox-u2',
      name: 'Wendbox U2',
      brand: 'Wendbox',
      type: 'Городской курьерский / Dual-Battery',
      image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1572054366624-912b704c3561?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200'
      ],
      speed: '40 км/ч',
      range: 'до 100 км (с 2 АКБ)',
      price: '3900 ₽/нед',
      priceMonth: '15 600 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '3900 ₽/нед', monthPrice: '15 600 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '4200 ₽/нед', monthPrice: '16 800 ₽/мес' }
      ],
      power: '600W бесщеточный мотор',
      battery: '60V съемный АКБ (1 или 2 шт)',
      chargeTime: '6 часов',
      weight: '29.5 кг',
      maxLoad: '160 кг',
      brakes: 'Дисковые тормоза',
      wheels: '16x3.0',
      description: 'Базовая курьерская модель Wendbox U2. Отличается высокой надежностью всех узлов и возможностью расширения емкости батарей.',
      features: [
        'Тариф с 1 АКБ: 3900 ₽/нед (15 600 ₽/мес)',
        'Тариф с 2 АКБ: 4200 ₽/нед (16 800 ₽/мес)',
        'Проверенная надежная платформа U2',
        'Усиленный задний багажник под большой короб'
      ],
      reviews: []
    },
    {
      id: 'wendbox-u3-pro',
      name: 'Wendbox U3 Pro',
      brand: 'Wendbox',
      type: 'Надежный курьерский Pro / Dual-Battery',
      image: 'https://avatars.mds.yandex.net/get-mpic/15034155/2a000001995faed6e1587b01c4276ef7a33f/optimize',
      images: [
        'https://avatars.mds.yandex.net/get-mpic/15034155/2a000001995faed6e1587b01c4276ef7a33f/optimize',
        'https://avatars.mds.yandex.net/get-mpic/14836541/2a000001995faed6e2b2be5878336a83aea4/optimize',
        'https://avatars.mds.yandex.net/get-mpic/15269583/2a000001995faed6e31100d799ee8850a8a8/optimize',
        'https://avatars.mds.yandex.net/get-mpic/12390472/2a000001995faed6e224e840061958d4dbac/optimize'
      ],
      speed: '38 км/ч',
      range: 'до 90 км (с 2 АКБ)',
      price: '3200 ₽/нед',
      priceMonth: '12 800 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '3200 ₽/нед', monthPrice: '12 800 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '3500 ₽/нед', monthPrice: '14 000 ₽/мес' }
      ],
      power: '500W мотор',
      battery: '48V/60V Dual-Battery',
      chargeTime: '5.5 часов',
      weight: '28 кг',
      maxLoad: '150 кг',
      brakes: 'Дисковые механические',
      wheels: '16x3.0',
      description: 'Доступный и надежный байк серии U3 Pro. Выгодная стоимость аренды и возможность удвоить запас хода со вторым аккумулятором.',
      features: [
        'Тариф с 1 АКБ: всего 3200 ₽/нед (12 800 ₽/мес)',
        'Тариф с 2 АКБ: 3500 ₽/нед (14 000 ₽/мес)',
        'Надежные дисковые тормоза',
        'Удобное управление на руле'
      ],
      reviews: []
    },
    {
      id: 'wendbox-u5-pro',
      name: 'Wendbox U5 Pro',
      brand: 'Wendbox',
      type: 'Мощный курьерский Pro / Dual-Battery',
      image: 'https://avatars.mds.yandex.net/get-mpic/11393104/2a0000019613ba774cdddb1566c9efa72001/optimize',
      images: [
        'https://avatars.mds.yandex.net/get-mpic/11393104/2a0000019613ba774cdddb1566c9efa72001/optimize',
        'https://avatars.mds.yandex.net/get-mpic/14917431/2a0000019613bb66dc78f05cb6cb54918833/optimize',
        'https://avatars.mds.yandex.net/get-mpic/12300570/2a0000019613bb66de55af78c612a62d6817/optimize',
        'https://avatars.mds.yandex.net/get-mpic/1749547/2a0000019613bb66ded1af1b0d1581384293/optimize'
      ],
      speed: '42 км/ч',
      range: 'до 105 км (с 2 АКБ)',
      price: '3400 ₽/нед',
      priceMonth: '13 600 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '3400 ₽/нед', monthPrice: '13 600 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '3800 ₽/нед', monthPrice: '15 200 ₽/мес' }
      ],
      power: '600W мотор',
      battery: '60V съемная система (1 или 2 АКБ)',
      chargeTime: '6 часов',
      weight: '30 кг',
      maxLoad: '165 кг',
      brakes: 'Гидравлика спереди и сзади',
      wheels: '16x3.0 бескамерные',
      description: 'Улучшенная версия U5 с маркировкой Pro. Усиленная амортизация, гидравлическая тормозная система и мощный крутящий момент.',
      features: [
        'Тариф с 1 АКБ: 3400 ₽/нед (13 600 ₽/мес)',
        'Тариф с 2 АКБ: 3800 ₽/нед (15 200 ₽/мес)',
        'Двойная амортизация для плавной езды',
        'Гидравлические дисковые тормоза'
      ],
      reviews: []
    },
    {
      id: 'wendbox-u5',
      name: 'Wendbox U5',
      brand: 'Wendbox',
      type: 'Классический курьерский / Dual-Battery',
      image: 'https://avatars.mds.yandex.net/get-mpic/20182864/2a0000019d9195348a43b6cee4828d69daa6/optimize',
      images: [
        'https://avatars.mds.yandex.net/get-mpic/20182864/2a0000019d9195348a43b6cee4828d69daa6/optimize',
        'https://avatars.mds.yandex.net/get-mpic/20266157/2a0000019d9195348a76cf7ce7ceed4749b3/optimize',
        'https://avatars.mds.yandex.net/get-mpic/18498696/2a0000019d9195348b5be3cf3364ad595566/optimize',
        'https://avatars.mds.yandex.net/get-mpic/20033107/2a0000019d9198028c66b5e37c176ffe90fd/optimize'
      ],
      speed: '40 км/ч',
      range: 'до 100 км (с 2 АКБ)',
      price: '3400 ₽/нед',
      priceMonth: '13 600 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      tariffs: [
        { label: 'С 1 АКБ', weekPrice: '3400 ₽/нед', monthPrice: '13 600 ₽/мес' },
        { label: 'С 2 АКБ', weekPrice: '3800 ₽/нед', monthPrice: '15 200 ₽/мес' }
      ],
      power: '500W мотор',
      battery: '60V съемная батарея (1 или 2 АКБ)',
      chargeTime: '6 часов',
      weight: '29 кг',
      maxLoad: '160 кг',
      brakes: 'Дисковые тормоза',
      wheels: '16x3.0',
      description: 'Надежная курьерская база Wendbox U5. Продуманная геометрия посадки для сохранения сил во время длительных смен курьера.',
      features: [
        'Тариф с 1 АКБ: 3400 ₽/нед (13 600 ₽/мес)',
        'Тариф с 2 АКБ: 3800 ₽/нед (15 200 ₽/мес)',
        'Стойкое защитное покрытие рамы',
        'Зеркала заднего вида и громкий гудок'
      ],
      reviews: []
    },
    {
      id: 'liming-u2-pro',
      name: 'Liming U2 Pro',
      brand: 'Liming',
      type: 'Премиум серия / Флагман',
      image: 'https://ir.ozone.ru/s3/multimedia-1-2/wc2500/13635169202.jpg',
      images: [
        'https://ir.ozone.ru/s3/multimedia-1-2/wc2500/13635169202.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-d/wc2500/13635170545.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-6/wc2500/13635169998.jpg',
        'https://ir.ozone.ru/s3/multimedia-1-m/wc2500/13635169726.jpg'
      ],
      speed: '48 км/ч',
      range: '85 км',
      price: '4300 ₽/нед',
      priceMonth: '17 200 ₽/мес',
      purchasePrice: 'Уточняйте у менеджера',
      power: '800W высокомоментный мотор',
      battery: '60V 24Ah Li-ion в усиленном металле',
      chargeTime: '6-7 часов',
      weight: '31 кг',
      maxLoad: '170 кг',
      brakes: 'Четырехпоршневая гидравлика',
      wheels: '16x3.0 внедорожный протектор',
      description: 'Флагманский электровелосипед серии Liming U2 Pro. Мощнейший двигатель 800W, рекордная тяга в горку и максимальный комфорт подвески.',
      features: [
        'Аренда: 4300 ₽/нед (17 200 ₽/мес)',
        'Флагманский двигатель 800W',
        'Четырехпоршневая гидравлика',
        'Усиленный стальной багажник под короб'
      ],
      reviews: []
    }
  ];

  // =========================================================================
  // 2. КАТАЛОГ ВЕЛОСИПЕДОВ ДЛЯ ПОКУПКИ (ВСЕ ТЕ ЖЕ 15 МОДЕЛЕЙ)
  // =========================================================================
  // ПОМЕТКА ДЛЯ ВЛАДЕЛЬЦА:
  // Для покупки доступны ровно те же 15 моделей.
  // Модели с известной ценой (Liming L5, Liming U3, Wendbox 24 pro, Wendbox W 33 pro)
  // имеют точную цену покупки. Для остальных указано "Уточняйте у менеджера".
  // Вы можете менять цену покупки в поле purchasePrice в массиве bikes выше!
  let saleBikes = bikes.map(bike => ({
    ...bike,
    id: `sale-${bike.id}`
  }));

  // =========================================================================
  // 3. КАТАЛОГ АККУМУЛЯТОРОВ (АКБ) - СТРОГО 3 ВИДА: 60/30, 60/42, 60/70
  // =========================================================================
  // ПОМЕТКА ДЛЯ ВЛАДЕЛЬЦА:
  // Здесь представлены ровно 3 типа тяговых аккумуляторов 60V:
  // 1. 60V / 30Ah (60/30)
  // 2. 60V / 42Ah (60/42)
  // 3. 60V / 70Ah (60/70)
  // В поле compatibility прописана совместимость именно с вашими моделями парка!
  let batteries = [
    {
      id: 'bat-60-30',
      name: 'АКБ 60V 30Ah (60/30) Тяговый Li-ion',
      voltage: '60V',
      capacity: '30 Ah',
      cells: 'Li-ion 21700 Grade A (EVE Energy)',
      range: 'до 110-120 км',
      weight: '10.2 кг',
      dimensions: '390 x 165 x 95 мм',
      price: '37 900 ₽', // <-- Цена АКБ 60/30
      image: 'https://images.unsplash.com/photo-1558441719-8b489c634a10?auto=format&fit=crop&q=80&w=800',
      description: 'Тяговый аккумулятор 60V 30Ah в прочном металлическом корпусе с замком зажигания и ручкой. Идеален для курьеров на полную рабочую смену без подзарядки.',
      compatibility: 'Wendbox (W 33 pro, 21 pro, 24 pro, u2, u2 pro, u3 pro, u5, u5 pro), Liming (turbo s60, u2 pro, U5, U3), KKSbike',
      features: [
        'Емкость 30 Ah (1800 Вт*ч чистой энергии)',
        'Штатная совместимость с моделями Wendbox, Liming и KKSbike',
        'Смарт-BMS плата с защитой от перегрузок и КЗ',
        'Ударопрочный металлический корпус с замком и ручкой'
      ]
    },
    {
      id: 'bat-60-42',
      name: 'АКБ 60V 42Ah (60/42) Long Range Li-ion',
      voltage: '60V',
      capacity: '42 Ah',
      cells: 'Li-ion 21700 High Capacity Grade A',
      range: 'до 160-170 км',
      weight: '14.5 кг',
      dimensions: '390 x 195 x 105 мм',
      price: '49 900 ₽', // <-- Цена АКБ 60/42
      image: 'https://images.unsplash.com/photo-1619641216853-b097b6928e46?auto=format&fit=crop&q=80&w=800',
      description: 'Тяговый аккумулятор увеличенной емкости 60V 42Ah. Позволяет работать 1.5–2 смены без промежуточной зарядки.',
      compatibility: 'Wendbox (W 33 pro, 24 pro, u2, u2 pro, u5, u5 pro), Liming (turbo s60, u2 pro, U3, U5)',
      features: [
        'Емкость 42 Ah (2520 Вт*ч энергии)',
        'Запас хода до 170 км без подзарядки на полной смене',
        'Совместим с линейками Wendbox Pro и флагманами Liming Turbo/U-серии',
        'Усиленные медные шины и виброзащита ячеек'
      ]
    },
    {
      id: 'bat-60-70',
      name: 'АКБ 60V 70Ah (60/70) Ultra Max Heavy',
      voltage: '60V',
      capacity: '70 Ah',
      cells: 'Тяговые призматические ячейки Li-ion CATL Grade A',
      range: 'до 250 км',
      weight: '21.5 кг',
      dimensions: '420 x 220 x 140 мм',
      price: '74 900 ₽', // <-- Цена АКБ 60/70
      image: 'https://images.unsplash.com/photo-1558441719-8b489c634a10?auto=format&fit=crop&q=80&w=800',
      description: 'Флагманский аккумулятор колоссальной емкости 70Ah (4.2 кВт*ч)! Создан для беспрерывной работы на максимальные дистанции.',
      compatibility: 'Усиленные курьерские базы Wendbox (u2 pro, u5 pro, W 33 pro), Liming (u2 pro, turbo s60) и байки с багажным кофром под АКБ 60V',
      features: [
        'Колоссальная емкость 70 Ah (4200 Вт*ч)',
        'Рекордный пробег до 250 км на одной зарядке',
        'Идеально подходит для курьерских байков Liming и Wendbox',
        'Влагозащитный стальной бокс с силовым разъемом Anderson'
      ]
    }
  ];

  // =========================================================================
  // API ЭНДПОИНТЫ
  // =========================================================================

  // 1. Получить каталог аренды
  app.get('/api/bikes', (req, res) => {
    res.json(bikes);
  });

  // 2. Получить каталог покупки велосипедов
  app.get('/api/sale-bikes', (req, res) => {
    res.json(saleBikes);
  });

  // 3. Получить каталог аккумуляторов (АКБ)
  app.get('/api/batteries', (req, res) => {
    res.json(batteries);
  });

  // 4. Добавить отзыв к велосипеду
  app.post('/api/bikes/:id/reviews', (req, res) => {
    const { id } = req.params;
    const { author, rating, text } = req.body;
    
    // Ищем в аренде или продаже
    let bike = bikes.find(b => b.id === id);
    if (!bike) {
      bike = saleBikes.find(b => b.id === id);
    }
    
    if (!bike) return res.status(404).json({ error: 'Not found' });
    
    const newReview = {
      id: Date.now().toString(),
      author: author || 'Аноним',
      rating: Number(rating) || 5,
      text,
      date: new Date().toISOString()
    };
    
    bike.reviews = bike.reviews || [];
    bike.reviews.unshift(newReview);
    res.json(newReview);
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
