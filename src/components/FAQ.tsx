
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-edu-neutral">
      <button
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-edu-blue transition-transform duration-300",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <div 
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96" : "max-h-0"
        )}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
      >
        <div className="pb-5 text-edu-neutral-dark">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const faqItems = [
    {
      question: "How does EduFund's funding model work?",
      answer: "EduFund connects students with investors through blockchain-based smart contracts. Instead of traditional loans with interest, students complete skill-based tasks to earn their education funding and develop practical skills simultaneously. This creates a win-win situation where students graduate debt-free with a portfolio of work, and investors receive returns through the value created by student contributions."
    },
    {
      question: "What types of tasks do students complete?",
      answer: "Tasks vary based on the student's field of study and skills. They may include software development, content creation, data analysis, research assistance, design work, or other industry-relevant projects. All tasks are designed to enhance the student's skills while providing value to the ecosystem."
    },
    {
      question: "How are NFTs used in the EduFund platform?",
      answer: "When students complete tasks, they receive NFT certificates that verify their work and skills. These NFTs serve as a permanent, verifiable portfolio that students can showcase to potential employers. The NFTs also contribute to the student's reputation score within the platform."
    },
    {
      question: "How do investors make returns?",
      answer: "Investors receive EduTokens when they fund students. These tokens can appreciate in value based on the platform's growth and the success of funded students. Investors can trade these tokens in our marketplace or hold them for long-term growth. Additionally, investors may receive a portion of the value created from student work."
    },
    {
      question: "Is EduFund available internationally?",
      answer: "Yes, EduFund is designed to be a global platform that can connect students and investors worldwide. Since blockchain technology is borderless, we can facilitate education funding regardless of geographic location, helping to democratize access to education globally."
    }
  ];

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

  return (
    <section ref={sectionRef} className="section-spacing bg-edu-neutral-light opacity-0" style={{ '--delay': 1 } as React.CSSProperties}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-edu-yellow/20 text-edu-yellow-default font-medium text-sm mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-edu-neutral-dark">
            Find answers to common questions about EduFund's innovative education financing platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-soft p-6 md:p-8">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
