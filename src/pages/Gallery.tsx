import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

// Import images from assets/gallery
import img1 from "@/assets/gallery/L7P00207.jpg";
import img2 from "@/assets/gallery/L7P00208.jpg";
import img3 from "@/assets/gallery/L7P00209.jpg";
import img4 from "@/assets/gallery/L7P00210.jpg";
import img5 from "@/assets/gallery/L7P00211.jpg";
import img6 from "@/assets/gallery/L7P00212.jpg";
import img7 from "@/assets/gallery/L7P00213.jpg";
import img8 from "@/assets/gallery/L7P00214.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    id: 1,
    src: img1,
    title: "Bespoke Tailoring",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: img2,
    title: "Luxury Silk",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    src: img3,
    title: "Royal Heritage",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    src: img4,
    title: "Artisan Finish",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    src: img5,
    title: "Premium Wool",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    src: img6,
    title: "Elegant Cuffs",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    src: img7,
    title: "Master Craft",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 8,
    src: img8,
    title: "Groom Selection",
    className: "md:col-span-2 md:row-span-1",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">
      <AnnouncementBar />
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <span className="px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-[0.4em] text-white/60 backdrop-blur-sm">
              The Heritage Collection
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-medium mb-6 tracking-tighter"
          >
            Curated <span className="italic font-light">Elegance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A visual journey through our finest fabric creations and bespoke
            masterpieces. Each piece tells a story of tradition, luxury, and
            unparalleled skill.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.8 }}
              className={`relative overflow-hidden group rounded-[2.5rem] bg-[#111] border border-white/5 ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
                  Exquisite Detail
                </p>
                <h3 className="text-3xl font-display font-medium tracking-tight">
                  {image.title}
                </h3>
                <div className="w-10 h-0.5 bg-accent mt-4 group-hover:w-full transition-all duration-700 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Button for Contact */}
        <div className="mt-20 text-center">
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full px-12 h-16 bg-white text-black hover:bg-white/90 text-lg font-bold shadow-2xl transition-transform hover:scale-105 active:scale-95"
            >
              Book a Consultation
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
