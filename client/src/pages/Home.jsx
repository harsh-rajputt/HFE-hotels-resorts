import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedRooms from '../components/FeaturedRooms';
import Footer from '../components/Footer';
import About from '../components/About';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <div className="min-h-screen bg-brand-sand">
            <Navbar />
            <Hero />
            <About />
            <FeaturedRooms />
            <Contact />
            <Footer />
        </div>
    );
}
