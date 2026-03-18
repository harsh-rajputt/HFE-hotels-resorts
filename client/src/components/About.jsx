import React, { useRef, useState, useEffect } from 'react';

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

export default function About() {
    const [introRef, introInView] = useInView(0.15);
    const [visionRef, visionInView] = useInView(0.15);
    const [ctaRef, ctaInView] = useInView(0.15);

    const activities = [
        'Mountain Trekkings', 'Apple Orchards', 'Paragliding', 'Snow-Fall',
        'River Rafting', 'Jungle Safari', 'Tiger Reserve', 'Ganga Aarti',
        'Char-Dham (UK)', 'Riverside Picnics', 'Wholesome, Home-Style Food'
    ];

    return (
        <section id="about" className="bg-white overflow-hidden">
            {/* ── Introduction ── */}
            <div className="py-24">
                <div ref={introRef} className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Logo with glow ring */}
                        <div className={`w-full md:w-1/3 flex justify-center transition-all duration-1000 ${introInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-brand-gold/10 blur-2xl scale-110" />
                                <img src="/logo.png" alt="The HFE Group" className="w-64 h-64 object-contain drop-shadow-2xl rounded-full bg-brand-dark p-6 relative z-10 border-2 border-brand-gold/20" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`w-full md:w-2/3 transition-all duration-1000 delay-300 ${introInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">About Us</span>
                            <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mt-3 mb-3">The HFE Group of Hotels & Resorts</h2>
                            <p className="text-brand-teal font-display font-semibold text-lg mb-8">Crafting Unforgettable Experiences in Nature & Adventure</p>

                            <div className="space-y-4 text-gray-500 leading-relaxed font-display text-sm">
                                <p>
                                    <span className="text-brand-dark font-semibold">Welcome to The HFE Group of Hotels & Resorts (Hotel For Everyone)</span> — your gateway to honest, affordable adventure.
                                </p>
                                <p>
                                    Set amidst the beauty of nature, our resorts and camps are thoughtfully created for travelers who value excitement, simplicity, and great value. Far from the rush of city life, we offer a refreshing escape where adventure, comfort, and budget-friendly stays come together seamlessly.
                                </p>
                                <p>
                                    With a strong focus on outdoor exploration and meaningful experiences, we design action-packed holidays that everyone can enjoy—without stretching your budget.
                                </p>
                                <p className="font-semibold text-brand-teal border-l-2 border-brand-gold pl-4">
                                    Join us for exciting, affordable adventures and create memories that stay with you forever.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Vision & Mission ── */}
            <div className="bg-brand-dark text-white py-24 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />

                <div ref={visionRef} className="container mx-auto px-6 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                        {/* Vision & Mission */}
                        <div className="flex flex-col justify-center space-y-16">
                            <div className={`text-center md:text-right transition-all duration-1000 ${visionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <span className="text-brand-gold font-display uppercase tracking-[0.25em] text-xs font-bold">Our</span>
                                <h3 className="text-5xl font-serif text-brand-gold mt-2 mb-4">Vision</h3>
                                <p className="text-gray-300 font-display leading-relaxed">
                                    To ignite the spirit of adventure in every guest, creating unforgettable experiences in the great outdoors.
                                </p>
                            </div>

                            <div className={`text-center md:text-right border-t border-gray-800 pt-12 transition-all duration-1000 delay-200 ${visionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <span className="text-brand-gold font-display uppercase tracking-[0.25em] text-xs font-bold">Our</span>
                                <h3 className="text-5xl font-serif text-brand-gold mt-2 mb-4">Mission</h3>
                                <p className="text-gray-300 font-display leading-relaxed">
                                    To provide exceptional experiences through adventurous hospitality and innovative solutions, focusing on quality, customer satisfaction and continuous improvement.
                                </p>
                            </div>
                        </div>

                        {/* Activity List */}
                        <div className="border-l-0 md:border-l border-brand-gold/30 pl-0 md:pl-16 flex flex-col justify-center">
                            <span className={`text-brand-gold font-display uppercase tracking-[0.25em] text-xs font-bold mb-8 text-center md:text-left transition-all duration-1000 delay-300 ${visionInView ? 'opacity-100' : 'opacity-0'}`}>
                                Things To Experience
                            </span>
                            <ul className="space-y-4">
                                {activities.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-3 justify-center md:justify-start group cursor-default transition-all duration-700 ${
                                            visionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                                        }`}
                                        style={{ transitionDelay: `${400 + index * 80}ms` }}
                                    >
                                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full group-hover:scale-150 transition-transform" />
                                        <span className="text-gray-300 group-hover:text-brand-gold font-display font-medium transition-colors duration-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Your Adventure Awaits ── */}
            <div className="py-24 bg-brand-sand">
                <div ref={ctaRef} className="container mx-auto px-6 text-center">
                    <div className={`transition-all duration-1000 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="text-brand-gold font-display uppercase tracking-[0.3em] text-xs font-bold">Get In Touch</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mt-4 mb-12">Your Adventure Awaits!</h2>
                    </div>

                    {/* Contact Badges */}
                    <div className={`flex justify-center gap-4 md:gap-6 mb-20 flex-wrap transition-all duration-1000 delay-200 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {[
                            { icon: '📞', text: '+91 9981085453', href: 'tel:+919981085453' },
                            { icon: '📞', text: '+91 8368695898', href: 'tel:+918368695898' },
                            { icon: '✉️', text: 'contact@thehfegroup.com', href: 'mailto:contact@thehfegroup.com' }
                        ].map((item, i) => (
                            <a key={i} href={item.href} className="group flex items-center gap-3 bg-white border border-gray-100 shadow-md hover:shadow-xl px-6 py-4 rounded-full hover:-translate-y-1 transition-all duration-300">
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-brand-dark font-display font-bold text-sm group-hover:text-brand-gold transition-colors">{item.text}</span>
                            </a>
                        ))}
                    </div>

                    {/* Location Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { id: 'shimla', title: 'Shimla', state: 'Himachal Pradesh', lines: ['At: Koti Market (Rohalthi Village)', '(Via: Kandaghat - Chail - Kufri Road)', 'Dist: Shimla, HP - 171012'] },
                            { id: 'rishikesh', title: 'Rishikesh', state: 'Uttarakhand', lines: ['At: Rajaji National Park (Tiger Reserve)', 'Cheela Forest Range, Vill: Gangabhogpur Talla', 'Dist: Pauri Garhwal, UK - 249306'] },
                            { id: 'ranikhet', title: 'Ranikhet', state: 'Uttarakhand', lines: ['At: Villa No-1 (Vimoksha Valley)', 'Phase # 1, Dekoti (Majhkhali)', 'Dist: Almora, UK - 263652'] }
                        ].map((loc, idx) => (
                            <div
                                key={loc.id}
                                id={loc.id}
                                className={`bg-white p-8 rounded-sm shadow-lg border border-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 scroll-mt-32 text-left ${
                                    ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                                style={{ transitionDelay: `${400 + idx * 150}ms` }}
                            >
                                <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5 text-brand-teal" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                                </div>
                                <h3 className="text-xl font-serif text-brand-dark mb-1">{loc.title}</h3>
                                <p className="text-brand-gold font-display text-xs uppercase tracking-widest font-bold mb-4">{loc.state}</p>
                                <div className="text-gray-500 font-display text-sm space-y-1">
                                    <p className="font-semibold text-brand-dark text-xs">The HFE Group of Hotels & Resorts</p>
                                    {loc.lines.map((line, i) => <p key={i}>{line}</p>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
