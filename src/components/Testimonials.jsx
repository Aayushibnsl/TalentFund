
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "EduFund completely changed my approach to financing my education. I've gained practical skills while earning my degree, and now I'm graduating debt-free.",
    name: "Sarah Johnson",
    role: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    quote: "As an investor, EduFund provides me with both returns and the satisfaction of helping students achieve their educational goals. The transparency of blockchain makes it trustworthy.",
    name: "Michael Zhang",
    role: "Angel Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    quote: "The NFT certificates I've earned through EduFund have become an invaluable part of my portfolio. Employers are impressed by the verified skills I've developed.",
    name: "Amara Rodriguez",
    role: "Data Science Student",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    quote: "EduFund has transformed how I view education investments. The platform's innovative approach aligns student success with investor returns in a way traditional loans never could.",
    name: "David Wilson",
    role: "Education Fund Manager",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current?.classList.add('fade-in-animation');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  return (
    <section ref={sectionRef} className="section-spacing opacity-0" style={{ '--delay': 1 }}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-edu-blue/10 text-edu-blue font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Success Stories
          </h2>
          <p className="text-lg text-edu-neutral-dark">
            Hear from students and investors who have experienced the transformative power of EduFund's blockchain-based education financing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
              <div className="glass-card p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-soft">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-lg md:text-xl italic mb-6">"{testimonials[activeIndex].quote}"</p>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonials[activeIndex].name}</h4>
                      <p className="text-edu-neutral-dark">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-edu-neutral-dark hover:text-edu-blue transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-edu-neutral-dark hover:text-edu-blue transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'bg-edu-blue w-8' 
                    : 'bg-edu-neutral'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
