
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Sections from '@/components/Sections';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  const location = useLocation();

  // Initialize scroll behavior
  useEffect(() => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Handle URL with hash when coming from another page
    if (location.hash) {
      // Small timeout to ensure the page is fully loaded
      setTimeout(() => {
        const targetElement = document.querySelector(location.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }, 100);
    }

    // Add animations to elements when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-animation');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-animation').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [location]);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Features />
        <HowItWorks />
        <Sections />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Index;
