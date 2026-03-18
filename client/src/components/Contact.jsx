import React, { useState, useRef, useEffect } from 'react';

/* ── Intersection Observer ── */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', phone: '', message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

        try {
            const res = await fetch(`${apiUrl}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
                alert('Message sent successfully!');
            } else {
                setStatus('error');
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert('Error sending message.');
        } finally {
            setStatus('');
        }
    };

    const inputClass = "w-full px-5 py-4 bg-brand-sand/50 border border-gray-200 rounded-sm font-display text-sm text-brand-dark placeholder:text-gray-400 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-all duration-300";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className={inputClass} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className={inputClass} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required className={inputClass} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
            </div>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Your message..." required className={`${inputClass} resize-none`} />
            <button
                type="submit"
                disabled={status === 'sending'}
                className={`btn-premium w-full md:w-auto text-xs tracking-widest font-display ${status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>
        </form>
    );
}

export default function Contact() {
    const [ref, inView] = useInView(0.1);

    const contactItems = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: 'Email Us',
            detail: 'contact@thehfegroup.com',
            href: 'mailto:contact@thehfegroup.com'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
            title: 'Call Us',
            detail: '+91 9981085453',
            href: 'tel:+919981085453'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
            title: 'Alternate',
            detail: '+91 8368695898',
            href: 'tel:+918368695898'
        },
    ];

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

            <div ref={ref} className="container mx-auto px-6 relative">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left: Form */}
                    <div className={`w-full lg:w-3/5 transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="bg-white p-8 md:p-10 rounded-sm shadow-xl border-t-2 border-brand-gold">
                            <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Let's Connect</span>
                            <h3 className="text-3xl font-serif text-brand-dark mt-2 mb-8">Get In Touch</h3>
                            <ContactForm />
                        </div>
                    </div>

                    {/* Right: Contact Details */}
                    <div className={`w-full lg:w-2/5 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div>
                            <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Reach Us At</span>
                            <h2 className="text-3xl font-serif text-brand-dark mt-2 mb-2">The HFE Group</h2>
                            <p className="text-brand-teal font-display font-semibold mb-8">Hotel For Everyone</p>
                        </div>

                        <div className="space-y-6">
                            {contactItems.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className="flex gap-4 items-start group p-4 rounded-sm hover:bg-brand-sand/50 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300 flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-brand-dark text-sm">{item.title}</h4>
                                        <p className="text-gray-500 font-display text-sm group-hover:text-brand-gold transition-colors">{item.detail}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Addresses */}
                        <div className="mt-10 space-y-6">
                            {[
                                { name: 'Shimla (HP)', addr: 'At: Koti Market, Dist: Shimla - 171012' },
                                { name: 'Rishikesh (UK)', addr: 'Rajaji National Park, Dist: Pauri Garhwal - 249306' },
                                { name: 'Ranikhet (UK)', addr: 'Vimoksha Valley, Dist: Almora - 263652' }
                            ].map((loc, i) => (
                                <div key={i} className="border-l-2 border-brand-gold/30 pl-4">
                                    <h5 className="font-display font-bold text-brand-dark text-sm">{loc.name}</h5>
                                    <p className="text-gray-400 text-xs font-display">{loc.addr}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
