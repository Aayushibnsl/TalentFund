
import React, { useEffect, useRef } from 'react';

type StepProps = {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  delay: number;
};

const Step = ({ number, title, description, isLast = false, delay }: StepProps) => {
  return (
    <div 
      style={{ '--delay': delay } as React.CSSProperties}
      className="flex opacity-0 slide-up-animation"
    >
      <div className="flex flex-col items-center mr-8">
        <div className="w-14 h-14 rounded-full bg-edu-blue flex items-center justify-center text-white font-bold text-xl mb-4">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-edu-blue/20"></div>
        )}
      </div>
      <div className="pt-3 pb-12">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-edu-neutral-dark max-w-lg">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const steps = sectionRef.current?.querySelectorAll('.slide-up-animation');
          steps?.forEach((step) => {
            step.classList.add('slide-up-animation');
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
    <section id="how-it-works" ref={sectionRef} className="section-spacing">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-edu-yellow/20 text-edu-yellow-default font-medium text-sm mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How EduFund Works
          </h2>
          <p className="text-lg text-edu-neutral-dark">
            Our platform connects students with investors through a streamlined, blockchain-powered process that benefits everyone involved.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Step 
            number={1} 
            title="Apply for Funding" 
            description="Create a profile, specify your educational goals, and apply for blockchain-based funding. Our algorithm matches you with suitable investors." 
            delay={1}
          />
          <Step 
            number={2} 
            title="Investors Fund via Smart Contract" 
            description="Investors review profiles and fund students through secure smart contracts that outline terms and expectations clearly." 
            delay={2}
          />
          <Step 
            number={3} 
            title="Complete Skill-Based Tasks" 
            description="Work on real-world tasks assigned by the platform or investors. These tasks enhance your skills while earning your education fund." 
            delay={3}
          />
          <Step 
            number={4} 
            title="Earn NFTs as Proof of Work" 
            description="For each completed task, receive an NFT certificate that verifies your skills and becomes part of your permanent portfolio." 
            delay={4}
          />
          <Step 
            number={5} 
            title="Repay Without Debt" 
            description="Instead of interest-based repayments, your work contributes to a sustainable ecosystem where investors earn returns through skill-based contributions." 
            isLast={true}
            delay={5}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
