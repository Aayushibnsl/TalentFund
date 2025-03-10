
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-edu-blue-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* EduFund Info */}
          <div>
            <div className="mb-6">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-white to-edu-blue-light bg-clip-text text-transparent">
                EduFund
              </span>
            </div>
            <p className="text-edu-blue-light/80 mb-6">
              Revolutionizing education financing through blockchain technology. 
              Creating a debt-free path to education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.162 5.656a8.383 8.383 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.211 4.211 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.395 8.395 0 0 1-6.19 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.495 8.495 0 0 0 2.087-2.165l-.001-.001z"/>
                </svg>
              </a>
              <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* For Users */}
          <div>
            <h4 className="text-lg font-semibold mb-6">For Users</h4>
            <ul className="space-y-3">
              <li>
                <a href="#students" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  Student Dashboard
                </a>
              </li>
              <li>
                <a href="#investors" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  Investor Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  Task Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  NFT Certificates
                </a>
              </li>
              <li>
                <a href="#" className="text-edu-blue-light/80 hover:text-white transition-colors">
                  Token Exchange
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 text-edu-blue-light/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-edu-blue-light/80">support@edufund.io</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 text-edu-blue-light/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-edu-blue-light/80">123 Innovation Way<br />San Francisco, CA 94107</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 text-edu-blue-light/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-edu-blue-light/80">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-edu-blue-light/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-edu-blue-light/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} EduFund. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-edu-blue-light/60 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-edu-blue-light/60 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-edu-blue-light/60 text-sm hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
