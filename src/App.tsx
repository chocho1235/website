import React, { useState, useEffect, useCallback } from 'react';
import {
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingPage from './pages/PricingPage';

// Constant for primary font
const FONT_PRIMARY = 'Cormorant Garamond';

/* 
 * TypewriterEffect Component
 * Displays a typewriter animation cycling through a set of phrases.
 */
function TypewriterEffect() {
  const phrases = [
    'A friendly community',
    'Constant updates',
    '24/7 dedicated support'
  ];
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        setSpeed(150);

        // Pause when full phrase is displayed, then start deleting
        if (text === currentPhrase) {
          setSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        setSpeed(100);

        // Move to next phrase after deleting the current one completely
        if (text === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, speed]);

  return (
    <div className="text-center mt-20 reveal">
      <p
        className="text-2xl text-white font-light"
        style={{ fontFamily: FONT_PRIMARY }}
      >
        Plus many more benefits such as...{' '}
        <span className="text-blue-400 inline-block min-w-[20ch] text-left">
          {text}
          <span className="animate-pulse">|</span>
        </span>
      </p>
    </div>
  );
}

/* 
 * Header Component
 * Displays the fixed header with logo and social/contact links.
 * The background opacity changes on scroll.
 */
function Header({ opacity }) {
  return (
    <header
      className="fixed w-full z-50 backdrop-blur-sm transition-all duration-1000"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        boxShadow:
          opacity > 0
            ? `0 1px 2px rgba(0, 0, 0, ${opacity * 0.1})`
            : 'none'
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="block">
            <img
              src="https://i.imgur.com/TJh2TQm.png"
              alt="EquiLink Logo"
              className="h-12 w-auto transform hover:scale-105 transition-transform duration-300"
            />
          </a>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-blue-800 hover:text-blue-900 transition-colours">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-900 transition-colours">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-900 transition-colours">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <button className="bg-blue-800 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-800/25 active:scale-95">
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* 
 * HeroSection Component
 * Displays the hero section with a background image, title, subtitle,
 * quote and a call-to-action button. It also shows a scroll indicator.
 */
function HeroSection({ imageLoaded, showIndicator, onScrollToContent }) {
  return (
    <div
      className={`relative min-h-screen flex items-center justify-center hero-section ${
        imageLoaded ? 'loaded' : ''
      }`}
      style={{
        backgroundImage: 'url("https://i.imgur.com/hZPxK0f.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay for darkening the background image */}
      <div className="absolute inset-0 bg-[#1a1f3a]/90" />
      <div className="relative z-10 text-center px-6">
        <h1
          className="text-7xl md:text-8xl font-light text-white mb-6 tracking-wide"
          style={{ fontFamily: FONT_PRIMARY }}
        >
          EquiLink
        </h1>
        <p className="text-2xl md:text-3xl text-white mb-12 font-light tracking-wide">
          Your Trusted Partner In Your Horse Search
        </p>
        <blockquote className="text-xl text-gray-300 mb-12 italic max-w-3xl mx-auto">
          "Literally the biggest time saver of this century for anyone looking for
          horses"
          <span className="block text-sm mt-4 text-gray-400">– The Auctioneer</span>
        </blockquote>
        <button
          onClick={() => (window.location.href = '/pricing')}
          className="bg-blue-800 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-800/25 active:scale-95 group"
        >
          Find Out More
        </button>
      </div>

      {/* Scroll Indicator Button */}
      <button
        onClick={onScrollToContent}
        className={`scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer ${
          showIndicator ? 'visible' : ''
        }`}
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8" strokeWidth={1} />
      </button>
    </div>
  );
}

/* 
 * BenefitItem Component
 * Represents a single benefit with a title and descriptive text.
 */
function BenefitItem({ delay, title, content }) {
  return (
    <div className="benefit-item text-center" style={{ transitionDelay: delay }}>
      <div className="benefit-dot w-4 h-4 bg-white rounded-full mx-auto mb-8" />
      <h3
        className="text-3xl font-light text-white mb-6"
        style={{ fontFamily: FONT_PRIMARY }}
      >
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed">{content}</p>
    </div>
  );
}

/* 
 * BenefitsSection Component
 * Displays the benefits of EquiLink with a background image overlay,
 * a heading, benefit items and the typewriter effect.
 */
function BenefitsSection() {
  return (
    <div className="relative py-24 bg-[#1a1f3a] benefits-section">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative z-10">
        <div className="container mx-auto px-6">
          <h2
            className="reveal text-5xl md:text-6xl font-light text-white text-center mb-20"
            style={{ fontFamily: FONT_PRIMARY }}
          >
            3 Main Benefits of EquiLink
          </h2>
          <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            <BenefitItem
              delay="0ms"
              title="Saves Time"
              content="EquiLink finds horses with a click – simply set your preferences and let the system search the web. With constant updates, you always see the latest listings ahead of everyone else."
            />
            <BenefitItem
              delay="200ms"
              title="Accessibility"
              content="Our app is straightforward. Set your desired settings, view the results, and click the adverts you like. Spend less time searching and more time on the yard."
            />
            <BenefitItem
              delay="400ms"
              title="Consistent Updates"
              content="Our dedicated team is on call 24/7 via WhatsApp and social media for any website issues or questions. We update the app daily to ensure you have the best experience."
            />
          </div>

          {/* Typewriter Effect at the end of the benefits */}
          <TypewriterEffect />
        </div>
      </div>
    </div>
  );
}

/* 
 * TeamMember Component
 * Displays individual team member details including an image, name, role,
 * description and an optional LinkedIn link.
 */
function TeamMember({ delay, name, role, description, imageUrl, linkedinUrl }) {
  return (
    <div className="team-card p-8 text-center rounded-2xl" style={{ transitionDelay: delay }}>
      <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-2xl font-medium mb-2 text-white">{name}</h3>
      <p className="text-blue-400 mb-4">{role}</p>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 mt-4 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colours"
        >
          <Linkedin className="w-5 h-5 text-blue-400" />
        </a>
      )}
    </div>
  );
}

/* 
 * TeamSection Component
 * Introduces the team behind EquiLink with a quote, title, description,
 * and individual team member cards.
 */
function TeamSection() {
  return (
    <div className="relative py-24 bg-[#1a1f3a]">
      <div className="container mx-auto px-6">
        <blockquote
          className="quote-reveal text-2xl md:text-3xl text-white text-center italic mb-20 max-w-4xl mx-auto"
          style={{ fontFamily: FONT_PRIMARY }}
        >
          "For me EquiLink was not only a solution to a problem I faced, but also a way to help others in the horse community make the search for their perfect horse so much easier."
        </blockquote>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-light text-xl">E</span>
            </div>
            <h2 className="text-3xl text-white ml-4" style={{ fontFamily: FONT_PRIMARY }}>
              Meet Our Team
            </h2>
          </div>
        </div>

        <p className="reveal text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          The passionate individuals behind EquiLink, bringing together expertise in horses and technology.
        </p>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <TeamMember
            delay="200ms"
            name="Henry"
            role="Project Lead & Designer"
            description="Having grown up around horses, I found a gap in the search process. My experience in web design and a lifelong love of horses fuelled this project."
            imageUrl="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80"
          />
          <TeamMember
            delay="400ms"
            name="Emily"
            role="Community Manager"
            description="Growing up on a yard, horses have always been a big part of my life. I love chatting, sharing updates, and helping you stay on top of the latest listings."
            imageUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
          />
          <TeamMember
            delay="600ms"
            name="Waleed"
            role="Development Lead"
            description="With years of full-stack development and data engineering experience, I specialise in creating scalable, efficient systems that power our platform."
            imageUrl="https://media.licdn.com/dms/image/v2/D4D03AQGU1pVB14cmLw/profile-displayphoto-shrink_400_400/B4DZQh2ZxeHMAg-/0/1735734698484?e=1744848000&v=beta&t=wXkRTXX8DRiEdCoQ2zhodwXfBO40Wq5uZIcx3QQypgw"
            linkedinUrl="https://linkedin.com/in/waleed"
          />
        </div>
      </div>
    </div>
  );
}

/* 
 * Footer Component
 * Displays the footer with contact information, quick links, legal links,
 * social media icons and copyright information.
 */
function Footer() {
  return (
    <footer className="bg-[#1a1f3a] text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: FONT_PRIMARY }}>
              Contact Us
            </h3>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>support@equilink.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>+44 (0) 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>London, United Kingdom</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: FONT_PRIMARY }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: FONT_PRIMARY }}>
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colours">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: FONT_PRIMARY }}>
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colours"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colours"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colours"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colours"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EquiLink. All rights reserved.</p>
          <p className="mt-2">
            Designed and developed with ❤️ for the equestrian community
          </p>
        </div>
      </div>
    </footer>
  );
}

