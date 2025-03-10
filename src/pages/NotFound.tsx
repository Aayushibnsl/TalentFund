
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-edu-blue-light/30 to-white py-28">
        <div className="container-custom">
          <div className="glass-card max-w-2xl mx-auto text-center p-12">
            <div className="w-24 h-24 bg-edu-blue/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl font-bold text-edu-blue">404</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h1>
            <p className="text-lg text-edu-neutral-dark mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <a 
              href="/" 
              className="btn-primary"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
