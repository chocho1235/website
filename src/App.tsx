import React, { useState, useEffect, useCallback } from 'react';
import { Youtube, Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingPage from './pages/PricingPage';

function TypewriterEffect() {
  const [text, setText] = useState('');
  const phrases = [
    'A friendly community',
    'Constant updates',
    '24/7 dedicated support'
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        setSpeed(150);
        
        if (text === currentPhrase) {
          setSpeed(2000); // Pause at the end
          setIsDeleting(true);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        setSpeed(100);
        
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
      <p className="text-2xl text-white font-light" style={{ fontFamily: 'Cormorant Garamond' }}>
        Plus many more benefits such as...{' '}
        <span className="text-blue-400 inline-block min-w-[20ch] text-left">
          {text}
          <span className="animate-pulse">|</span>
        </span>
      </p>
    </div>
  );
}

function App() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    const scrollY = window.scrollY;
    
    // If at the top, opacity is 0
    if (scrollY === 0) {
      setHeaderOpacity(0);
      return;
    }
    
    // Smooth transition to 20% opacity over 200px of scroll
    const targetOpacity = 0.2;
    const scrollThreshold = 200;
    const progress = Math.min(scrollY / scrollThreshold, 1);
    const easedProgress = progress * (2 - progress); // Easing function for smoother transition
    const newOpacity = easedProgress * targetOpacity;
    
    setHeaderOpacity(newOpacity);
  }, []);

  useEffect(() => {
    let scrollTimer: number;

    const onScroll = () => {
      handleScroll();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(scrollTimer);
    };
  }, [handleScroll]);

  // Preload hero image and show scroll indicator
  useEffect(() => {
    const img = new Image();
    img.src = "https://i.imgur.com/hZPxK0f.jpeg";
    img.onload = () => {
      setImageLoaded(true);
      // Show scroll indicator after a delay
      setTimeout(() => {
        setShowScrollIndicator(true);
      }, 2000);
    };
  }, []);

  // Enhanced scroll reveal effect
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal, .team-card, .benefit-item, .quote-reveal');
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Initial check
    
    setTimeout(handleReveal, 100);
    
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  const scrollToContent = () => {
    const benefitsSection = document.querySelector('.benefits-section');
    benefitsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header 
        className="fixed w-full z-50 backdrop-blur-sm transition-all duration-1000"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
          boxShadow: headerOpacity > 0 ? `0 1px 2px rgba(0, 0, 0, ${headerOpacity * 0.1})` : 'none'
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a href="/" className="block">
                <img 
                  src="https://i.imgur.com/TJh2TQm.png" 
                  alt="EquiLink Logo" 
                  className="h-12 w-auto transform hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors">
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

      {/* Hero Section */}
      <div 
        className={`relative min-h-screen flex items-center justify-center hero-section ${imageLoaded ? 'loaded' : ''}`}
        style={{
          backgroundImage: 'url("https://i.imgur.com/hZPxK0f.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#1a1f3a]/90" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-7xl md:text-8xl font-light text-white mb-6 tracking-wide" style={{ fontFamily: 'Cormorant Garamond' }}>
            EquiLink
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-12 font-light tracking-wide">
            Your Trusted Partner In Your Horse Search
          </p>
          <blockquote className="text-xl text-gray-300 mb-12 italic max-w-3xl mx-auto">
            "Literally the biggest time saver of this century for anyone looking for horses"
            <span className="block text-sm mt-4 text-gray-400">– The Auctioneer</span>
          </blockquote>
          <button 
            onClick={() => {
              window.location.href = '/pricing';
            }}
            className="bg-blue-800 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-800/25 active:scale-95 group"
          >
            Find Out More
          </button>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToContent}
          className={`scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer ${showScrollIndicator ? 'visible' : ''}`}
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8" strokeWidth={1} />
        </button>
      </div>

      {/* Benefits Section */}
      <div className="relative py-24 bg-[#1a1f3a] benefits-section">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10">
          <div className="container mx-auto px-6">
            <h2 className="reveal text-5xl md:text-6xl font-light text-white text-center mb-20" style={{ fontFamily: 'Cormorant Garamond' }}>
              3 Main Benefits of EquiLink
            </h2>
            <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
              <div className="benefit-item text-center">
                <div className="benefit-dot w-4 h-4 bg-white rounded-full mx-auto mb-8"></div>
                <h3 className="text-3xl font-light text-white mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>Saves Time</h3>
                <p className="text-gray-300 leading-relaxed">
                  EquiLink will find you horses in just a click, start by selecting your desired settings. For example, 15-16.1h, Any Breed and within the last 24 hours. EquiLink will do the rest, it will search the web to find you results, saving your time so you can spend it where it matters. But that's not all, EquiLink is constantly updating it's extensive database of listings, so rest assured, you are seeing adverts ahead of everyone else.
                </p>
              </div>
              <div className="benefit-item text-center" style={{ transitionDelay: '200ms' }}>
                <div className="benefit-dot w-4 h-4 bg-white rounded-full mx-auto mb-8"></div>
                <h3 className="text-3xl font-light text-white mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>Accessibility</h3>
                <p className="text-gray-300 leading-relaxed">
                  EquiLink is a simple program from the onset, just set your desired settings and see the results, and click the adverts you like. We know the equestrian world is full on, leaving you no time, with our simplistic app more of it can be spent on the yard.
                </p>
              </div>
              <div className="benefit-item text-center" style={{ transitionDelay: '400ms' }}>
                <div className="benefit-dot w-4 h-4 bg-white rounded-full mx-auto mb-8"></div>
                <h3 className="text-3xl font-light text-white mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>Consistent Updates</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our dedicated team experienced with horses are on call through our WhatsApp and social medias 24/7 with any issues related to the website, any questions or unrelated matters. We are also consistently updating the web app daily for your use.
                </p>
              </div>
            </div>
            
            {/* Typewriter Effect */}
            <TypewriterEffect />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative py-24 bg-[#1a1f3a]">
        <div className="container mx-auto px-6">
          {/* Quote */}
          <blockquote className="quote-reveal text-2xl md:text-3xl text-white text-center italic mb-20 max-w-4xl mx-auto" style={{ fontFamily: 'Cormorant Garamond' }}>
            "For me EquiLink was not only a solution to a problem I faced, but also a way to help others in the horse community make the search for their perfect horse so much easier."
          </blockquote>

          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-light text-xl">E</span>
              </div>
              <h2 className="text-3xl text-white ml-4" style={{ fontFamily: 'Cormorant Garamond' }}>Meet Our Team</h2>
            </div>
          </div>

          <p className="reveal text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            The passionate individuals behind EquiLink, bringing together expertise in horses and technology.
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="team-card p-8 text-center rounded-2xl" style={{ transitionDelay: '200ms' }}>
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                <img 
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80" 
                  alt="Henry" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium mb-2 text-white">Henry</h3>
              <p className="text-blue-400 mb-4">Project Lead & Designer</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Having grown up around horses, I found a gap and commonly shared issue in people's search for horses, my rich experience in Web Design and horses is what fuelled this project.
              </p>
            </div>

            <div className="team-card p-8 text-center rounded-2xl" style={{ transitionDelay: '400ms' }}>
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                  alt="Emily" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium mb-2 text-white">Emily</h3>
              <p className="text-blue-400 mb-4">Community Manager</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Growing up on a yard, horses have always been a big part of my life. I love chatting with you guys, sharing updates, and helping you stay on top of the latest horse listings.
              </p>
            </div>

            <div className="team-card p-8 text-center rounded-2xl" style={{ transitionDelay: '600ms' }}>
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4D03AQGU1pVB14cmLw/profile-displayphoto-shrink_400_400/B4DZQh2ZxeHMAg-/0/1735734698484?e=1744848000&v=beta&t=wXkRTXX8DRiEdCoQ2zhodwXfBO40Wq5uZIcx3QQypgw" 
                  alt="Waleed" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium mb-2 text-white">Waleed</h3>
              <p className="text-blue-400 mb-4">Development Lead</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                With years of experience in full-stack development and a strong background in data engineering, I specialize in creating scalable and efficient systems that power our platform.
              </p>
              <a 
                href="https://linkedin.com/in/waleed" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center w-10 h-10 mt-4 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1f3a] text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>Contact Us</h3>
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
              <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Our Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Disclaimer</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center hover:bg-blue-800/30 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} EquiLink. All rights reserved.</p>
            <p className="mt-2">
              Designed and developed with ❤️ for the equestrian community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
