
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://source.unsplash.com/random/100x100/?portrait,woman&sig=1",
    role: "Fashion Designer",
    quote: "The craftsmanship of JewelSoft's pieces is exceptional. Each item I've purchased has become a treasured part of my collection, garnering compliments wherever I go.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    avatar: "https://source.unsplash.com/random/100x100/?portrait,man&sig=2",
    role: "Entrepreneur",
    quote: "I was looking for a special gift for my wife's anniversary. The team at JewelSoft helped me select the perfect necklace. The packaging was elegant, and the piece itself exceeded my expectations.",
  },
  {
    id: 3,
    name: "Anjali Gupta",
    avatar: "https://source.unsplash.com/random/100x100/?portrait,woman&sig=3",
    role: "Photographer",
    quote: "As someone who works with visual aesthetics daily, I appreciate JewelSoft's attention to detail and design. Their jewelry has a timeless quality that stands out.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our valued customers have to say about their experience with JewelSoft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="relative">
                <span className="text-4xl text-gold absolute -top-4 -left-2 opacity-20">"</span>
                <p className="italic text-muted-foreground relative z-10">
                  {testimonial.quote}
                </p>
                <span className="text-4xl text-gold absolute -bottom-10 -right-2 opacity-20">"</span>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
