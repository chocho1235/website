// this is the pricing page for the equilink website

import React, { useState } from 'react';
import { Check, ChevronDown, HelpCircle, Search, Building2, Users, CreditCard, ExternalLink, Youtube, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

function FAQItem({ question, icon: Icon, children }: { question: string; icon: any; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const containerStyles = "bg-navy-800 rounded-xl p-6 transition-all duration-300 hover:bg-navy-800/80";
  const buttonStyles = "w-full flex items-start gap-4 text-left";
  const iconStyles = "text-blue-400 flex-shrink-0";
  const chevronStyles = `text-blue-400 transition-transform duration-500 ease-in-out ${
    isOpen ? 'transform rotate-180' : ''
  }`;
  const contentStyles = `text-gray-300 overflow-hidden transition-all duration-500 ease-in-out ${
    isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
  }`;

  return (
    <div className={containerStyles}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonStyles}
      >
        <Icon className={iconStyles} size={24} />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold mb-2">{question}</h3>
            <ChevronDown
              className={chevronStyles}
              size={20}
            />
          </div>
          <div className={contentStyles}>
            {children}
          </div>
        </div>
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-opacity-90 bg-[#0f172a] backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => window.location.href = '/'} 
              className="text-white hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => window.location.href = '/contact'} 
              className="px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-[#0f172a] transition-all duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* Add padding-top to account for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Find Your Perfect Horse with EquiLink
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Access listings from every major equestrian platform in one place. Save time and find your dream horse faster.
          </p>
        </div>


        {/* Plan section  */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="group relative bg-navy-800 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all hover:transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0"></div>
              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">Basic Rider</h3>
                <p className="text-gray-400 mb-4">Perfect for occasional browsers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">£0</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Basic search functionality</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>View up to 20 listings per day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Email notifications</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="group relative bg-navy-800 rounded-2xl p-8 border-2 border-blue-500 transform scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl"></div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">Pro Equestrian</h3>
                <p className="text-gray-400 mb-4">For serious horse buyers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">£25</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Unlimited searches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Advanced filters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Save favorite listings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Priority notifications</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>

            

            {/* Business Plan */}
            <div className="group relative bg-navy-800 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all hover:transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0"></div>
              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">Business</h3>
                <p className="text-gray-400 mb-4">For dealers and professionals</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">£89</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Bulk listing management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            By proceeding, you agree to our{' '}
            <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
              Terms of Service
            </a>
          </p>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem question="What is the main idea behind EquiLink?" icon={HelpCircle}>
              EquiLink simplifies horse buying by aggregating listings from multiple platforms into one convenient space. 
              It eliminates the need to navigate different websites, saving you time and effort in finding your perfect horse.
            </FAQItem>

            <FAQItem question="How much time can I save?" icon={Search}>
              Users typically save 70% of their search time by using EquiLink instead of searching multiple platforms individually. 
              Our unified search and filtering system makes the process significantly more efficient.
            </FAQItem>

            <FAQItem question="Who can EquiLink be used by?" icon={Users}>
              EquiLink is designed for everyone in the equestrian community - from first-time buyers to professional dealers. 
              Whether you're looking for your first horse or managing multiple sales, we have features to support your needs.
            </FAQItem>

            <FAQItem question="Are there any hidden fees?" icon={CreditCard}>
              No hidden fees! We believe in transparent pricing. What you see is what you pay, and you can cancel your subscription at any time.
            </FAQItem>

            <FAQItem question="Do you own the listings on EquiLink?" icon={ExternalLink}>
              No, we don't own the listings. EquiLink aggregates listings from various trusted platforms and connects you directly with sellers. 
              We simply make the search process easier.
            </FAQItem>

            <FAQItem question="How does EquiLink benefit horse dealers?" icon={Building2}>
              Dealers can manage their listings across multiple platforms from one dashboard, track performance analytics, 
              and reach a wider audience. Our Business plan includes tools specifically designed for professional sellers.
            </FAQItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;