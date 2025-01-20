'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import NextImage from 'next/image';
import { Heart, Plane, Coffee, Music, Star } from 'lucide-react';
import React from 'react';

interface Memory {
  image: string;
  caption: string;
  date: string;
  icon: 'heart' | 'plane' | 'coffee' | 'music' | 'star';
  details?: string;
}

const memories: Memory[] = [
  {
    image: '/images/IMG_0167.png',
    caption: 'Our first coffee date ☕',
    date: 'January 2023',
    icon: 'coffee',
    details: 'It was such a cozy day, and I remember you laughing over my latte art fail!'
  },
  {
    image: '/images/IMG_1092.png',
    caption: 'Spring blossoms 🌸',
    date: 'April 2023',
    icon: 'heart',
    details: 'Walking hand in hand through the park, surrounded by blooming flowers.'
  },
  {
    image: '/images/IMG_1175.png',
    caption: 'Picnic by the lake 🧺',
    date: 'May 2023',
    icon: 'star',
    details: 'The sky was so blue, and your smile was brighter than the sunshine.'
  },
  {
    image: '/images/IMG_1454.png',
    caption: 'Our trip to the mountains 🏔️',
    date: 'March 2023',
    icon: 'plane',
    details: 'The air was so fresh, and the view from the summit was magical with you by my side.'
  },
  {
    image: '/images/IMG_1462.png',
    caption: 'Cooking adventures 🍳',
    date: 'June 2023',
    icon: 'star',
    details: 'We made a mess in the kitchen, but it was so worth it for that pasta.'
  },
  {
    image: '/images/IMG_3711.png',
    caption: 'Late-night talks 🌙',
    date: 'July 2023',
    icon: 'music',
    details: 'Under the stars, sharing secrets and dreams that made us feel so close.'
  },
  {
    image: '/images/IMG_7613.png',
    caption: 'Movie marathon 🍿',
    date: 'August 2023',
    icon: 'heart',
    details: 'Snuggled up on the couch, laughing and crying over our favorite films.'
  },
  {
    image: '/images/IMG_7842.png',
    caption: 'Road trip adventures 🚗',
    date: 'September 2023',
    icon: 'plane',
    details: 'Singing along to the radio and stopping at every scenic spot along the way.'
  },
  {
    image: '/images/IMG_7853.png',
    caption: 'Pumpkin patch fun 🎃',
    date: 'October 2023',
    icon: 'heart',
    details: 'Picking the perfect pumpkin and taking the cutest fall pictures together.'
  },
  {
    image: '/images/IMG_7940.png',
    caption: 'Holiday celebrations 🎄',
    date: 'December 2023',
    icon: 'star',
    details: 'Decorating the tree and exchanging the sweetest gifts with each other.'
  },
  {
    image: '/images/IMG_7942.png',
    caption: 'Snowy getaway ❄️',
    date: 'January 2024',
    icon: 'plane',
    details: 'Building snowmen, sledding, and drinking hot cocoa to stay warm.'
  },
  {
    image: '/images/IMG_7979.png',
    caption: 'Sunset at the beach 🌅',
    date: 'February 2024',
    icon: 'heart',
    details: 'Watching the sun dip below the horizon, painting the sky in golden hues.'
  }
];

const icons = {
  heart: Heart,
  plane: Plane,
  coffee: Coffee,
  music: Music,
  star: Star
};

export default function PhotoGallery({ onNext }: { onNext: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState<boolean[]>(new Array(memories.length).fill(false));
  const dragX = useMotionValue(0);

  const leftArrowOpacity = useTransform(
    dragX,
    [-100, 0, 100],
    [0, currentIndex > 0 ? 0.5 : 0, 0]
  );
  const rightArrowOpacity = useTransform(
    dragX,
    [-100, 0, 100],
    [0, currentIndex < memories.length - 1 ? 0.5 : 0, 0]
  );

  const handleDragEnd = () => {
    const x = dragX.get();
    if (x <= -100 && currentIndex < memories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (x >= 100 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    dragX.set(0);
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (direction === 'next' && currentIndex < memories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const unlockMemory = (index: number) => {
    const newUnlocked = [...isUnlocked];
    newUnlocked[index] = true;
    setIsUnlocked(newUnlocked);
  };

  return (
    <div className="min-h-screen relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Left Arrow */}
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl
                       cursor-pointer hover:scale-110 transition-transform"
            style={{ opacity: leftArrowOpacity }}
            onClick={() => navigateGallery('prev')}
          >
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full">
              ←
            </div>
          </motion.div>

          {/* Right Arrow */}
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl
                       cursor-pointer hover:scale-110 transition-transform"
            style={{ opacity: rightArrowOpacity }}
            onClick={() => navigateGallery('next')}
          >
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full">
              →
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            style={{ x: dragX }}
            onDragEnd={handleDragEnd}
          >
            <div className="relative aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="absolute inset-0"
                  onClick={() => unlockMemory(currentIndex)}
                >
                  <NextImage
                    src={memories[currentIndex].image}
                    alt={memories[currentIndex].caption}
                    fill
                    className="object-cover"
                  />

                  {isUnlocked[currentIndex] && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t 
                                 from-black/70 to-transparent text-white"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {React.createElement(icons[memories[currentIndex].icon], {
                          className: "w-5 h-5 text-pink-400"
                        })}
                        <span className="text-sm font-medium">{memories[currentIndex].date}</span>
                      </div>
                      <p className="text-lg font-medium">{memories[currentIndex].caption}</p>
                      {memories[currentIndex].details && (
                        <p className="text-sm text-gray-300 mt-2">{memories[currentIndex].details}</p>
                      )}
                    </motion.div>
                  )}

                  {!isUnlocked[currentIndex] && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-white text-lg font-medium">
                        Tap to unlock this memory ✨
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {memories.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentIndex ? 'bg-pink-500' : 'bg-pink-200'
              }`}
              animate={{ scale: index === currentIndex ? 1.2 : 1 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            className={`px-6 py-2 bg-pink-500 text-white rounded-lg transition-all
                       hover:bg-pink-600 hover:shadow-lg ${
                         currentIndex === 0 && 'opacity-50 cursor-not-allowed'
                       }`}
            onClick={() => navigateGallery('prev')}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          
          {currentIndex === memories.length - 1 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg
                         hover:bg-pink-600 hover:shadow-lg transition-all"
              onClick={onNext}
            >
              Continue to Next Section
            </motion.button>
          )}
          
          {currentIndex < memories.length - 1 && (
            <button
              className="px-6 py-2 bg-pink-500 text-white rounded-lg
                         hover:bg-pink-600 hover:shadow-lg transition-all"
              onClick={() => navigateGallery('next')}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
