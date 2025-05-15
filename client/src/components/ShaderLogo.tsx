import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ShaderLogoProps {
  width?: string;
  height?: string;
}

const ShaderLogo = ({ width = "40px", height = "40px" }: ShaderLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размеры canvas
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);

    let animationFrameId: number;
    let lastFrameTime = 0;
    let mousePosition = { x: 0.5, y: 0.5 };

    // Полная версия без ограничения FPS
    const targetFps = 60;
    const frameInterval = 1000 / targetFps;

    // Полная версия с максимальным количеством лучей
    const rays = 12;

    // Обработка движения мыши для всех устройств
    const handleMouseMove = (e: MouseEvent) => {
      if (canvas.parentElement) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.x = (e.clientX - rect.left) / canvas.width;
        mousePosition.y = (e.clientY - rect.top) / canvas.height;
      }
    };

    // Добавляем отслеживание мыши для всех устройств
    window.addEventListener('mousemove', handleMouseMove);

    // Функция для рендеринга шейдерного эффекта
    const render = (timestamp: number) => {
      // Контроль FPS
      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      lastFrameTime = timestamp;
      const time = timestamp * 0.001;

      // Очищаем холст
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Градиентный фон - полная версия
      const timeOffset = time * 0.2;
      const centerX = canvas.width / 2 + Math.sin(timeOffset) * 10;
      const centerY = canvas.height / 2 + Math.cos(timeOffset) * 10;

      // Создаем сине-фиолетовый радиальный градиент
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        canvas.width * 0.7
      );

      // Сине-фиолетовые цвета
      gradient.addColorStop(0, 'rgba(130, 60, 255, 0.9)');
      gradient.addColorStop(0.4, 'rgba(80, 100, 255, 0.8)');
      gradient.addColorStop(0.8, 'rgba(20, 70, 255, 0.6)');
      gradient.addColorStop(1, 'rgba(10, 10, 80, 0)');

      // Заполняем круг градиентом
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
      ctx.fill();

      // Добавляем эффект лучей - полная версия
      const rayLength = canvas.width * 0.5;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2 + timeOffset;
        const x2 = Math.cos(angle) * rayLength;
        const y2 = Math.sin(angle) * rayLength;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(time + i) * 0.2})`;
        ctx.lineWidth = 1 + Math.sin(time + i) * 0.5;
        ctx.globalCompositeOperation = 'lighter';
        ctx.stroke();
      }

      ctx.restore();

      ctx.globalCompositeOperation = 'source-over';

      // Добавляем свечение от движения мыши - полная версия
      const glowX = canvas.width * mousePosition.x;
      const glowY = canvas.height * mousePosition.y;

      const mouseGlow = ctx.createRadialGradient(
        glowX, glowY, 0,
        glowX, glowY, canvas.width * 0.5
      );

      mouseGlow.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      mouseGlow.addColorStop(0.3, 'rgba(200, 200, 255, 0.3)');
      mouseGlow.addColorStop(0.6, 'rgba(150, 150, 255, 0.1)');
      mouseGlow.addColorStop(1, 'rgba(100, 100, 255, 0)');

      ctx.fillStyle = mouseGlow;
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.arc(glowX, glowY, canvas.width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height]);

  return (
    <motion.div
      style={{ width, height, borderRadius: '50%', overflow: 'hidden' }}
      animate={{ rotate: [0, 5, 0, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: '50%'
        }}
      />
    </motion.div>
  );
};

export default ShaderLogo;
