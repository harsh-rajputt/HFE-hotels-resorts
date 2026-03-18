import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative bg-brand-dark text-white overflow-hidden">
            {/* Gold accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            {/* Decorative blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 relative">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-20">
                    {/* Logo + Tagline */}
                    <div className="flex flex-col items-center md:items-start">
                        <img src="/logo.png" alt="HFE Logo" className="h-24 w-24 object-cover rounded-full border-2 border-brand-gold/30 shadow-lg mb-6" />
                        <p className="text-gray-400 text-sm font-display text-center md:text-left leading-relaxed">
                            Crafting unforgettable experiences in nature & adventure.
                        </p>
                        {/* Social icons */}
                        <div className="flex gap-3 mt-6">
                            {['facebook', 'instagram', 'youtube'].map(social => (
                                <a key={social} href="#" className="w-10 h-10 border border-gray-700 hover:border-brand-gold rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold transition-all duration-300 hover:-translate-y-1">
                                    <span className="text-xs uppercase font-display font-bold">{social[0].toUpperCase()}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-display font-bold mb-8">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/rooms', label: 'Our Rooms' },
                                { to: '/gallery', label: 'Gallery' },
                                { to: '/#contact', label: 'Contact' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link to={link.to} className="text-gray-400 text-sm font-display hover:text-white hover:pl-2 transition-all duration-300 inline-flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-px bg-brand-gold transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shimla Address */}
                    <div>
                        <h3 className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-display font-bold mb-8">Shimla (HP)</h3>
                        <div className="text-gray-400 text-sm space-y-2 leading-relaxed font-display">
                            <p className="font-semibold text-white/80">The HFE Group of Hotels & Resorts</p>
                            <p>At: Koti Market (Rohalthi Village)</p>
                            <p>(Via: Kandaghat - Chail - Kufri Road)</p>
                            <p>Dist: Shimla, HP - 171012</p>
                        </div>
                    </div>

                    {/* Rishikesh Address */}
                    <div>
                        <h3 className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-display font-bold mb-8">Rishikesh (UK)</h3>
                        <div className="text-gray-400 text-sm space-y-2 leading-relaxed font-display">
                            <p className="font-semibold text-white/80">The HFE Group of Hotels & Resorts</p>
                            <p>At: Rajaji National Park (Tiger Reserve)</p>
                            <p>Cheela Forest Range, Vill: Gangabhogpur Talla</p>
                            <p>Dist: Pauri Garhwal, UK - 249306</p>
                        </div>
                    </div>
                </div>

                {/* Contact Bar */}
                <div className="border-t border-gray-800/80 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap gap-6 justify-center">
                        <a href="tel:+919981085453" className="flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors group">
                            <div className="w-8 h-8 rounded-full border border-gray-700 group-hover:border-brand-gold flex items-center justify-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="text-sm font-display">+91 9981085453</span>
                        </a>
                        <a href="tel:+918368695898" className="flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors group">
                            <div className="w-8 h-8 rounded-full border border-gray-700 group-hover:border-brand-gold flex items-center justify-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="text-sm font-display">+91 8368695898</span>
                        </a>
                        <a href="mailto:contact@thehfegroup.com" className="flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors group">
                            <div className="w-8 h-8 rounded-full border border-gray-700 group-hover:border-brand-gold flex items-center justify-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-sm font-display">contact@thehfegroup.com</span>
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800/50 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-xs text-gray-600 font-display">© 2026 The HFE Group. All rights reserved.</p>
                    <p className="text-xs text-gray-600 font-display">
                        Designed & Developed by{' '}
                        <a href="https://my-portfolio-delta-mocha-43.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-white transition-colors">
                            Harsh Raj
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
