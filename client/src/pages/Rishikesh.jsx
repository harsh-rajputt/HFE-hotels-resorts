import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Rishikesh() {

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
                    src="/hero-bg-final.png" // Using placeholder/existing hero until user provides specific banner
                    alt="Rishikesh Forest"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center font-serif drop-shadow-lg">
                        Rishikesh (The Yoga Capital of India)
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src="/hero-bg-final.png" // Placeholder
                            alt="Rajaji Forest Castle"
                            className="w-full max-w-md h-[450px] object-cover rounded-3xl shadow-2xl"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#E86C3F] mb-6">Uttarakhand</h2>

                        <p className="text-gray-600 mb-6 font-sans leading-relaxed text-justify">
                            Uttarakhand, is a beautiful state in northern India, nestled in the Himalayas. It's a treasure trove of natural wonders, spiritual significance, and adventure opportunities like: Breathtaking mountains, valleys, lakes, Sacred Hindu pilgrimage sites like Char Dham (Yamunotri, Gangotri, Kedarnath, and Badrinath), Scenic hill stations, Adventure sports, Rich cultural heritage, Abundant wildlife and many more.
                        </p>

                        <p className="text-[#E86C3F] font-bold font-sans leading-relaxed text-justify mb-4">
                            Experience the ultimate blend of luxury and wildlife at Rajaji Forest Castle, expertly managed by The HFE Group of Hotels & Resorts. Nestled in the Cheela range of Rajaji National Park, our resort offers a tranquil retreat amidst nature's splendor. Enjoy a memorable vacation in our 8 Standard Rooms, 7 Deluxe Rooms, and 1 Family Suite, carefully designed to blend seamlessly into the natural surroundings. Each cottage boasts spacious rooms, baths, and private gardens, perfect for relaxation. Unwind by our serene swimming pool, surrounded by lush greenery, or embark on guided safaris, cycling, and walking tours to discover the unique flora and fauna of Rajaji National Park in style and comfort.
                        </p>

                        <button className="bg-[#E86C3F] text-white px-8 py-3 rounded font-medium hover:bg-opacity-90 transition-colors w-full md:w-auto shadow-md">
                            Rajaji Forest Castle (RFC Resort)
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
