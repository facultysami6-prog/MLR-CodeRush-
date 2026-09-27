import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icons';
import { QuoteArt } from '../components/Art';
import { Reveal, Counter, useParallax } from '../components/Motion';
import '../pages/css/ContactPage.css';
import FindMarketHero from '../components/FindMarketHero';


const QUOTE_PHOTO = '/quote-bg.jpg'; 
const HUB = { lat: 51.5074, lng: -0.1278, name: 'FreshFind Community Hub', address: '12 Greenmarket Lane, Central District' };
const INFO = [
  { icon: 'mail', title: 'Email us', value: 'hello@freshfind.app', href: 'mailto:hello@freshfind.app', note: 'Replies within one working day' },
  { icon: 'phone', title: 'Call us', value: '+1 (555) 014-2290', href: 'tel:+15550142290', note: 'Monday to Friday' },
  { icon: 'pin', title: 'Visit us', value: HUB.address, href: `https://www.google.com/maps/search/?api=1&query=${HUB.lat},${HUB.lng}`, note: 'By appointment' },
];
const TOPICS = ['General enquiry', 'Add or update a market', 'Feedback on the site', 'Partnership'];

const STATS = [
  { label: 'Markets listed', to: 240, suffix: '+', icon: 'store', fill: 0.78 },
  { label: 'Growers featured', to: 1200, suffix: '+', icon: 'users', fill: 0.92 },
  { label: 'Neighbourhoods', to: 64, suffix: '', icon: 'home', fill: 0.64 },
  { label: 'Average reply (hours)', to: 12, suffix: '', icon: 'clock', fill: 0.84 },
];
const RING_R = 60;
const RING_C = 2 * Math.PI * RING_R;
const FAQ = [
  ['How do I get my market added?', 'Choose “Add or update a market” in the form above and tell us the location, days and hours. We verify every listing before it goes live, usually within three working days.'],
  ['Are the market timings always accurate?', 'Timings are collected from organisers and refreshed each season. Markets can change for weather or holidays, so we recommend confirming before a long trip.'],
  ['Can I use FreshFind on my phone?', 'Yes. The whole site is responsive and works in any modern browser on phones, tablets and desktops.'],
  ['Do you charge markets or growers?', 'No. Listing a market on FreshFind is free for community markets and local growers.'],
];
const QUOTES = [
  ['I finally know which Saturday market has the early strawberries. It saves me a wasted trip every week.', 'Nadia H.', 'Resident, Northfield'],
  ['Our stall footfall rose after we were listed. The team fixed our opening hours the same afternoon.', 'Tomás R.', 'Grower, Riverside Market'],
  ['A calm, clear site that our neighbourhood association now recommends to everyone new to the area.', 'Helen W.', 'Community organiser'],
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MSG_MAX = 500;

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name.';
  if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address, like name@example.com.';
  if (f.message.trim().length < 10) e.message = 'Write at least 10 characters so we can help.';
  return e;
}

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  return now;
}

