
import React, { useEffect, useRef } from 'react';

const Sections = () => {
  const studentRef = useRef<HTMLDivElement>(null);
  const investorRef = useRef<HTMLDivElement>(null);

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

    if (studentRef.current) observer.observe(studentRef.current);
    if (investorRef.current) observer.observe(investorRef.current);

    return () => {
      if (studentRef.current) observer.unobserve(studentRef.current);
      if (investorRef.current) observer.unobserve(investorRef.current);
    };
  }, []);

  return (
    <section className="section-spacing bg-gradient-to-b from-white to-edu-blue-light/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Section */}
          <div 
            id="students"
            ref={studentRef} 
            className="glass-card bg-gradient-to-br from-edu-blue-light to-white border-edu-blue/10 p-10 opacity-0"
            style={{ '--delay': 1 } as React.CSSProperties}
          >
            <div className="w-16 h-16 rounded-2xl bg-edu-blue/10 flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10L12 18" stroke="#0057B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14L12 18L16 14" stroke="#0057B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 4L12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16" stroke="#0057B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4">For Students</h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-blue"></div>
                </div>
                <span>Access education funding without traditional loans</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-blue"></div>
                </div>
                <span>Develop practical skills while earning your education</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-blue"></div>
                </div>
                <span>Build a verifiable portfolio of work through NFTs</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-blue"></div>
                </div>
                <span>Graduate without burdensome debt obligations</span>
              </li>
            </ul>
            
            <button className="btn-primary">Apply as a Student</button>
          </div>
          
          {/* Investor Section */}
          <div 
            id="investors"
            ref={investorRef} 
            className="glass-card bg-gradient-to-br from-edu-green-light to-white border-edu-green/10 p-10 opacity-0"
            style={{ '--delay': 2 } as React.CSSProperties}
          >
            <div className="w-16 h-16 rounded-2xl bg-edu-green/10 flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17V7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 10L12 7L9 10" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 12V13.5C20 17.33 16.86 20.5 12.5 20.5C8.14 20.5 5 17.33 5 13.5V12" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4">For Investors</h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-green/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-green"></div>
                </div>
                <span>Support promising students while earning returns</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-green/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-green"></div>
                </div>
                <span>Diversify your portfolio with education investments</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-green/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-green"></div>
                </div>
                <span>Trade EduTokens in our marketplace for liquidity</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-edu-green/10 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-edu-green"></div>
                </div>
                <span>Make socially responsible investments in education</span>
              </li>
            </ul>
            
            <button className="btn-secondary">Become an Investor</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sections;
