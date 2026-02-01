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

            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Section with Orange Polygon Border */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
                        <div className="relative z-10 p-2">
                            {/* This mirrors the orange shape in the reference */}
                            <div className="absolute inset-0 bg-[#E86C3F] transform -rotate-2 rounded-3xl scale-105 z-0"></div>
                            <div className="relative z-10 bg-white p-2 rounded-2xl transform rotate-2 overflow-hidden">
                                <img
                                    src="/hero-bg-final.png"
                                    alt="Shimla Scene"
                                    className="w-full max-w-md h-[500px] object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Himachal Pradesh</h1>

                        <p className="text-gray-600 mb-6 font-sans leading-relaxed text-justify">
                            Himachal Pradesh is a beautiful state of India in the western Himalayas, known for its stunning natural scenery, rich cultural heritage, and diverse wildlife. Himachal has lots of surprises for tourists like: Snow-Capped mountains, Lush green apple orchards, Trekking trails, Scenic Valleys, Lakes, Temples, Monasteries, Adventure sports, Cultural festivals, and many more...
                        </p>

                        <h2 className="text-xl md:text-2xl font-bold text-[#E86C3F] mb-4">
                            Clouds Hill-Top Camp: (Rohalthi (Koti), Chail-Kufri Road (Shimla)
                        </h2>

                        <p className="text-gray-600 font-sans leading-relaxed text-justify text-sm md:text-base">
                            Escape to the enchanting Clouds Hill-Top Camp, nestled midway between Chail and Kufri in the Shimla District. Surrounded by lush apple orchards and majestic mountains, our eco-friendly mud houses and adventure tents offer breathtaking views of the hills and valleys. Every accommodation boasts stunning sunrise, sunset, and valley views, providing a tranquil retreat amidst nature's splendor. Under the expert management of The HFE Group of Hotels & Resorts, enjoy adventurous and comfortable stays with all essential amenities. Get your adrenaline pumping with activities like mountain trekking, paragliding, and snowshoeing in the winter wonderland. Stroll through our apple orchards, savor the taste of fresh apples, and experience the magic of snowfall. Unwind in our dedicated recreation areas and indulge in a range of indoor and outdoor games and activities, making Clouds Hill-Top Camp the perfect destination for a relaxing and adventurous holiday experience.
                        </p>

                        <div className="mt-8 border-t border-dashed border-gray-300 w-1/2"></div>
                    </div>

                </div>
            </div>

            {/* Attractions Section */}
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#E86C3F] mb-6">In-House Attractions</h2>
                        <ul className="space-y-4 mb-10 text-gray-700 font-sans">
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Unique Accommodations:</strong> Mud-House Eco Cottages & Adventure Swiss Tents</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Dining Delights:</strong> Hillyard Bistro (In-house Restaurant)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Natural Wonders:</strong> Scenic Sunrise & Sunset View from all locations at Property, Lush Green Apple, Almond, Plum & Pears Orchard, Clear Himalaya Range View in all Seasons</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Fun & Games:</strong> Kids Play & Activity Area along with Indoor and Outdoor Games</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Adventure Zone:</strong> Bonfire, Jungle-Picnic, Trekking, Birding, Camping, etc.</span>
                            </li>
                        </ul>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#E86C3F] mb-6">Nearby Attractions</h2>
                        <ul className="space-y-4 text-gray-700 font-sans">
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Cultural Experiences:</strong> Stone Kumbh Temple (Janedghat), Chail Palace (Chail), Mahabir Temple (Mundaghat)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Adventure Hotspots:</strong> Highest Cricket Ground in the World (Chail), Himalayan Nature Park (Kufri), Mahasu Peak (Kufri), Kwalia Track (Rohalthi)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#E86C3F] font-bold mt-1">●</span>
                                <span><strong>Nature Escapes:</strong> Nearby Forest & Mountain Trekking Area, Nature-Walk and and many more...</span>
                            </li>
                        </ul>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative">
                        <img
                            src="/hero-bg-final.png"
                            alt="Shimla Scene"
                            className="w-full max-w-md h-[400px] object-cover rounded-xl shadow-lg border-4 border-white"
                        />
                    </div>

                </div>
            </div>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
