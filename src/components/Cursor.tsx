import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterLink = () => dot.classList.add('expanded');
    const onLeaveLink = () => dot.classList.remove('expanded');

    const loop = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.15;
      current.current.y += (pos.current.y - current.current.y) * 0.15;
      dot.style.transform = `translate(${current.current.x - (dot.offsetWidth / 2)}px, ${current.current.y - (dot.offsetHeight / 2)}px)`;
      rafId.current = requestAnimationFrame(loop);
    };

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor]');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    document.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(loop);

    const obs = new MutationObserver(() => {
      const fresh = document.querySelectorAll('a, button, [data-cursor]');
      fresh.forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      obs.disconnect();
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
