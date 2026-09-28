// =========================================================================
// ЭФФЕКТ: ЖИДКОЕ ЗОЛОТО ПОД КУРСОРОМ МЫШИ (LIQUID GOLD EFFECT)
// =========================================================================
// ПОМЕТКА ДЛЯ ВЛАДЕЛЬЦА:
// Этот компонент создает эффект плавного перемещения по жидкому расплавленному золоту:
// 1. Вязкий золотой след (тягучая лента расплавленного металла с бликами).
// 2. Золотые капли с поверхностным натяжением и 3D-бликами.
// 3. Расходящиеся золотые волны (круги на поверхности жидкого золота).
// 4. Всплеск золотых брызг при клике мыши или касании на смартфоне.
// 5. Полная поддержка мобильных устройств (touch) и ПК (mouse).
// 6. Не мешает нажатию на кнопки (pointer-events: none).

import { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface Point {
  x: number;
  y: number;
  time: number;
  radius: number;
}

export function LiquidGoldEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Размеры холста под экран
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Состояние курсора и физика
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      speed: 0,
      isMoving: false,
      lastActive: Date.now(),
    };

    // Списки частиц и следа
    const points: Point[] = [];
    const droplets: Droplet[] = [];
    const ripples: Ripple[] = [];

    // Цветовая палитра жидкого золота
    // const GOLD_CORE = '#FFF2A8';     // яркий блик расплавленного золота
    // const GOLD_MID = '#E5B83B';      // насыщенное чистое золото
    // const GOLD_DEEP = '#D4AF37';     // фирменное золото AKARider
    // const GOLD_DARK = '#8C6514';     // янтарно-бронзовая глубина металла

    // Функция добавления золотого всплеска (при клике или резком движении)
    const addSplash = (x: number, y: number, count = 12) => {
      // Расходящаяся круговая волна
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.min(window.innerWidth * 0.12, 90),
        alpha: 0.65,
        speed: 2.2,
      });

      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.min(window.innerWidth * 0.08, 60),
        alpha: 0.45,
        speed: 1.4,
      });

      // Капли жидкого золота с разлетом
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        droplets.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.5 + Math.random() * 3.5,
          life: 0,
          maxLife: 35 + Math.random() * 30,
          color: Math.random() > 0.4 ? '#F3E5AB' : '#D4AF37',
        });
      }
    };

    // Слушатели мыши и тач-событий
    let lastRippleDist = 0;
    let prevX = mouse.targetX;
    let prevY = mouse.targetY;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouse.targetX = clientX;
      mouse.targetY = clientY;
      mouse.lastActive = Date.now();
      mouse.isMoving = true;

      // Расчет скорости перемещения курсора
      const dx = clientX - prevX;
      const dy = clientY - prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouse.speed = Math.min(dist, 50);

      // Генерация мелких золотых капель при быстром движении (вязкость)
      if (dist > 8 && Math.random() > 0.3) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2;
        const dropletSpeed = Math.random() * 2 + 0.5;
        droplets.push({
          x: clientX,
          y: clientY,
          vx: -Math.cos(angle) * dropletSpeed,
          vy: -Math.sin(angle) * dropletSpeed,
          radius: 1.2 + Math.random() * 2.8,
          life: 0,
          maxLife: 25 + Math.random() * 20,
          color: Math.random() > 0.5 ? '#F3E5AB' : '#D4AF37',
        });
      }

      // Генерация волн на золоте при движении каждые ~25px
      lastRippleDist += dist;
      if (lastRippleDist > 28) {
        ripples.push({
          x: clientX,
          y: clientY,
          radius: 4,
          maxRadius: 35 + Math.min(dist * 0.8, 45),
          alpha: 0.35,
          speed: 1.2 + Math.min(dist * 0.05, 1.5),
        });
        lastRippleDist = 0;
      }

      prevX = clientX;
      prevY = clientY;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = mouse.targetX;
      let clientY = mouse.targetY;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      addSplash(clientX, clientY, 16);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    // Главный цикл анимации (60fps)
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Плавное приближение жидкого золота к реальному курсору (вязкость/инерция)
      // Коэффициент 0.18 дает ощущение густой золотой жидкости
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      // Добавление точки в шлейф
      const now = Date.now();
      const currentRadius = Math.max(6, Math.min(18, 14 - mouse.speed * 0.15));

      points.push({
        x: mouse.x,
        y: mouse.y,
        time: now,
        radius: currentRadius,
      });

      // Ограничение длины шлейфа (держится ~450 миллисекунд)
      while (points.length > 0 && now - points[0].time > 450) {
        points.shift();
      }

      // =====================================================================
      // 1. ОТРИСОВКА РАСХОДЯЩИХСЯ ВОЛН (ЗОЛОТАЯ РЯБЬ НА ПОВЕРХНОСТИ)
      // =====================================================================
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.alpha *= 0.95;

        if (rip.alpha <= 0.01 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);

        // Градиентное золотое кольцо
        ctx.strokeStyle = `rgba(212, 175, 55, ${rip.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = 'rgba(243, 229, 171, 0.6)';
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Внутреннее светлое кольцо
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, Math.max(0.5, rip.radius - 2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 248, 220, ${rip.alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      // =====================================================================
      // 2. ОТРИСОВКА ВЯЗКОГО ЗОЛОТОГО ШЛЕЙФА (ТЯГУЧЕЕ РАСПЛАВЛЕННОЕ ЗОЛОТО)
      // =====================================================================
      if (points.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // СЛОЙ 1: Внешнее золотое сияние
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
        ctx.lineWidth = 26;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 20;
        ctx.stroke();

        // СЛОЙ 2: Тело расплавленного золота (тягучая полоса)
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const ageRatio = (now - p1.time) / 450;
          const alpha = Math.max(0, 1 - ageRatio);
          const width = p1.radius * (1 - ageRatio * 0.7);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(229, 184, 59, ${alpha * 0.85})`;
          ctx.lineWidth = width * 1.4;
          ctx.stroke();
        }

        // СЛОЙ 3: Яркий зеркальный блик по центру (жидкий металл)
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const ageRatio = (now - p1.time) / 450;
          const alpha = Math.max(0, 1 - ageRatio);
          const width = Math.max(1, p1.radius * 0.4 * (1 - ageRatio));

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 250, 220, ${alpha * 0.95})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }

        ctx.restore();
      }

      // =====================================================================
      // 3. ОТРИСОВКА ЗОЛОТЫХ КАПЕЛЬ И БРЫЗГ
      // =====================================================================
      for (let i = droplets.length - 1; i >= 0; i--) {
        const drop = droplets[i];
        drop.x += drop.vx;
        drop.y += drop.vy;
        drop.vx *= 0.94; // сопротивление жидкости
        drop.vy *= 0.94;
        drop.life++;

        const lifeRatio = drop.life / drop.maxLife;
        if (lifeRatio >= 1) {
          droplets.splice(i, 1);
          continue;
        }

        const alpha = 1 - lifeRatio;
        const currentR = drop.radius * (1 - lifeRatio * 0.4);

        ctx.save();
        // Градиент капли: золотое тело с бликом
        const grad = ctx.createRadialGradient(
          drop.x - currentR * 0.3,
          drop.y - currentR * 0.3,
          currentR * 0.1,
          drop.x,
          drop.y,
          currentR
        );
        grad.addColorStop(0, `rgba(255, 255, 240, ${alpha})`);
        grad.addColorStop(0.4, `rgba(243, 229, 171, ${alpha})`);
        grad.addColorStop(1, `rgba(184, 134, 11, ${alpha * 0.8})`);

        ctx.beginPath();
        ctx.arc(drop.x, drop.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      // =====================================================================
      // 4. ОСНОВНАЯ КАПЛЯ ЖИДКОГО ЗОЛОТА ПОД КУРСОРОМ
      // =====================================================================
      const timeSinceActive = now - mouse.lastActive;
      if (timeSinceActive < 3000) {
        const fade = Math.max(0, 1 - timeSinceActive / 3000);
        const orbRadius = 9 + Math.sin(now * 0.005) * 1.5;

        ctx.save();
        // Мягкое внешнее гало
        const auraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          orbRadius * 3
        );
        auraGrad.addColorStop(0, `rgba(212, 175, 55, ${0.4 * fade})`);
        auraGrad.addColorStop(0.5, `rgba(184, 134, 11, ${0.15 * fade})`);
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, orbRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = auraGrad;
        ctx.fill();

        // Основная капля расплавленного металла с объемным бликом
        const dropGrad = ctx.createRadialGradient(
          mouse.x - orbRadius * 0.35,
          mouse.y - orbRadius * 0.35,
          orbRadius * 0.1,
          mouse.x,
          mouse.y,
          orbRadius
        );
        dropGrad.addColorStop(0, `rgba(255, 255, 250, ${0.95 * fade})`);
        dropGrad.addColorStop(0.3, `rgba(243, 229, 171, ${0.9 * fade})`);
        dropGrad.addColorStop(0.7, `rgba(212, 175, 55, ${0.85 * fade})`);
        dropGrad.addColorStop(1, `rgba(140, 101, 20, ${0.6 * fade})`);

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, orbRadius, 0, Math.PI * 2);
        ctx.fillStyle = dropGrad;
        ctx.shadowColor = '#F3E5AB';
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      style={{
        mixBlendMode: 'screen', // Мягко накладывает золотое свечение поверх сайта
      }}
    />
  );
}
