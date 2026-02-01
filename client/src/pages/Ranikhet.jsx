import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Ranikhet() {

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
                    alt="Ranikhet Forest"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center font-serif drop-shadow-lg px-4">
                        Ranikhet (Nature's Majesty & Military's Pride)
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src="/hero-bg-final.png" // Placeholder
                            alt="Bella Vista Chalet"
                            className="w-full max-w-md h-[450px] object-cover rounded-3xl shadow-2xl"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#E86C3F] mb-6">Ranikhet (Uttarakhand)</h2>

                        <p className="text-gray-600 mb-6 font-sans leading-relaxed text-justify">
                            Discover the serene charm of Ranikhet, a picturesque hill station and cantonment town in Uttarakhand's Almora district. Surrounded by majestic Himalayan peaks, Ranikhet offers breathtaking panoramic views, tranquil environment, and a rich cultural heritage. Explore ancient temples like Jhula Devi Temple and Katarmal Sun Temple, or stroll through the beautiful Chaubatia Gardens. As the home of the Kumaon Regiment, Ranikhet exudes a sense of pride and tradition. Experience the perfect blend of natural beauty, history, and adventure in this hidden gem of the Himalayas.
                        </p>

                        <p className="text-gray-600 font-sans leading-relaxed text-justify mb-4">
                            Escape to the lap of luxury at <strong>Bella Vista Chalet</strong>, nestled in the heart of Ranikhet's breathtaking Kumaon region. This stunning 3BHK independent villa offers unparalleled Himalayan views from every room, inviting you to unwind in serenity. With its majestic surroundings and luxurious amenities, <strong>Bella Vista Chalet</strong> is the perfect retreat for those seeking a tranquil and rejuvenating getaway. Experience the magic of the Himalayas in style and comfort.
                        </p>

                        <button className="bg-[#E86C3F] text-white px-8 py-3 rounded font-medium hover:bg-opacity-90 transition-colors w-full md:w-auto shadow-md">
                            Bella Vista Chalet (Majhkhali, Ranikhet)
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
