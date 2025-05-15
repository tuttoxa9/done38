import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  width?: string;
  height?: string;
}

const AnimatedLogo = ({ width = "40px", height = "40px" }: AnimatedLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Устанавливаем размеры canvas
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);

    // Предварительно вычисляем некоторые значения
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    // Максимальная частота кадров - полная версия
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;

    const drawGradient = (timestamp: number) => {
      // Ограничиваем FPS
      const elapsed = timestamp - previousTimeRef.current;
      if (elapsed < frameInterval) {
        requestRef.current = requestAnimationFrame(drawGradient);
        return;
      }

      previousTimeRef.current = timestamp - (elapsed % frameInterval);

      // Расчет времени - полная версия
      const time = timestamp * 0.001;

      // Очистка холста
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рассчитываем позицию градиента - полная версия
      const oscillationScale = 0.1;
      const gradientCenterX = centerX + Math.sin(time) * centerX * oscillationScale;
      const gradientCenterY = centerY + Math.cos(time) * centerY * oscillationScale;

      // Создаем градиент с полным количеством цветовых переходов
      const gradient = ctx.createRadialGradient(
        gradientCenterX,
        gradientCenterY,
        0,
        centerX,
        centerY,
        canvas.width * 0.8
      );

      // Для всех устройств используем сложный градиент с анимацией
      gradient.addColorStop(0, `rgba(110, 50, 255, ${0.8 + Math.sin(time) * 0.1})`);
      gradient.addColorStop(0.3, `rgba(60, 80, 255, ${0.7 + Math.cos(time) * 0.05})`);
      gradient.addColorStop(0.6, `rgba(20, 120, 255, ${0.8 + Math.sin(time * 0.5) * 0.05})`);
      gradient.addColorStop(1, 'rgba(30, 30, 120, 0.8)');

      // Рисуем градиентный фон
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Добавляем эффект свечения - полная версия для всех устройств
      // Создаем радиальный градиент для свечения
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width * 0.5
      );

      // Полноценный градиент для всех устройств
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      glowGradient.addColorStop(0.2, 'rgba(200, 200, 255, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(100, 100, 255, 0.1)');
      glowGradient.addColorStop(1, 'rgba(50, 50, 200, 0)');

      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';

      // Запрашиваем следующий кадр
      requestRef.current = requestAnimationFrame(drawGradient);
    };

    // Запускаем анимацию
    requestRef.current = requestAnimationFrame(drawGradient);

    // Очистка при размонтировании
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [width, height]);

  return (
    <motion.div
      style={{ width, height, borderRadius: '50%', overflow: 'hidden' }}
      // Полная версия анимации для всех устройств
      animate={{ rotate: [0, 5, 0, -5, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          willChange: 'transform'  // Улучшает производительность анимаций
        }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
