import React from 'react';

export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left Column: Contact Form */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-500">
                            <h3 className="text-xl font-medium text-brand-dark mb-8">Get In Touch with:</h3>
                            <form className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="How can we help you?"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        rows="4"
                                        placeholder="Comments / Questions"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    ></textarea>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-8 py-3 rounded font-medium hover:bg-blue-600 transition-colors w-full md:w-auto"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Contact Details */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">The HFE Group of Hotels & Resorts</h2>
                            <h3 className="text-3xl font-bold text-red-600 mb-6">(Hotel For Everyone)</h3>
                        </div>

                        <div className="space-y-8">
                            {/* Reservations */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-blue-500 text-white p-3 rounded-full shrink-0 flex items-center justify-center w-12 h-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800">For Reservations</h4>
                                    <p className="text-blue-600">contact@thehfegroup.com</p>
                                </div>
                            </div>

                            {/* Shimla */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-blue-500 text-white p-3 rounded-full shrink-0 flex items-center justify-center w-12 h-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800">Shimla (Himachal Pradesh)</h4>
                                    <div className="text-gray-600 text-sm">
                                        <p>The HFE Group of Hotels & Resorts</p>
                                        <p>At: Koti Market (Rohalthi Village)</p>
                                        <p>(Via: Kandaghat - Chail - Kufri Road)</p>
                                        <p>Dist: Shimla, Himachal Pradesh - 171012</p>
                                    </div>
                                </div>
                            </div>

                            {/* Call Us */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-blue-500 text-white p-3 rounded-full shrink-0 flex items-center justify-center w-12 h-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800">Call Us, Now</h4>
                                    <p className="text-gray-600">+91 9981085453</p>
                                    <p className="text-gray-600">+91 8368695898</p>
                                </div>
                            </div>

                            {/* Rishikesh */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-blue-500 text-white p-3 rounded-full shrink-0 flex items-center justify-center w-12 h-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800">Rishikesh (Uttarakhand)</h4>
                                    <div className="text-gray-600 text-sm">
                                        <p>The HFE Group of Hotels & Resorts</p>
                                        <p>At: Rajaji National Park (Tiger Reserve)</p>
                                        <p>Cheela Forest Range, Vill: Gangabhogpur Talla</p>
                                        <p>(Via: Haridwar - Cheela Dam - Rishikesh Road)</p>
                                        <p>Dist: Pauri Garhwal, Uttarakhand - 249306</p>
                                    </div>
                                </div>
                            </div>

                            {/* Ranikhet */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-blue-500 text-white p-3 rounded-full shrink-0 flex items-center justify-center w-12 h-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800">Ranikhet (Uttarakhand)</h4>
                                    <div className="text-gray-600 text-sm">
                                        <p>The HFE Group of Hotels & Resorts</p>
                                        <p>At: Villa No-1 (Vimoksha Valley)</p>
                                        <p>Phase # 1, Dekoti (Majhkhali)</p>
                                        <p>Ranikhet (Somehwar Range)</p>
                                        <p>Dist: Almora, UK - 263652</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
