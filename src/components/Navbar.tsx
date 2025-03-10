
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation to sections
  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're already on the home page
    if (location.pathname === '/') {
      const element = document.querySelector(sectionId);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page with section hash
      navigate(`/${sectionId}`);
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md py-4',
        isScrolled 
          ? 'bg-white/80 shadow-soft' 
          : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a 
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          href="/"
          className="flex items-center cursor-pointer"
        >
          <span className="text-2xl font-display font-bold bg-gradient-to-r from-edu-blue to-edu-green bg-clip-text text-transparent">
            EduFund
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            href="/"
            className="text-edu-neutral-dark font-medium hover:text-edu-blue transition-colors"
          >
            Home
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#about');
            }} 
            href="#about" 
            className="text-edu-neutral-dark font-medium hover:text-edu-blue transition-colors"
          >
            About
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#how-it-works');
            }} 
            href="#how-it-works" 
            className="text-edu-neutral-dark font-medium hover:text-edu-blue transition-colors"
          >
            How It Works
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#investors');
            }} 
            href="#investors" 
            className="text-edu-neutral-dark font-medium hover:text-edu-blue transition-colors"
          >
            Investors
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#students');
            }} 
            href="#students" 
            className="text-edu-neutral-dark font-medium hover:text-edu-blue transition-colors"
          >
            Students
          </a>
        </nav>

        {/* Login/Register Button - Desktop */}
        <div className="hidden md:block">
          <button className="btn-primary">Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-edu-neutral-dark" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed inset-0 bg-white z-40 pt-20 px-6 pb-6 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-6 items-center text-center">
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setIsMobileMenuOpen(false);
            }} 
            href="/"
            className="text-lg font-medium text-edu-neutral-dark hover:text-edu-blue transition-colors"
          >
            Home
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#about');
            }} 
            href="#about" 
            className="text-lg font-medium text-edu-neutral-dark hover:text-edu-blue transition-colors"
          >
            About
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#how-it-works');
            }} 
            href="#how-it-works" 
            className="text-lg font-medium text-edu-neutral-dark hover:text-edu-blue transition-colors"
          >
            How It Works
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#investors');
            }} 
            href="#investors" 
            className="text-lg font-medium text-edu-neutral-dark hover:text-edu-blue transition-colors"
          >
            Investors
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#students');
            }} 
            href="#students" 
            className="text-lg font-medium text-edu-neutral-dark hover:text-edu-blue transition-colors"
          >
            Students
          </a>
          <button 
            className="btn-primary w-full mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