/* 
 * App Component
 * Main container that handles scroll events, preloads images, triggers reveal effects,
 * and renders the overall layout including header, hero, benefits, team and footer.
 */
function App() {
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Handle header opacity change on scroll
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (scrollY === 0) {
      setHeaderOpacity(0);
      return;
    }
    const targetOpacity = 0.2;
    const scrollThreshold = 200;
    const progress = Math.min(scrollY / scrollThreshold, 1);
    const easedProgress = progress * (2 - progress);
    setHeaderOpacity(easedProgress * targetOpacity);
  }, []);

  useEffect(() => {
    let scrollTimer;
    const onScroll = () => {
      handleScroll();
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        // This timeout can be used to detect when scrolling stops (if needed)
      }, 500);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimer);
    };
  }, [handleScroll]);

  // Preload hero image and display scroll indicator after a delay
  useEffect(() => {
    const img = new Image();
    img.src = 'https://i.imgur.com/hZPxK0f.jpeg';
    img.onload = () => {
      setImageLoaded(true);
      setTimeout(() => setShowScrollIndicator(true), 2000);
    };
  }, []);

  // Reveal effect for elements with specific classes on scroll
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll(
        '.reveal, .team-card, .benefit-item, .quote-reveal'
      );
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Initial check
    setTimeout(handleReveal, 100);
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  // Smooth scroll to benefits section
  const scrollToContent = () => {
    const benefitsSection = document.querySelector('.benefits-section');
    benefitsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header opacity={headerOpacity} />
      <HeroSection
        imageLoaded={imageLoaded}
        showIndicator={showScrollIndicator}
        onScrollToContent={scrollToContent}
      />
      <BenefitsSection />
      <TeamSection />
      <Footer />
    </div>
  );
}

/* 
 * AppRouter Component
 * Sets up the routing for the application, defining paths for the home and pricing pages.
 */
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
