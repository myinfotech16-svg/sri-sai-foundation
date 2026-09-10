import { useCallback, useEffect, useState } from 'react';
import { heroSlides } from '../data/foundation';

const AUTOPLAY_MS = 3000;

export default function HeroSlideshow({ slides = heroSlides, interval = AUTOPLAY_MS }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState({});

  const count = slides.length;

  const markFailed = useCallback((src) => {
    setFailed((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, interval);

    return () => window.clearInterval(id);
  }, [count, paused, interval]);

  if (count === 0) return null;

  return (
    <div
      className="hero-slideshow"
      aria-roledescription="carousel"
      aria-label="Sri Sai Foundation in the community"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-slide${i === index ? ' is-active' : ''}`}
          aria-hidden={i === index ? undefined : 'true'}
        >
          {failed[slide.src] ? (
            <div className="hero-slide-fallback">
              <span>Sri Sai Foundation</span>
            </div>
          ) : (
            <img
              src={slide.src}
              alt={slide.alt || ''}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={() => markFailed(slide.src)}
            />
          )}
        </div>
      ))}

      <div className="hero-slideshow-scrim" />

      {count > 1 && (
        <div className="hero-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className={`hero-dot${i === index ? ' is-active' : ''}`}
              aria-label={`Show image ${i + 1} of ${count}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}