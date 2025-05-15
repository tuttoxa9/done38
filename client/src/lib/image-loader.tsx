import React from 'react';

interface ImageWithWebPProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Компонент для отображения изображений с поддержкой WebP
 * Автоматически подставляет WebP версию, если она существует, с запасным вариантом
 *
 * @example
 * <ImageWithWebP src="/images/photo.jpg" alt="Фото" />
 * // Будет использовать /images/photo.webp если поддерживается, иначе /images/photo.jpg
 */
export const ImageWithWebP: React.FC<ImageWithWebPProps> = ({
  src,
  alt,
  className,
  width,
  height,
  ...props
}) => {
  // Получаем расширение файла
  const ext = src.split('.').pop() || '';

  // Создаем путь к WebP версии
  const webpSrc = src.replace(new RegExp(`\\.${ext}$`), '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={src} type={`image/${ext === 'jpg' ? 'jpeg' : ext}`} />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        {...props}
      />
    </picture>
  );
};

export default ImageWithWebP;
