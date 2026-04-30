import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(statusRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(nameRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.2')
      .to(roleRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.85')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
      .to(scrollIndRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');

    // Scroll indicator fades out
    if (sectionRef.current) {
      gsap.to(scrollIndRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120',
          scrub: 1,
        },
      });
    }
  }, [ready]);

  return (
    <section ref={sectionRef} id="hero" className="hero" aria-label="Introduction">
      <div className="container">
        <div className="hero__inner">
          <span ref={statusRef} className="hero__status" aria-label="Employment status">
            Available for Work — 2026
          </span>
          <div className="hero__headline" role="heading" aria-level={1}>
            <span ref={nameRef} className="hero__name">Washif</span>
            <span ref={roleRef} className="hero__role">Front-End Developer</span>
          </div>
          <p ref={descRef} className="hero__descriptor">
            Designing and building digital products that<br />feel as good as they function.
          </p>
          <div ref={ctaRef} className="hero__cta">
            <a href="#work" className="cta-link" onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View Work <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="/washif-resume.pdf" className="cta-link" download aria-label="Download resume PDF">
              Download Resume <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div ref={scrollIndRef} className="hero__scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
