import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-gold">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <img src="/logo.png" alt="HFE Logo" className="h-32 object-contain mb-4" />
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-brand-gold font-serif text-xl mb-6">Company</h3>
                        <ul className="space-y-3 font-sans text-sm text-gray-300">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Our Presence</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Tree Nest Resort</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                        </ul>
                    </div>

                    {/* Shimla Address */}
                    <div>
                        <h3 className="text-brand-gold font-serif text-xl mb-6">Shimla (Himachal Pradesh)</h3>
                        <div className="font-sans text-sm text-gray-300 space-y-2 leading-relaxed">
                            <p className="font-semibold text-white">The HFE Group of Hotels & Resorts</p>
                            <p>At: Koti Market (Rohalthi Village)</p>
                            <p>(Via: Kandaghat - Chail - Kufri Road)</p>
                            <p>Dist: Shimla, Himachal Pradesh - 171012</p>
                        </div>
                    </div>

                    {/* Rishikesh Address */}
                    <div>
                        <h3 className="text-brand-gold font-serif text-xl mb-6">Rishikesh (Uttarakhand)</h3>
                        <div className="font-sans text-sm text-gray-300 space-y-2 leading-relaxed">
                            <p className="font-semibold text-white">The HFE Group of Hotels & Resorts</p>
                            <p>At: Rajaji National Park (Tiger Reserve)</p>
                            <p>Cheela Forest Range, Vill: Gangabhogpur Talla</p>
                            <p>(Via: Haridwar - Cheela Dam - Rishikesh Road)</p>
                            <p>Dist: Pauri Garhwal, Uttarakhand - 249306</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Contact Bar */}
                <div className="border-t border-gray-800 pt-8 mt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400">
                        <p className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="text-brand-gold">Call Now:</span> +91 9981085453 || 8368695898
                        </p>
                        <p className="flex items-center gap-2 justify-center md:justify-start mt-2">
                            <span className="text-brand-gold">Email:</span> contact@thehfegroup.com
                        </p>
                    </div>

                    {/* WhatsApp / Social Placeholder */}
                    <div className="flex gap-4">
                        {/* Static button removed in favor of FloatingWhatsApp */}
                    </div>
                </div>

                <div className="text-center text-xs text-gray-600 mt-12">
                    <p>© 2026 The HFE Group. All rights reserved.</p>
                    <p className="mt-2">Designed & Developed by <a href="https://my-portfolio-delta-mocha-43.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-white transition-colors">Harsh Raj</a></p>
                </div>
            </div>
        </footer>
    );
}
