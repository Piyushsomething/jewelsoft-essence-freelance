import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/23534159/pexels-photo-23534159/free-photo-of-olivetti-lettera-35-typewriter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Jewelry Workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container-custom relative z-10 text-lightText">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Our Story
          </h1>
          <p className="text-lg max-w-2xl">
            At Parshav Exports, we blend traditional craftsmanship with contemporary design to create timeless silver jewelry that tells a story.
          </p>
        </div>
      </section>
      
      {/* Our Journey */}
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
            
            <div className="relative">
              <img
                src="https://source.unsplash.com/random/600x800/?silver,artisan"
                alt="Silversmith at work"
                className="rounded-md shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-gold rounded-full hidden md:block" />
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
            <div className="bg-card border border-border rounded-md p-6 text-center">
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
            
            <div className="bg-card border border-border rounded-md p-6 text-center">
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
            
            <div className="bg-card border border-border rounded-md p-6 text-center">
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
      </section>
      
      {/* Meet Our Team - Modified to show only the creator */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          {/* <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-4">About the Creator</h2>
            <p>
              Meet the developer behind the Parshav Exports website.
            </p>
          </div> */}
          
          <div className="flex justify-center">
            {/* Only Piyush as Creator */}
            {/* <div className="text-center max-w-md">
              <div className="aspect-square rounded-full overflow-hidden mb-4 relative group w-48 h-48 mx-auto">
                <img
                  src="https://source.unsplash.com/random/200x200/?portrait,man&sig=11"
                  alt="Piyush"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-1">Piyush</h3>
              <p className="text-muted-foreground mb-3">Creator & Developer</p>
              <p className="text-sm mb-4">
                Full Stack Developer @LYZR.AI | Ex WESEE (Indian Naval HQ) | Ex HashedIn by Deloitte | AI Application developer
              </p>
              <div className="flex flex-col gap-2 items-center">
                <a href="tel:+918570936103" className="text-gold hover:underline">+91 8570936103</a>
                <a href="mailto:piyush4for@gmail.com" className="text-gold hover:underline">piyush4for@gmail.com</a>
                <a href="https://linkedin.com/in/piyush4for" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">linkedin.com/in/piyush4for</a>
                <a href="https://github.com/piyush4for" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">github.com/piyush4for</a>
              </div>
            </div> */}
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
