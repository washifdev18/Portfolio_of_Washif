import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const entries = [
  {
    date: '2022 – 2026',
    title: 'Bachelor of Computer Science',
    institution: 'Bangladesh Army University of Engineering & Technology',
    tag: 'Education',
    detail: 'Studied all sectors of computer science including software engineering, human-computer interaction, and web technologies. Final year project: a real-time collaborative design tool. Relevant coursework: UI/UX Design, Web Development, Data Structures, Computer Graphics.',
  },
  {
    date: '2026',
    title: 'Final Year Thesis',
    institution: 'BAUET',
    tag: 'Group-Thesis',
    detail: 'IoT-Enabled Arrythmia Detectuion from ECG Signals Using Hybrid Vision Transformers - My final year thesis focused on building a smart healthcare system that combines IoT and AI to detect heart arruthmias from ECG signals. I collected real time data using sensor based harrdware, converted it into spectogram images, used vision transformer model for classification, while also developed a clean web interfac to present the results in an initutive and user-friendly way.',
  },
  {
    date: '2025',
    title: 'Internship - Front End Development',
    institution: 'Lab AR - ICT Tower',
    tag: 'Self-Study',
    detail: 'During my internship at Lab AR, I worked on real-world web interfaces where design meets functionality. I focused on crafting responsive, visually clean UI components while improving user interaction and overall experience. This experience helped me bridge the gap between design thinking and development, shaping how I approach modern frontend systems today.',
  },
  {
    date: '2025',
    title: 'Integrated Design Project',
    institution: 'BAUET',
    tag: 'Self-Project',
    detail: 'I developed an intelligent healthcare application capable of predicting multiple diseases, including heart, kidney & diabetes conditions, using machine learning models integrated into a web based interface. The system collects patient data through an interactive UI & process it to generate real-time predictions, focusing on accuracy, usability, & clear result visualization.',
  },
  {
    date: '2025',
    title: 'Astra Nexus — 3D Galaxy Explorer',
    institution: 'Personal Project',
    tag: 'Project',
    detail: 'Designed and built a fully interactive 3D galaxy explorer using Three.js and WebGL. Implemented raycasting for object selection, orbital camera controls, a custom particle system for star rendering, and live satellite position monitoring.',
  },
  {
    date: '2024',
    title: 'UI Design Internship',
    institution: 'Digital Studio',
    tag: 'Work',
    detail: 'Worked with a small design team on client-facing UI projects. Contributed to wireframing, prototyping in Figma, and front-end implementation of design components. Gained experience working within established design systems.',
  },
];

function ExpEntry({ entry }: { entry: typeof entries[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`exp-entry${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="exp-entry__row">
        <span className="exp-entry__date">{entry.date}</span>
        <span className="exp-entry__title">{entry.title}</span>
        <span className="exp-entry__institution">{entry.institution}</span>
        <span className="exp-entry__tag">{entry.tag}</span>
        <span className="exp-entry__toggle" aria-hidden="true">+</span>
      </div>
      <div className="exp-entry__detail" aria-hidden={!open}>
        <p className="exp-entry__detail-inner">{entry.detail}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.experience__label, .experience__title', {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.exp-entry', {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.exp-entry',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="experience" aria-label="Experience and Education">
      <div className="container">
        <p className="label experience__label">04 — Experience</p>
        <h2 className="experience__title">Education & Work</h2>
        <hr className="hairline" style={{ marginBottom: 'var(--sp-32)' }} />
        {entries.map((entry, i) => (
          <ExpEntry key={i} entry={entry} />
        ))}
      </div>
    </section>
  );
}
