import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textColRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textColRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(imageColRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: imageColRef.current,
          start: 'top 80%',
        },
      });

      // Subtle parallax on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: imageColRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about" aria-label="About Washif">
      <div className="container">
        <div className="about__grid">
          <div ref={textColRef} className="about__text-col">
            <p className="label about__label">01 — About</p>
            <h2 className="about__statement">
              I believe great design is the space between <em>intention</em> and execution.
            </h2>
            <div className="about__bio">
              <p>
                I'm Washif — a front-end developer and UI designer. My work lives at
                the intersection of considered design and precise engineering.
              </p>
              <p>
                I build digital products that move well, load fast, and feel
                deliberate. Whether it's a complex 3D interface or a single
                landing page — every decision I make starts with the user
                and ends with the craft.
              </p>
              <p>
                Currently open to full-time roles and select freelance projects.
                Remote-first. Available immediately.
              </p>
            </div>
            <div className="about__facts">
              <div className="about__fact">
                <span className="about__fact-label">Based In</span>
                <span className="about__fact-value">Dhaka, Bangladesh</span>
              </div>
              <div className="about__fact">
                <span className="about__fact-label">Available</span>
                <span className="about__fact-value">Immediately</span>
              </div>
              <div className="about__fact">
                <span className="about__fact-label">Focus</span>
                <span className="about__fact-value">Front-End & UI</span>
              </div>
              <div className="about__fact">
                <span className="about__fact-label">Education</span>
                <span className="about__fact-value">BSc in CSE, 2026</span>
              </div>
            </div>
          </div>
          <div ref={imageColRef} className="about__image-wrap">
            <img
              ref={imageRef}
              src="/profile.jpg"
              alt="Washif — Front-End Developer and UI Designer"
              width="800"
              height="1000"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
