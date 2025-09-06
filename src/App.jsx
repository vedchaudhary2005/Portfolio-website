import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';

const PortfolioWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTypeText, setCurrentTypeText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);

  const typeTexts = ['Frontend Developer', 'Web DeveLoper', 'UI/Ux Enthusiast', 'Aspiring Full Stack DeveLoper'];
  const canvasRef = useRef(null);

  // Loading Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Typing Animation
  useEffect(() => {
    if (!isLoading) {
      const currentText = typeTexts[typeIndex];
      if (currentTypeText.length < currentText.length) {
        const timer = setTimeout(() => {
          setCurrentTypeText(currentText.slice(0, currentTypeText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentTypeText('');
          setTypeIndex((prev) => (prev + 1) % typeTexts.length);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentTypeText, typeIndex, isLoading, typeTexts]);

  // Particle Animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.3)';
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isDarkMode, isLoading]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const theme = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    navBg: isDarkMode ? 'bg-gray-900/90' : 'bg-white/90',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
    cardBgAlt: isDarkMode ? 'bg-gray-900' : 'bg-white',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-white',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300'
  };

  // Loading Screen
  if (isLoading) {
    return <LoadingScreen isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg} ${theme.text} relative`}>
      {/* Main Content - Blur when menu is open */}
      <div className={`transition-all duration-300 ${isMenuOpen ? 'blur-sm' : ''}`}>
        {/* Particle Canvas Background */}
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        
        {/* Navbar */}
        <Navbar 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          scrollToSection={scrollToSection}
          theme={theme}
        />

        {/* Hero Section */}
        <Hero 
          isDarkMode={isDarkMode}
          currentTypeText={currentTypeText}
          scrollToSection={scrollToSection}
          theme={theme}
        />

        {/* About Section */}
        <About isDarkMode={isDarkMode} theme={theme} />

        {/* Skills Section */}
        <Skills isDarkMode={isDarkMode} theme={theme} />

        {/* Portfolio Section */}
        <Portfolio theme={theme} />

        {/* Contact Section */}
        <Contact isDarkMode={isDarkMode} theme={theme} />

        {/* Footer */}
        <Footer isDarkMode={isDarkMode} />
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
        theme={theme}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default PortfolioWebsite;