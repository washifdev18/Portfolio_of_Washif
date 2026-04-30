import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: '01',
    cat: '3D / Interactive Web',
    year: '2025',
    title: 'Astra Nexus',
    oneliner: 'An interactive 3D Milky Way Galaxy Explorer built entirely in the browser.',
    problem: 'Building a spatially accurate, navigable 3D galaxy that runs entirely in-browser — without sacrificing performance.',
    process: 'Rendered thousands of star particles as a BufferGeometry point cloud, implemented raycasting for object selection, and built a custom camera rig for smooth orbital navigation.',
    result: 'A fully interactive galaxy explorer where users navigate deep space, click celestial objects for data, and monitor live satellite positions — all at 60fps.',
    stack: 'Three.js · WebGL · JavaScript · CSS3 · HTML5',
    image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750&fit=crop',
    imageAlt: 'Astra Nexus — 3D Galaxy Explorer',
    liveUrl: '#',
    githubUrl: '#',
    reverse: false,
  },
  {
    num: '02',
    cat: 'Design / Development',
    year: '2025',
    title: 'Personal Portfolio',
    oneliner: 'The site you are currently reading.',
    problem: 'How do you build a portfolio that doesn\'t look like every other developer\'s portfolio — while keeping it fast, readable, and focused on the work?',
    process: 'Stripped everything back. Led with typography. Used whitespace as a design element. Built every interaction by hand — no templates, no frameworks, no shortcuts.',
    result: 'A portfolio that feels like a studio\'s website — editorial, precise, and completely mine.',
    stack: 'React · TypeScript · CSS3 · GSAP · Lenis.js',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750&fit=crop',
    imageAlt: 'Personal Portfolio — washif.design',
    liveUrl: '#',
    githubUrl: '#',
    reverse: true,
  },
  {
    num: '03',
    cat: 'UI / Front-End',
    year: '2025',
    title: 'City OS-Future City Control panel',
    oneliner: 'City OS - Future City Control Panel is an immersive, UI/UX driven smart city dashboard that visualizes and manages urban systems like tarfic, energy, enviroment and emergency response in real',
    problem: 'Cities lack a centralized real-time system to monitor and manage urban infrastructure efficiently.',
    process: 'Data from city systems is collected in real time, processed into dashboards, and used to monitor and control urban infrastructure.',
    result: 'Improved efficiency, faster decision-making, and better management of urban systems through real-time insights.',
    stack: 'Frontend: React.js, Three.js, Tailwind CSS; Backend: Node.js, Express; Data/Realtime: WebSockets; Visualization: D3.js / Three.js.',
image: '/image/City of Singapore Singapore Skyline.jpg',
imageAlt: 'City OS Future City Control Panel',
    liveUrl: '#',
    githubUrl: 'https://github.com/washifdev18/City-OS-Future-City-Control-panel',
    reverse: false,
  },
  {
    num: '04',
    cat: 'Design Systems',
    year: '2025',
    title: 'Forma — Component Library',
    oneliner: 'A minimal design system and component library built for scale and consistency.',
    problem: 'Creating a reusable set of UI components that maintains visual consistency across multiple projects without becoming a constraint on design flexibility.',
    process: 'Defined a token-based system in Figma, then translated each token into CSS custom properties. Built 20+ components with documented usage guidelines.',
    result: 'A living design system that reduced UI build time by 60% across subsequent projects, with clear documentation and a cohesive visual language.',
    stack: 'Figma · HTML5 · CSS3 · Design Tokens',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750&fit=crop',
    imageAlt: 'Forma — Component Library',
    liveUrl: '#',
    githubUrl: '#',
    reverse: true,
  },
];

function Project({ project, index }: { project: typeof projects[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = rowRef.current?.querySelectorAll('.project__meta, .project__image-col, .project__info-col');
      if (children) {
        gsap.from(children, {
          opacity: 0,
          y: 32,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 75%',
          },
        });
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={rowRef} className="project" aria-label={project.title}>
      <div className="project__meta">
        <span className="project__num">{project.num}</span>
        <span className="project__cat">{project.cat}</span>
        <span className="project__year">{project.year}</span>
      </div>
      <div className={`project__grid${project.reverse ? ' reverse' : ''}`}>
        <div className="project__image-col">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project__image-wrap"
            aria-label={`View ${project.title} live site`}
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              width="1200"
              height="750"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="project__image-overlay">
              <span className="project__view-label">View Project →</span>
            </div>
          </a>
        </div>
        <div className="project__info-col">
          <h3 className="project__title">{project.title}</h3>
          <p className="project__oneliner">{project.oneliner}</p>
          <div className="project__detail">
            <div>
              <span className="project__detail-label">The Challenge</span>
              <p>{project.problem}</p>
            </div>
            <div>
              <span className="project__detail-label">The Approach</span>
              <p>{project.process}</p>
            </div>
            <div>
              <span className="project__detail-label">The Result</span>
              <p>{project.result}</p>
            </div>
          </div>
          <p className="project__stack">{project.stack}</p>
          <div className="project__links">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project__link"
              aria-label={`${project.title} live site`}
            >
              Live Site →
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project__link"
              aria-label={`${project.title} GitHub repository`}
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work__label, .work__title, .work__descriptor', {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="work" aria-label="Selected work">
      <div className="container">
        <p className="label work__label">03 — Work</p>
        <h2 className="work__title">Selected Projects</h2>
        <hr className="hairline" />
        <p className="work__descriptor">
          A curated selection of work — each one a different problem, the same commitment to craft.
        </p>
        <div style={{ marginTop: 'var(--sp-80)' }}>
          {projects.map((project, i) => (
            <Project key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
