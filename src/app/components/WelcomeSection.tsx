'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function WelcomeSection() {
  // Client-side state
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);
  const [password] = useState<string>('');
  const [currentSection] = useState<string>('welcome');

  // Sections content
  const sections = {
    welcome: {
      title: 'Welcome',
      content: (
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-transparent bg-clip-text">
            Happy Anniversary, My Love
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Every moment with you is a gift, and I wanted to create this special space to celebrate our love and the beautiful journey we&apos;re on together.
          </p>
        </div>
      )
    },
    letter: {
      title: 'My Letter',
      content: (
        <div className="max-w-2xl mx-auto bg-white/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Dearest</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            [Your letter content here]
          </p>
        </div>
      )
    },
    memories: {
      title: 'Our Story',
      content: (
        <div className="space-y-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Beautiful Journey</h2>
          <p>Coming soon...</p>
        </div>
      )
    },
    music: {
      title: 'Our Song',
      content: (
        <div className="space-y-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Special Song</h2>
          <p>Coming soon...</p>
        </div>
      )
    },
    future: {
      title: 'Our Future',
      content: (
        <div className="space-y-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Next Adventure</h2>
          <p>Coming soon...</p>
        </div>
      )
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'love2025') {
      setIsPasswordCorrect(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-purple-100">
      {!isPasswordCorrect ? (
        <div className="min-h-screen p-4 flex items-center justify-center">
          <form onSubmit={handlePasswordSubmit} className="w-full max-w-md">
            {/* Your existing password form */}
          </form>
        </div>
      ) : (
        <>
          <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-40 shadow-sm">
            {/* Your existing navigation */}
          </nav>

          <main className="pt-20 px-4 pb-12 max-w-5xl mx-auto">
            {sections[currentSection as keyof typeof sections].content}
          </main>

          <footer className="text-center py-8">
            <Heart className="w-6 h-6 text-pink-500 mx-auto animate-pulse" />
            <p className="mt-2 text-gray-600">Made with love, for you</p>
          </footer>
        </>
      )}
    </div>
  );
}
