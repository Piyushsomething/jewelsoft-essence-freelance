import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download, Eye, X, BookOpen } from "lucide-react";

const HERO_VIDEO_SRC = "/videos/hero-banner.mp4";
const HERO_IMAGE_SRC = "/images/landing_page.png";
const CATALOGUE_PATH = "/Catalogue 2026.pdf";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    const handleError = () => setVideoError(true);

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <>
      <section className="relative h-[60vh] min-h-[500px] md:h-[80vh] md:min-h-[712px] flex items-center overflow-hidden">
        {/* Background Video / Image with parallax effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Fallback / poster image */}
          <img
            src={HERO_IMAGE_SRC}
            alt="Luxury Jewelry"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded && !videoError ? "opacity-0" : "opacity-100"
              }`}
          />

          {/* Background video */}
          {!videoError && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HERO_IMAGE_SRC}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"
                }`}
              style={{ objectPosition: "center 30%" }}
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Content */}
        <div className="container-custom relative z-10 text-lightText">
          <div className="max-w-2xl">
            <motion.h1
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Elegance in <span className="text-gold">Silver & Stone</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl opacity-90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Discover our exquisite collection of handcrafted silver jewelry, where tradition meets contemporary design.
            </motion.p>

            {/* Primary CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gold text-darkText hover:bg-gold/90 shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/products">Shop Now</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gold text-gold hover:bg-gold/10"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </motion.div>

            {/* Catalogue buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="flex items-center gap-1.5 text-gold/80 text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                Catalogue 2026
              </span>
              <button
                onClick={() => setShowViewer(true)}
                className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <Eye className="w-4 h-4" />
                View Online
              </button>
              <a
                href={CATALOGUE_PATH}
                download="Parshav_Exports_Catalogue_2026.pdf"
                className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fullscreen PDF Viewer Modal */}
      {showViewer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-900 text-white">
              <h3 className="font-medium text-sm sm:text-base">
                Parshav Exports — Catalogue 2026
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={CATALOGUE_PATH}
                  download="Parshav_Exports_Catalogue_2026.pdf"
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={() => setShowViewer(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* PDF Embed */}
            <iframe
              src={CATALOGUE_PATH}
              className="w-full h-[calc(100%-52px)]"
              title="Parshav Exports Catalogue 2026"
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Hero;


