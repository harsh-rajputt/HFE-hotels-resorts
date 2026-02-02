import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Shimla() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Spacer for fixed navbar */}
            <div className="h-24 md:h-32"></div>

            {/* Hero Header Image Section */}
            <div className="relative w-full h-[400px] md:h-[500px] mb-12">
                <img
                    src="/hero-bg-final.png" // Using existing image
                    alt="Shimla Scene"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center font-serif drop-shadow-lg px-4">
                        Shimla (The Queen of Hills)
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src="/hero-bg-final.png" // Using existing image
                            alt="Clouds Hill-Top Camp"
                            className="w-full max-w-md h-[500px] object-cover rounded-3xl shadow-2xl sticky top-32"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#E86C3F] mb-6">Himachal Pradesh</h2>

                        <p className="text-gray-600 mb-6 font-sans leading-relaxed text-justify">
                            Himachal Pradesh is a beautiful state of India in the western Himalayas, known for its stunning natural scenery, rich cultural heritage, and diverse wildlife. Himachal has lots of surprises for tourists like: Snow-Capped mountains, Lush green apple orchards, Trekking trails, Scenic Valleys, Lakes, Temples, Monasteries, Adventure sports, Cultural festivals, and many more...
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Clouds Hill-Top Camp</h3>
                        <p className="text-[#E86C3F] font-bold font-sans leading-relaxed text-justify mb-8">
                            Escape to the enchanting Clouds Hill-Top Camp, nestled midway between Chail and Kufri in the Shimla District. Surrounded by lush apple orchards and majestic mountains, our eco-friendly mud houses and adventure tents offer breathtaking views of the hills and valleys. Every accommodation boasts stunning sunrise, sunset, and valley views, providing a tranquil retreat amidst nature's splendor. Under the expert management of The HFE Group of Hotels & Resorts, enjoy adventurous and comfortable stays with all essential amenities.
                        </p>

                        <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">In-House Attractions</h4>
                        <ul className="space-y-3 mb-8 text-gray-700 font-sans text-sm md:text-base">
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Unique Accommodations:</strong> Mud-House Eco Cottages & Adventure Swiss Tents</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Dining Delights:</strong> Hillyard Bistro (In-house Restaurant)</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Natural Wonders:</strong> Scenic Sunrise & Sunset View, Apple Orchards, Himalaya Range View</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Fun & Games:</strong> Kids Play Area, Indoor & Outdoor Games</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Adventure Zone:</strong> Bonfire, Jungle-Picnic, Trekking, Birding, Camping</div>
                            </li>
                        </ul>

                        <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Nearby Attractions</h4>
                        <ul className="space-y-3 mb-8 text-gray-700 font-sans text-sm md:text-base">
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Cultural Experiences:</strong> Stone Kumbh Temple, Chail Palace, Mahabir Temple</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Adventure Hotspots:</strong> Highest Cricket Ground (Chail), Himalayan Nature Park (Kufri)</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold">●</span>
                                <div><strong>Nature Escapes:</strong> Forest & Mountain Trekking Areas</div>
                            </li>
                        </ul>

                        <button className="bg-[#E86C3F] text-white px-8 py-3 rounded font-medium hover:bg-opacity-90 transition-colors w-full md:w-auto shadow-md">
                            Clouds Hill-Top Camp (Shimla)
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
