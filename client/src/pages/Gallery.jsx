import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Gallery() {
    const [photos, setPhotos] = React.useState([]);

    const [selectedImage, setSelectedImage] = React.useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        fetch(`${apiUrl}/gallery`)
            .then(res => res.json())
            .then(data => setPhotos(data))
            .catch(err => console.error(err));
    }, []);

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar variant="dark" />
            <div className="h-24 md:h-32"></div>

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4 font-serif">Our Gallery</h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Glimpses of the serenity, adventure, and luxury that await you at HFE Hotels & Resorts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="group relative overflow-hidden rounded-xl shadow-lg aspect-video cursor-pointer"
                            onClick={() => openLightbox(item)}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title || `Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                            {item.title && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-serif">{item.title}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
                    <button
                        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-[#E86C3F] transition-colors"
                        onClick={closeLightbox}
                    >
                        &times;
                    </button>
                    <div className="max-w-5xl max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
                        <img
                            src={selectedImage.imageUrl}
                            alt={selectedImage.title || "Gallery View"}
                            className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
                        />
                        {selectedImage.title && (
                            <p className="text-white text-center mt-4 text-xl font-serif">{selectedImage.title}</p>
                        )}
                    </div>
                </div>
            )}

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
