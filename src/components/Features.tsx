
import React, { useEffect, useRef } from 'react';
import { BookOpen, Shield, Award, Coins } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={cardRef}
      style={{ '--delay': delay } as React.CSSProperties}
      className="card group hover:-translate-y-2 opacity-0 slide-up-animation"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-edu-blue-light to-edu-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <div className="text-edu-blue">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-edu-neutral-dark">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll('.card');
          cards?.forEach((card) => {
            card.classList.add('slide-up-animation');
          });
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

  return (
    <section id="about" ref={sectionRef} className="section-spacing bg-edu-neutral-light">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-edu-green/10 text-edu-green font-medium text-sm mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Revolutionizing Education Financing
          </h2>
          <p className="text-lg text-edu-neutral-dark">
            EduFund leverages blockchain technology to create a transparent, efficient, and mutually beneficial ecosystem for students and investors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<BookOpen size={28} />}
            title="Skill-Based Funding"
            description="Work for your education funds instead of taking loans. Complete real-world tasks that enhance your skills."
            delay={1}
          />
          <FeatureCard 
            icon={<Shield size={28} />}
            title="Smart Contracts Security"
            description="Every transaction and agreement is secured and transparent through blockchain smart contracts."
            delay={2}
          />
          <FeatureCard 
            icon={<Award size={28} />}
            title="NFT Reputation System"
            description="Earn NFT certificates as proof of work and build a verifiable portfolio of completed tasks."
            delay={3}
          />
          <FeatureCard 
            icon={<Coins size={28} />}
            title="Investor Flexibility"
            description="Trade EduTokens anytime in our marketplace, providing liquidity and flexibility for your investment."
            delay={4}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
