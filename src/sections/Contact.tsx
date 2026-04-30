import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Linkedin, Github, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact__label, .contact__headline-line, .contact__sub, .contact__email, .contact__social, .contact__form', {
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with EmailJS integration
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="contact" className="contact" aria-label="Contact">
      <div className="container">
        <p className="label contact__label">05 — Contact</p>
        <div className="contact__headline" aria-label="Let's work together">
          <span className="contact__headline-line">Let's work</span>
          <span className="contact__headline-line italic">together.</span>
        </div>
        <p className="contact__sub">
          Open to full-time roles, freelance projects, and conversations about interesting problems.
        </p>
        <a
          href="mailto:hello@washif.design"
          className="contact__email"
          aria-label="Send email to Washif"
        >
          hello@washif.design
        </a>
        <div className="contact__social" role="list">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label="Facebook profile (opens in new tab)"
          >
            <Facebook size={16} strokeWidth={1.5} aria-hidden="true" /> Facebook
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label="Instagram profile (opens in new tab)"
          >
            <Instagram size={16} strokeWidth={1.5} aria-hidden="true" /> Instagram
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <Linkedin size={16} strokeWidth={1.5} aria-hidden="true" /> LinkedIn
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label="GitHub profile (opens in new tab)"
          >
            <Github size={16} strokeWidth={1.5} aria-hidden="true" /> GitHub
          </a>
          <a
            href="mailto:hello@washif.design"
            role="listitem"
            aria-label="Send email to Washif"
          >
            <Mail size={16} strokeWidth={1.5} aria-hidden="true" /> Email
          </a>
        </div>

        <form
          ref={formRef}
          className={`contact__form${submitted ? ' hidden' : ''}`}
          onSubmit={handleSubmit}
          aria-label="Contact form"
          noValidate
        >
          <div className="form-field">
            <label htmlFor="name" className="visually-hidden">Your name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              autoComplete="name"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email" className="visually-hidden">Your email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="message" className="visually-hidden">Your message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              required
              rows={4}
            />
          </div>
          <button type="submit" className="form-submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'} <span className="arrow" aria-hidden="true">→</span>
          </button>
        </form>

        <p className={`contact__success${submitted ? ' visible' : ''}`} role="status">
          Message received. I'll be in touch.
        </p>
      </div>

      <footer className="footer" role="contentinfo">
        <hr className="hairline footer__divider" />
        <div className="footer__inner">
          <span className="footer__copy">
            © 2025 Washif — Designed & Built by Washif
          </span>
          <button
            className="footer__top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
