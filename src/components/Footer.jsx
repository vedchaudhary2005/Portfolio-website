import React from 'react';
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import { ImWhatsapp } from "react-icons/im";

const Footer = ({ isDarkMode }) => {
  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/CodexVelocity_', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ved-chaudhary-179343352/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/vedchaudhary2005', label: 'GitHub' },
    { icon: ImWhatsapp, href: 'https://wa.me/8429366583', label: 'WhatsApp' }
  ];

  return (
    <footer className={`py-12 ${isDarkMode ? 'bg-black' : 'bg-gray-900'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                  aria-label={social.label}
                >
                  <IconComponent className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2025 Portfolio. All rights reserved. Built with React & Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;