import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Leaf } from 'lucide-react';

export default function AboutContactFooter() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <>
      {/* ABOUT US SECTION */}
      <section className="page-section" id="about">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="section-tagline">Our Platform Mission</span>
          <h2 className="section-main-heading">About FreshFind • Fresh All Along</h2>
          <p className="text-slate-600 text-base leading-relaxed max-w-3xl mx-auto">
            Farmers markets play a vital role in connecting communities with local growers who bring fresh, high-quality, seasonal food to your table.
            <strong> FreshFind</strong> consolidates scattered market locations, operating hours, and produce availability into one simple, accessible Single Page Application (SPA).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-lg">1</div>
              <h3 className="font-extrabold text-slate-800 text-base">Consolidated Directory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Discover neighborhood markets with verified schedules, address info, and live map directions.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-black text-lg">2</div>
              <h3 className="font-extrabold text-slate-800 text-base">Seasonal Produce Guide</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Browse seasonal fruit & vegetable picks, nutritional highlights, and stall availability.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-lg">3</div>
              <h3 className="font-extrabold text-slate-800 text-base">Rule-Based AI Assistant</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Get instant answers to FAQs on open market timings and organic picks anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section className="page-section-alt" id="contact">
        <div className="section-head-title">
          <span className="section-tagline">Get In Touch</span>
          <h2 className="section-main-heading">Contact Us & Live Location Map</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Details & Map */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-800 text-lg">FreshFind Community Office</h3>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={18} className="text-emerald-700 flex-shrink-0" />
                <span>100 Farmers Market Way, Green Basket Plaza, Suite 400</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={18} className="text-emerald-700 flex-shrink-0" />
                <span>+1 (555) 019-2834 / +1 (555) 234-5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={18} className="text-emerald-700 flex-shrink-0" />
                <span>support@freshfind.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock size={18} className="text-emerald-700 flex-shrink-0" />
                <span>Mon - Sun: 7:00 AM - 6:00 PM</span>
              </div>
            </div>

            {/* Embedded Live Google Map */}
            <div className="w-full h-72 rounded-2xl overflow-hidden border border-slate-300 shadow-sm bg-white">
              <iframe
                title="FreshFind Headquarters Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Farmers+Market+Plaza&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Feedback Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-800 text-xl mb-2">Send Us a Message</h3>
            <p className="text-xs text-slate-500 mb-6">Have questions or want to suggest a local market? Reach out to our community team.</p>

            {formSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-8 rounded-xl border border-emerald-200 text-center space-y-3">
                <CheckCircle size={40} className="mx-auto text-emerald-600" />
                <h4 className="font-bold text-lg">Thank You!</h4>
                <p className="text-xs">Your message has been received. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-600 bg-slate-50 focus:bg-white"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-600 bg-slate-50 focus:bg-white"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-600 bg-slate-50 focus:bg-white"
                    placeholder="Write your feedback or market suggestion..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-organi-pill w-full justify-center">
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer className="organi-footer">
        <div className="footer-grid-row">
          <div className="space-y-4">
            <img src="/logo.png" alt="FreshFind Logo" className="h-14 bg-white p-2 rounded-xl" />
            <p className="text-xs text-slate-400 leading-relaxed">
              FreshFind - Fresh All Along. Connecting communities with nearby growers and seasonal organic produce.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home Landing Page</a></li>
              <li><a href="#find-market">Find a Market</a></li>
              <li><a href="#markets">Market Directory</a></li>
              <li><a href="#produce">Produce Guide</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Produce Categories</h4>
            <ul className="footer-links-list">
              <li><a href="#produce">Organic Vegetables</a></li>
              <li><a href="#produce">Fresh Fruits</a></li>
              <li><a href="#produce">Cold-Pressed Juices</a></li>
              <li><a href="#produce">Farm Herbs & Spices</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Project Specs</h4>
            <ul className="footer-links-list">
              <li className="text-xs text-slate-400">Theme: eGreen Basket</li>
              <li className="text-xs text-slate-400">Category: Web Innovation</li>
              <li className="text-xs text-slate-400">Version: 1.0 SRS Compliant</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>© {new Date().getFullYear()} FreshFind • All Rights Reserved. Built with ReactJS.</div>
          <div className="text-xs text-slate-400">Organi Theme • Light Clean UI with Green & Orange Accents</div>
        </div>
      </footer>
    </>
  );
}
