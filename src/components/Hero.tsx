
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-animation');
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-16 md:py-28 bg-gradient-to-b from-edu-blue-light/30 to-white relative overflow-hidden">
      {/* Decorative elements - top right */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-edu-green/10 rounded-full filter blur-3xl"></div>
      
      {/* Decorative elements - bottom left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-edu-blue/10 rounded-full filter blur-3xl"></div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col space-y-8">
            <div 
              ref={(el) => (elementsRef.current[0] = el)} 
              style={{ '--delay': 1 } as React.CSSProperties} 
              className="opacity-0"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-edu-blue/10 text-edu-blue font-medium text-sm mb-6">
                Education Meets Blockchain
              </span>
            </div>
            
            <h1 
              ref={(el) => (elementsRef.current[1] = el)}
              style={{ '--delay': 2 } as React.CSSProperties}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight opacity-0"
            >
              Transforming Education Funding with&nbsp; 
              <span className="bg-gradient-to-r from-edu-blue to-edu-green bg-clip-text text-transparent">
                Blockchain Transparency!
              </span>
            </h1>
            
            <p 
              ref={(el) => (elementsRef.current[2] = el)}
              style={{ '--delay': 3 } as React.CSSProperties}
              className="text-lg md:text-xl text-edu-neutral-dark opacity-0"
            >
              No Loans. No Debt. Just Skill-Based Work for Education. 
              EduFund creates a transparent ecosystem where students work for their education 
              and investors support future talent.
            </p>
            
            <div 
              ref={(el) => (elementsRef.current[3] = el)}
              style={{ '--delay': 4 } as React.CSSProperties}
              className="flex flex-col sm:flex-row gap-4 opacity-0"
            >
              <button className="btn-primary">
                Get Started
              </button>
              <button className="btn-outline">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Right column - Illustration */}
          <div 
            ref={(el) => (elementsRef.current[4] = el)}
            style={{ '--delay': 5 } as React.CSSProperties}
            className="opacity-0"
          >
            <div className="relative">
              {/* Main illustration */}
              <div className="glass-card p-0 overflow-hidden">
                <div className="relative bg-edu-blue-light/40 p-8 rounded-2xl aspect-[4/3] flex items-center justify-center">
                  <div className="absolute w-20 h-20 left-8 top-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft flex items-center justify-center">
                    <div className="w-12 h-12 bg-edu-blue rounded-full flex items-center justify-center text-white font-bold">
                      ED
                    </div>
                  </div>
                  
                  <div className="absolute w-36 h-20 right-8 top-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft flex items-center justify-center px-4">
                    <div className="w-full bg-edu-green/20 h-3 rounded-full overflow-hidden">
                      <div className="bg-edu-green h-full w-2/3 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="w-48 h-48 bg-white/80 backdrop-blur-sm rounded-full shadow-soft flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-edu-blue to-edu-green rounded-full flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L3 9L12 14L21 9L12 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 14L12 19L21 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute w-36 h-20 left-12 bottom-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft flex flex-col items-center justify-center px-4 gap-2">
                    <div className="w-full h-3 bg-edu-yellow/30 rounded-full overflow-hidden">
                      <div className="bg-edu-yellow h-full w-1/2 rounded-full"></div>
                    </div>
                    <div className="w-full h-3 bg-edu-blue/20 rounded-full overflow-hidden">
                      <div className="bg-edu-blue h-full w-3/4 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
