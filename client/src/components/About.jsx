import React from 'react';

export default function About() {
    return (
        <section id="about" className="py-20 bg-white">
            {/* Introduction Section */}
            <div className="container mx-auto px-4 mb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <img src="/logo.png" alt="The HFE Group" className="w-80 h-80 object-contain drop-shadow-xl rounded-full bg-black p-4" />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-gold mb-2 text-center md:text-left">The HFE Group of Hotels & Resorts</h2>
                        <h3 className="text-xl font-bold text-gray-700 mb-6 text-center md:text-left">Crafting Unforgettable Experiences in Nature & Adventure</h3>

                        <div className="space-y-4 text-gray-600 leading-relaxed font-sans text-justify">
                            <p>
                                <strong>Welcome to The HFE Group of Hotels & Resorts (Hotel For Everyone)</strong><br />
                                Your gateway to honest, affordable adventure.
                            </p>
                            <p>
                                Set amidst the beauty of nature, our resorts and camps are thoughtfully created for travelers who value excitement, simplicity, and great value. Far from the rush of city life, we offer a refreshing escape where adventure, comfort, and budget-friendly stays come together seamlessly.
                            </p>
                            <p>
                                With a strong focus on outdoor exploration and meaningful experiences, we design action-packed holidays that everyone can enjoy. From thrilling adventure activities to calming, nature-based programs, our camps cater to families, groups, and solo travelers alike—without stretching your budget.
                            </p>
                            <p>
                                Our experienced and passionate team is dedicated to delivering safe, enjoyable, and well-organized experiences, ensuring maximum value for your time and money. At The HFE Group of Hotels & Resorts, we believe the best adventures aren’t about luxury—they’re about real experiences, shared moments, and lasting memories.
                            </p>
                            <p className="font-medium text-brand-teal">
                                Join us for exciting, affordable adventures and create memories that stay with you forever.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="bg-black text-white py-16 mb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 align-top">
                        {/* Vision & Mission */}
                        <div className="flex flex-col justify-center space-y-12">
                            <div className="text-center md:text-right">
                                <h3 className="text-4xl font-bold text-red-600 mb-4 tracking-wider">VISION</h3>
                                <p className="text-lg text-gray-200">
                                    To ignite the spirit of adventure in every guest, creating unforgettable experiences in the great outdoors.
                                </p>
                            </div>

                            <div className="text-center md:text-right border-t border-gray-800 pt-8">
                                <h3 className="text-4xl font-bold text-red-600 mb-4 tracking-wider">MISSION</h3>
                                <p className="text-lg text-gray-200">
                                    To provide exceptional experiences through adventurous hospitality and innovative solutions, focusing on quality, customer satisfaction and continuous improvement.
                                </p>
                            </div>
                        </div>

                        {/* Activity List */}
                        <div className="border-l-0 md:border-l-2 border-red-600 pl-0 md:pl-12 flex flex-col justify-center md:items-start text-center md:text-left">
                            <ul className="space-y-3 text-lg font-medium text-brand-gold">
                                {['Mountain Trekkings', 'Apple Orchards', 'Paragliding', 'Snow-Fall', 'River Rafting', 'Jungle Safari', 'Tiger Reserve', 'Ganga Aarti', 'Char-Dham (UK)', 'Riverside Picnics', 'Wholesome, Home-Style Food'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2 justify-center md:justify-start hover:text-white transition-colors cursor-default">
                                        <span className="text-red-600">»</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Presence / Contact Section */}
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-8 font-serif">Your Adventure Awaits !</h2>

                <div className="flex justify-center gap-8 mb-16 flex-wrap">
                    <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full">
                        <div className="bg-blue-500 text-white p-2 rounded-full">📞</div>
                        <div className="text-brand-dark font-bold text-lg">+91 9981085453</div>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full">
                        <div className="bg-blue-500 text-white p-2 rounded-full">📞</div>
                        <div className="text-brand-dark font-bold text-lg">+91 8368695898</div>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full">
                        <div className="bg-blue-500 text-white p-2 rounded-full">✉️</div>
                        <div className="text-brand-dark font-bold text-lg">contact@thehfegroup.com</div>
                    </div>
                </div>

                <div className="space-y-12 max-w-4xl mx-auto text-left">
                    {/* Shimla */}
                    <div id="shimla" className="flex gap-6 items-start scroll-mt-32">
                        <div className="hidden md:block pt-1">
                            <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-red-600 mb-2">Shimla (Himachal Pradesh)</h3>
                            <div className="text-gray-600 space-y-1">
                                <p className="font-semibold text-gray-800">The HFE Group of Hotels & Resorts</p>
                                <p>At: Koti Market (Rohalthi Village)</p>
                                <p>(Via: Kandaghat - Chail - Kufri Road)</p>
                                <p>Dist: Shimla, Himachal Pradesh - 171012</p>
                            </div>
                        </div>
                    </div>

                    {/* Rishikesh */}
                    <div id="rishikesh" className="flex gap-6 items-start scroll-mt-32">
                        <div className="hidden md:block pt-1">
                            <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-red-600 mb-2">Rishikesh (Uttarakhand)</h3>
                            <div className="text-gray-600 space-y-1">
                                <p className="font-semibold text-gray-800">The HFE Group of Hotels & Resorts</p>
                                <p>At: Rajaji National Park (Tiger Reserve)</p>
                                <p>Cheela Forest Range, Vill: Gangabhogpur Talla</p>
                                <p>(Via: Haridwar - Cheela Dam - Rishikesh Road)</p>
                                <p>Dist: Pauri Garhwal, Uttarakhand - 249306</p>
                            </div>
                        </div>
                    </div>

                    {/* Ranikhet */}
                    <div id="ranikhet" className="flex gap-6 items-start scroll-mt-32">
                        <div className="hidden md:block pt-1">
                            <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-red-600 mb-2">Ranikhet (Uttarakhand)</h3>
                            <div className="text-gray-600 space-y-1">
                                <p className="font-semibold text-gray-800">The HFE Group of Hotels & Resorts</p>
                                <p>At: Villa No-1 (Vimoksha Valley)</p>
                                <p>Phase # 1, Dekoti (Majhkhali)</p>
                                <p>Ranikhet (Somehwar Range)</p>
                                <p>Dist: Almora, UK - 263652</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
