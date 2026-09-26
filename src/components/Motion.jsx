import { useEffect, useRef, useState } from 'react';

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// Fades and moves children into view as the page scrolls.
//  variant: 'up' | 'left' | 'right' | 'zoom' sets the direction the block arrives from.
//  stagger: keeps the wrapper still and lets children marked .rs-item arrive one after another.
export function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', stagger = false, className = '', style, children, ...rest }) {
  const [ref, seen] = useInView(0.15);
  return (
    <Tag ref={ref} data-v={variant} className={`${stagger ? 'rs' : 'reveal'} ${seen ? 'in' : ''} ${className}`} style={{ '--delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

const easeOutExpo = (p) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

export function Counter({ to, suffix = '', duration = 2000, delay = 0 }) {
  const [ref, seen] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) {
      const t = setTimeout(() => setN(to), 0);
      return () => clearTimeout(t);
    }
    let raf; let t0;
    const start = setTimeout(() => {
      t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        setN(Math.round(to * easeOutExpo(p)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(start); cancelAnimationFrame(raf); };
  }, [seen, to, duration, delay]);
  return <span ref={ref}>{n.toLocaleString()}{suffix && <span className="counter__suf">{suffix}</span>}</span>;
}

// Writes --py (px) on the element as it moves through the viewport, for a gentle background parallax.
export function useParallax(ref, factor = 0.1, limit = 70) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
      const off = (r.top + r.height / 2 - window.innerHeight / 2) * factor;
      el.style.setProperty('--py', `${Math.max(-limit, Math.min(limit, off)).toFixed(1)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [ref, factor, limit]);
}

// Pointer-follow highlight. Spread on a card that contains <span className="card__glow" />:
//   <Reveal className="card" {...spot}>
// It writes --mx / --my (px) so the CSS can place a soft light under the cursor.
export const spot = {
  onPointerMove(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(e.clientX - r.left).toFixed(0)}px`);
    el.style.setProperty('--my', `${(e.clientY - r.top).toFixed(0)}px`);
  },
};
