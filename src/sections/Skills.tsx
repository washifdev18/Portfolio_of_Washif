import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: 'Languages & Markup',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'],
  },
  {
    title: 'Design & Tools',
    skills: ['Figma', 'VS Code', 'Git & GitHub', 'Chrome DevTools'],
  },
  {
    title: 'Motion & Libraries',
    skills: ['GSAP & ScrollTrigger', 'Three.js', 'Lenis.js', 'React'],
  },
  {
    title: 'Practices',
    skills: ['Responsive Design', 'CSS Grid & Flexbox', 'Web Performance', 'Design Systems'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills__label, .skills__title, .skills__descriptor', {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 85%',
        },
      });

      const cols = gridRef.current?.querySelectorAll('.skills__col');
      if (cols) {
        gsap.from(cols, {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gridRef.current?.classList.add('hovering');
  };

  const handleMouseLeave = () => {
    gridRef.current?.classList.remove('hovering');
  };

  return (
    <section ref={sectionRef} id="skills" className="skills" aria-label="Skills">
      <div className="container">
        <p className="label skills__label">02 — Skills</p>
        <h2 className="skills__title">What I Work With</h2>
        <hr ref={dividerRef} className="hairline skills__divider" />
        <p className="skills__descriptor">A focused toolkit — chosen for precision, not quantity.</p>
        <div
          ref={gridRef}
          className="skills__grid"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {columns.map(col => (
            <div key={col.title} className="skills__col">
              <p className="skills__col-title">{col.title}</p>
              <ul className="skills__list" role="list">
                {col.skills.map(skill => (
                  <li key={skill} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
