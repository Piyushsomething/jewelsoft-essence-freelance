import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const workshopImages = [
    "/images/story/1.jpeg",
    "/images/story/2.jpeg",
    "/images/story/3.jpeg",
    "/images/story/4.jpeg",
    "/images/story/5.jpeg",
    "/images/story/6.jpeg",
    "/images/story/7.jpeg",
  ];

  const imageDescriptions = [
    "Traditional Workshop Setup",
    "Handcrafting Process",
    "Master Artisans at Work",
    "Quality Control",
    "Precision Stone Setting",
    "Women Artisans",
    "Design Process",
    "Traditional Techniques"
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % workshopImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [workshopImages.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + workshopImages.length) % workshopImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % workshopImages.length);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[712px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/23534159/pexels-photo-23534159/free-photo-of-olivetti-lettera-35-typewriter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Jewelry Workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container-custom relative z-10 text-lightText">
          <h1 className="font-playfair text-4xl md:text-7xl font-bold mb-4 leading-tight">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            At Parshav Exports, we blend traditional craftsmanship with contemporary design to create timeless silver jewelry that tells a story.
          </p>
        </div>


      </section>

      {/* Our Journey with Workshop Carousel */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl font-bold mb-6">Our Journey</h2>
              <p className="mb-4">
                Parshav Exports was founded with a simple mission: to create exquisite silver jewelry that honors traditional craftsmanship while embracing modern aesthetics. What began as a small workshop in Jaipur has grown into a beloved brand known for its attention to detail and commitment to quality.
              </p>
              <p className="mb-4">
                Our founder, Sanjay Jain, discovered his passion for silversmithing during his travels across rural India, where he was captivated by the intricate techniques passed down through generations. Inspired by this rich heritage, he assembled a team of skilled artisans dedicated to preserving these traditions while infusing them with contemporary style.
              </p>
              <p>
                Today, Parshav Exports continues to honor its roots while evolving with the times. Each piece in our collection represents our journey and our commitment to creating jewelry that becomes part of your personal story.
              </p>
            </div>

            {/* Workshop Carousel */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-md shadow-lg">
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src={workshopImages[currentImageIndex]}
                    alt={imageDescriptions[currentImageIndex]}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Counter/Description */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-md">
                    <p className="text-sm font-medium">{imageDescriptions[currentImageIndex]}</p>
                    <p className="text-xs opacity-80">
                      {currentImageIndex + 1} of {workshopImages.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnail Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {workshopImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex
                      ? "bg-gold"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-gold rounded-full hidden md:block opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Founder's Message ═══ */}
      <section className="py-00 md:py-28 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Watermark logo */}
        <img
          src="/images/Parshav_exports.png"
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] object-contain opacity-[0.05] dark:opacity-[0.05] dark:invert pointer-events-none"
        />

        <div className="container-custom relative z-10">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-block text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">
              A Word From Our Founder
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Founder's Message
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rotate-45 border border-gold/60" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Founder image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                {/* Decorative frame corners */}
                <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-gold/60" />
                <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-gold/60" />
                <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-gold/60" />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-gold/60" />

                {/* Gold accent dot */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gold rounded-full opacity-60 z-10" />

                {/* Image container */}
                <div className="w-64 h-80 md:w-72 md:h-96 rounded-md overflow-hidden shadow-2xl border border-border">
                  <img
                    src="/images/founder/Founder.avif"
                    alt="Sanjay Jain - Founder"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name plate below image */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border shadow-lg px-6 py-2.5 rounded-md text-center whitespace-nowrap z-10">
                  <p className="font-playfair text-lg font-bold text-gold">Sanjay Jain</p>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Message content */}
            <div className="lg:col-span-8 pt-6 lg:pt-0">
              {/* Large decorative quote mark */}
              <div className="mb-4">
                <svg className="w-14 h-14 text-gold/20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.68 11.003 13.174 11.003 15c0 1.933-1.567 3.5-3.5 3.5-1.202 0-2.322-.603-2.92-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.986.169 3.398 1.663 3.398 3.489 0 1.933-1.567 3.5-3.5 3.5-1.202 0-2.322-.603-2.92-1.179z" />
                </svg>
              </div>

              {/* Message paragraphs */}
              <div className="space-y-5">
                <p className="text-lg md:text-xl leading-relaxed font-playfair italic text-foreground/90">
                  Parshav Export was founded with a simple vision: to deliver quality products with integrity, reliability, and global standards. We believe that strong partnerships are built on trust, consistency, and transparent communication.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-foreground/75">
                  Every shipment we deliver reflects our commitment to excellence and long-term relationships. Our focus is not just on exporting products, but on building dependable connections across borders.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-foreground/75">
                  Thank you for trusting Parshav Export. We look forward to growing together.
                </p>
              </div>

              {/* Signature area */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-transparent" />
                  <div>
                    <p className="font-playfair text-xl font-bold text-gold">Sanjay Jain</p>
                    <p className="text-sm text-muted-foreground tracking-wider uppercase">Founder & CEO, Parshav Exports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-4">Our Values</h2>
            <p>
              At the heart of Parshav Exports are the principles that guide everything we do, from design to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-md p-6 text-center relative overflow-hidden">
              <img src="/images/Parshav_exports.png" alt="" className="absolute inset-0 m-auto w-44 h-44 object-contain opacity-[0.08] pointer-events-none dark:invert" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Quality Craftsmanship</h3>
                <p>
                  We believe in creating jewelry that stands the test of time. Each piece is meticulously crafted by skilled artisans using traditional techniques and the finest materials.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-md p-6 text-center relative overflow-hidden">
              <img src="/images/Parshav_exports.png" alt="" className="absolute inset-0 m-auto w-44 h-44 object-contain opacity-[0.08] pointer-events-none dark:invert" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16.2 7.8a2 2 0 1 1-2.8 2.8" />
                    <path d="M8 12h8" />
                    <path d="M10.5 9.5 8 12l2.5 2.5" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Ethical Sourcing</h3>
                <p>
                  We are committed to responsible business practices. Our materials are ethically sourced, and we work closely with suppliers who share our values of integrity and sustainability.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-md p-6 text-center relative overflow-hidden">
              <img src="/images/Parshav_exports.png" alt="" className="absolute inset-0 m-auto w-44 h-44 object-contain opacity-[0.08] pointer-events-none dark:invert" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold"
                  >
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Customer Delight</h3>
                <p>
                  We strive to create not just beautiful jewelry, but exceptional experiences. From personalized service to thoughtful packaging, we aim to exceed your expectations at every touchpoint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold text-darkText">
        <div className="container-custom text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Experience the Parshav Exports Difference
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Discover our collection of handcrafted silver jewelry, where tradition meets contemporary design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-dark text-white hover:bg-dark/90"
            >
              <Link to="/products">Explore Collection</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-dark text-dark hover:bg-dark/10"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;