'use client';

import React, { useState, useEffect } from 'react';
import { Heart, ImageIcon, Ticket, Star, Send, Calendar, Moon } from 'lucide-react';
import NextImage from 'next/image';
import FlightDetails from './components/FlightDetails';
import LetterSection from './components/LetterSection';
import PhotoGallery from './components/PhotoGallery';

export default function Home() {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [currentSection, setCurrentSection] = useState<string>('welcome');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Story progression
  const handleNextSection = () => {
    const order = ['welcome', 'letter', 'memories', 'future'];
    const currentIndex = order.indexOf(currentSection);
    if (currentIndex < order.length - 1) {
      setCurrentSection(order[currentIndex + 1]);
    }
  };

  const sections = {
    welcome: {
      title: 'Welcome',
      content: (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6">
            Happy Anniversary, My Love
          </h1>
          <p className="text-xl text-gray-600/80 mb-32">
            Let me take you through a magical journey...
          </p>
          
          <div className="relative">
            {/* Speech Bubble */}
            <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 
                        bg-white rounded-3xl p-4 shadow-sm min-w-[140px]">
              <p className="text-gray-800 text-lg">Hi Love! 💝</p>
            </div>

            {/* Button with Bird */}
            <div className="relative">
              <button
                onClick={handleNextSection}
                className="px-16 py-5 bg-pink-500 text-white text-xl rounded-full
                         hover:bg-pink-600 transition-all shadow-lg w-[300px]"
              >
                Begin Our Journey <Heart className="w-5 h-5 inline-block ml-2" />
              </button>
              
              {/* Canada Jay perched on button */}
              <div className="absolute -top-4 right-0">
                <NextImage
                  src="/images/teddy.png"
                  alt="Canada Jay Guide"
                  width={42}
                  height={42}
                  className="transform scale-x-100"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    letter: {
      title: 'My Letter',
      content: <LetterSection onNext={handleNextSection} />
    },
    memories: {
      title: 'Our Story',
      content: (
        <div className="space-y-8 text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800">Our Beautiful Journey</h2>
          <PhotoGallery onNext={handleNextSection} />
        </div>
      )
    },
    future: {
      title: 'Our Future',
      content: (
        <div className="space-y-8 text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800">Our Next Adventure</h2>
          <FlightDetails />
          <p className="mt-4 text-gray-600 italic">Can't wait to create more memories with you...</p>
        </div>
      )
    }
  };

  // Add these animations to your globals.css
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Password check
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'love2025') {
      setIsPasswordCorrect(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  // Password screen
  if (!isPasswordCorrect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-purple-100 p-4 flex items-center justify-center">
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl relative">
            <Heart className="w-12 h-12 text-pink-500 absolute -top-6 left-1/2 transform -translate-x-1/2 animate-pulse" />
            <div className="mt-6 text-center space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">Hey Beautiful ❤️</h1>
              <p className="text-gray-600">Enter our special date to begin...</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="Enter our date..."
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-[1.02] transition-all"
              >
                Open My Heart
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-purple-100">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-between items-center py-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <span className="sr-only">Open menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <span className="text-gray-900 font-medium">Our Love Story</span>
          </div>

          {/* Mobile Menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden py-2`}>
            {Object.entries(sections).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentSection(key);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-pink-50 ${
                  currentSection === key ? 'bg-pink-50 text-pink-600' : ''
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center space-x-4 py-4">
            {Object.entries(sections).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => setCurrentSection(key)}
                className={`px-4 py-2 rounded-full transition-all ${
                  currentSection === key
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 pb-12 max-w-5xl mx-auto">
        {/* Your existing section content here */}
        {sections[currentSection as keyof typeof sections].content}
      </main>

      {/* Footer */}
      <footer className="text-center py-8">
        <Heart className="w-6 h-6 text-pink-500 mx-auto animate-pulse" />
        <p className="mt-2 text-gray-600">Made with love, for you</p>
      </footer>
    </div>
  );
}