import { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(s => observer.observe(s));

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const links = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <button
          className="nav__logo"
          onClick={() => scrollTo('hero')}
          aria-label="Scroll to top"
        >
          WASHIF
        </button>

        <ul className="nav__links" role="list">
          {links.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav__menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          Menu
        </button>
      </nav>

      <div className={`nav__overlay${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button
          className="nav__overlay-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          Close
        </button>
        {links.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={e => { e.preventDefault(); scrollTo(link.id); }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
