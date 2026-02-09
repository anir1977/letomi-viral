'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop",
    alt: "Person thinking while looking at notes",
    caption: "Human curiosity: thinking through a new idea",
  },
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=1080&fit=crop",
    alt: "Old manuscript with handwritten notes",
    caption: "Ancient manuscripts that shaped knowledge",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop",
    alt: "Science lab experiment setup",
    caption: "Laboratory experiments in progress",
  },
];

export default function HeroImageRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0" aria-live="polite">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover opacity-70 animate-slow-zoom"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      <div className="absolute bottom-6 left-6 z-20 max-w-xs rounded-2xl bg-black/40 px-4 py-3 text-sm text-white backdrop-blur-md shadow-lg">
        <span className="text-white/70">{activeIndex + 1} / {slides.length}</span>
        <p className="mt-1 font-semibold text-white">{slides[activeIndex].caption}</p>
      </div>
    </div>
  );
}
