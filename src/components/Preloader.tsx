import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const name = nameRef.current;
    if (!overlay || !name) return;

    const tl = gsap.timeline({ onComplete });

    tl.to(name, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.4 })
      .to(name, { opacity: 0, duration: 0.4, ease: 'power2.in', delay: 0.3 })
      .to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.inOut' })
      .set(overlay, { display: 'none' });
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="preloader" aria-hidden="true">
      <span ref={nameRef} className="preloader__name">Washif</span>
    </div>
  );
}