export default function ContactPage() {
  const now = useNow();
  const [me, setMe] = useState(null);
  const [geo, setGeo] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); 
  const [back, setBack] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const sent = status === 'sent';
  const [faq, setFaq] = useState(0);
  const [q, setQ] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [mapReady, setMapReady] = useState(false);
  const statsRef = useRef(null);
  useParallax(statsRef, 0.1, 70);

 
  const goTo = (i) => { if (i === q) return; setPrev(q); setQ(i); };
  const nextQuote = () => goTo((q + 1) % QUOTES.length);

  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const isOpen = day >= 1 && day <= 5 && hour >= 9 && hour < 18;

  const locate = () => {
    if (!navigator.geolocation) return setGeo('error');
    setGeo('loading');
    navigator.geolocation.getCurrentPosition(
      (p) => { setMe({ lat: p.coords.latitude, lng: p.coords.longitude }); setGeo('idle'); },
      () => setGeo('error'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const mapSrc = me
    ? `https://maps.google.com/maps?saddr=${me.lat},${me.lng}&daddr=${HUB.lat},${HUB.lng}&output=embed`
    : `https://maps.google.com/maps?q=${HUB.lat},${HUB.lng}&z=15&output=embed`;
  useEffect(() => { const t0 = setTimeout(() => setMapReady(false), 0); const t = setTimeout(() => setMapReady(true), 7000); return () => { clearTimeout(t0); clearTimeout(t); }; }, [mapSrc]);
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${HUB.lat},${HUB.lng}${me ? `&origin=${me.lat},${me.lng}` : ''}`;

  const nameOk = form.name.trim().length >= 2;
  const emailOk = EMAIL_RE.test(form.email);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim() || name === 'topic') return;
    setErrors((prev) => ({ ...prev, [name]: validate({ ...form, [name]: value })[name] || '' }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const formEl = e.currentTarget;
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => formEl.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
   
    setStatus('sending');
    timer.current = setTimeout(() => setStatus('sent'), 1300);
  };
  const reset = () => { setForm({ name: '', email: '', topic: TOPICS[0], message: '' }); setErrors({}); setStatus('idle'); setBack(true); };

  return (
    <div className="contact-page-shell">
      <FindMarketHero
        eyebrow="FreshFind Contact"
        label="We're here to help"
        title="Let's stay"
        highlight="connected."
        description="Have a question, suggestion or feedback? Get in touch with the FreshFind team and we'll be happy to help."
        buttonText="Contact us"
        scrollTarget="contact"
        trustTitle="Friendly Support Team"
        trustSubtitle="Prompt responses within 24 hours"
      />
      <main id="contact" className="contact" style={{ scrollMarginTop: '90px' }}>
      {/* INFO CARDS */}
      <div className="container">
        <ul className="info" aria-label="Contact details">
          {INFO.map((i, n) => (
            <Reveal as="li" key={i.title} delay={n * 100}>
              <a href={i.href} className="info__card" {...(i.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="info__icon"><Icon name={i.icon} size={24} /></span>
                <span className="info__title">{i.title}</span>
                <span className="info__value">{i.value}</span>
                <span className="info__note">{i.note}</span>
                <Icon name="arrow" size={20} className="info__go" />
              </a>
            </Reveal>
          ))}
          <Reveal as="li" delay={300}>
            <div className="info__card info__card--static">
              <span className="info__icon"><Icon name="clock" size={24} /></span>
              <span className="info__title">Support hours</span>
              <span className="info__value">Mon to Fri, 9:00 to 18:00</span>
              <span className={`status ${isOpen ? 'status--open' : ''}`}><i />{isOpen ? 'Open now' : 'Closed now'} · {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </Reveal>
        </ul>

       
        <div className="split" id="message">
          <Reveal as="section" stagger className="panel form" aria-labelledby="form-title">
            {sent ? (
              <div className="done" role="status">
                <span className="done__icon"><Icon name="check" size={30} /></span>
                <h2>Thank you, {form.name.split(' ')[0]}.</h2>
                <p>Your note about “{form.topic.toLowerCase()}” is ready. We’ll reply to <strong>{form.email}</strong> soon.</p>
                <dl className="done__sum">
                  <div><dt>Topic</dt><dd>{form.topic}</dd></div>
                  <div><dt>Reply to</dt><dd>{form.email}</dd></div>
                </dl>
                <button type="button" className="btn btn-outline" onClick={reset}>Send another message</button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={onSubmit} noValidate className={back ? 'form__back' : ''}>
                <div className="form__head rs-item" style={{ '--i': 0 }}>
                  <span className="form__badge"><Icon name="message" size={22} /></span>
                  <div>
                    <p className="kicker"><Icon name="leaf" size={16} /> Write to us</p>
                    <h2 id="form-title">Send us a message</h2>
                  </div>
                </div>
                <p className="form__sub rs-item" style={{ '--i': 1 }}>Tell us a little about what you need. A real person will reply within one working day.</p>

                <div className="row rs-item" style={{ '--i': 2 }}>
                  <Field name="name" label="Full name" icon="user" error={errors.name} valid={nameOk && !errors.name}>
                    <input id="name" name="name" value={form.name} onChange={onChange} onBlur={onBlur} placeholder=" " autoComplete="name" aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
                  </Field>
                  <Field name="email" label="Email address" icon="mail" error={errors.email} valid={emailOk && !errors.email}>
                    <input id="email" name="email" type="email" value={form.email} onChange={onChange} onBlur={onBlur} placeholder=" " autoComplete="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} />
                  </Field>
                </div>

                <fieldset className="topics rs-item" style={{ '--i': 3 }}>
                  <legend>What is this about?</legend>
                  <div className="chips">
                    {TOPICS.map((t) => (
                      <label key={t} className="chip">
                        <input type="radio" name="topic" value={t} checked={form.topic === t} onChange={onChange} />
                        <span><Icon name="check" size={14} />{t}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="rs-item" style={{ '--i': 4 }}>
                  <Field name="message" label="Your message" icon="message" multiline count={form.message.length} max={MSG_MAX} error={errors.message}>
                    <textarea id="message" name="message" rows="5" maxLength={MSG_MAX} value={form.message} onChange={onChange} onBlur={onBlur} placeholder=" " aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} />
                  </Field>
                </div>

                <div className="form__foot rs-item" style={{ '--i': 5 }}>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                    {status === 'sending' ? <><span className="spinner" aria-hidden="true" /> Sending…</> : <><Icon name="send" size={18} /> Send message</>}
                  </button>
                  <p className="form__note"><Icon name="lock" size={14} /> Private. We only use your details to reply.</p>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal as="section" delay={140} variant="right" className="panel map" aria-labelledby="map-title">
            <div className="map__head">
              <div>
                <h2 id="map-title">Find us on the map</h2>
                <p key={me ? 'route' : 'hub'} className="map__sub">{me ? 'Showing the route from your current location.' : HUB.name}</p>
              </div>
              <button type="button" className="btn btn-green" onClick={locate} disabled={geo === 'loading'}>
                <Icon name="locate" size={18} className={geo === 'loading' ? 'is-spin' : ''} /> {geo === 'loading' ? 'Locating…' : me ? 'Update location' : 'Use my location'}
              </button>
            </div>
            {geo === 'error' && <p className="map__error" role="alert">We couldn’t read your location. Allow location access in your browser and try again.</p>}
            <div className={`map__frame ${mapReady ? 'is-ready' : ''}`}>
              <iframe key={mapSrc} title={`Map showing ${HUB.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onLoad={() => setMapReady(true)} />
            </div>
            <div className="map__foot">
              <div className="map__addr"><Icon name="pin" size={18} /><span><b>{HUB.name}</b>{HUB.address}</span></div>
              <a className="btn btn-outline btn-sm" href={directions} target="_blank" rel="noopener noreferrer">Get directions <Icon name="arrow" size={16} /></a>
            </div>
          </Reveal>
        </div>
      </div>


      <section className="stats" ref={statsRef} aria-label="FreshFind in numbers">
        <div className="container stats__grid">
          {STATS.map(({ label, to, suffix, icon, fill }, n) => (
            <Reveal key={label} className="stat" delay={n * 120} variant="zoom" style={{ '--fill': RING_C * (1 - fill), '--c': RING_C }}>
              <div className="stat__dial">
                <svg className="stat__svg" viewBox="0 0 148 148" aria-hidden="true">
                  <defs>
                    <linearGradient id={`arc-${n}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#ffc47d" /><stop offset="1" stopColor="#f28c28" />
                    </linearGradient>
                  </defs>
                  <circle className="stat__dots" cx="74" cy="74" r="70" />
                  <circle className="stat__track" cx="74" cy="74" r={RING_R} />
                  <circle className="stat__arc" cx="74" cy="74" r={RING_R} stroke={`url(#arc-${n})`} />
                </svg>
                <span className="stat__badge"><Icon name={icon} size={15} /></span>
                <b><Counter to={to} suffix={suffix} delay={n * 120 + 200} /></b>
              </div>
              <span className="stat__label">{label}</span>
            </Reveal>
          ))}
        </div>
      </section>


      <section className="container duo block">
        <Reveal stagger className="faq" aria-labelledby="faq-title">
          <p className="kicker rs-item" style={{ '--i': 0 }}><Icon name="leaf" size={18} /> Quick answers</p>
          <h2 id="faq-title" className="rs-item" style={{ '--i': 1 }}>Before you write</h2>
          {FAQ.map(([question, answer], i) => (
            <div key={question} className={`acc rs-item ${faq === i ? 'is-open' : ''}`} style={{ '--i': i + 2 }}>
              <h3><button type="button" id={`faq-q${i}`} aria-expanded={faq === i} aria-controls={`faq-a${i}`} onClick={() => setFaq(faq === i ? -1 : i)}>{question}<Icon name="plus" size={20} /></button></h3>
              <div className="acc__body" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}><p>{answer}</p></div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={140} variant="right" className="quote">
          {QUOTE_PHOTO ? <img src={QUOTE_PHOTO} alt="" className="quote__photo" /> : <QuoteArt />}
          <Icon name="quote" size={44} className="quote__mark" />
          <div className="quote__stage" aria-live="polite">
            {QUOTES.map(([text, who, role], i) => (
              <figure key={who} className={i === q ? 'is-on' : i === prev ? 'is-out' : ''} aria-hidden={i !== q}>
                <blockquote>{text}</blockquote>
                <figcaption><b>{who}</b><span>{role}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="quote__dots">
            {QUOTES.map((_, i) => (
              <button key={i} type="button" className={i === q ? 'is-on' : ''} aria-label={`Show testimonial ${i + 1}`} aria-current={i === q} onClick={() => goTo(i)}>
                {i === q && <i key={q} onAnimationEnd={nextQuote} />}
              </button>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  </div>
  );
}


function Field({ name, label, icon, error, valid, multiline, count, max, children }) {
  return (
    <div className={`field ${multiline ? 'field--area' : ''} ${error ? 'field--error' : ''} ${valid ? 'field--valid' : ''}`}>
      <label className="field__box">
        <Icon name={icon} size={18} className="field__icon" />
        {children}
        <span className="field__label">{label}</span>
        {multiline
          ? <span className={`field__count ${count > max * 0.9 ? 'is-near' : ''}`} aria-hidden="true">{count}/{max}</span>
          : <span className="field__ok" aria-hidden="true"><Icon name="check" size={12} /></span>}
      </label>
      {error && <em id={`${name}-err`} role="alert">{error}</em>}
    </div>
  );
}
