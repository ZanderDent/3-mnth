'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { Heart } from 'lucide-react';

export default function LetterSection({ onNext }: { onNext: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const paragraphs = [
    "My dearest love,",
    "As I write this letter, my heart overflows with love for you. Through every challenge and triumph, your strength and resilience have amazed me. I want you to know that you are cherished, valued, and deeply loved.",
    "Our journey together has been beautiful, and I promise to stand by your side, supporting and loving you through every moment. You deserve all the happiness in the world, and I'm committed to bringing more joy into your life each day.",
    "Forever yours,\nJustin"
  ];

  const letterY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const letterScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const letterRotate = useTransform(scrollYProgress, [0, 0.2], [5, 0]);
  const birdY = useTransform(scrollYProgress, [0.8, 1], [0, -20]);
  const birdRotate = useTransform(scrollYProgress, [0.8, 1], [0, -15]);
  const birdScale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);

  const birdVariants = {
    initial: {
      x: 0,
      y: -20,
      opacity: 0
    },
    rest: {
      x: -100,
      y: 110,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    },
    hover: {
      y: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-[150vh] relative px-4 py-20">
      <AnimatePresence>
        {!isLetterOpen && (
          <>
            <motion.div 
              className="max-w-xl mx-auto text-center"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
            >
              <motion.div 
                className="relative cursor-pointer bg-white/5 backdrop-blur-sm p-8 rounded-[2rem]
                           shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => setIsLetterOpen(true)}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                whileHover={{ scale: 1.02 }}
              >
                <NextImage
                  src="/images/envelope.png"
                  alt="Love Letter"
                  width={500}
                  height={400}
                  className="mx-auto"
                  priority
                />
                
                <motion.div 
                  className="absolute -top-6 right-12"
                  variants={birdVariants}
                  initial="initial"
                  animate={isHovering ? "hover" : "rest"}
                  exit="exit"
                >
                  <NextImage
                    src="/images/teddy.png"
                    alt="Canada Jay Guide"
                    width={48}
                    height={48}
                    className="drop-shadow-md"
                  />
                </motion.div>
              </motion.div>
              
              <motion.p 
                className="mt-8 text-gray-600 text-lg"
                animate={isHovering ? { y: -5 } : { y: 0 }}
              >
                Click to open your letter ✉️
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isLetterOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="max-w-2xl mx-auto bg-white/95 rounded-3xl shadow-xl p-8 md:p-12 
                     border border-pink-100 relative"
        >
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5 rounded-3xl" />
          
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.4, duration: 0.6 }}
              className={`text-gray-800 leading-relaxed ${
                index === 0 || index === paragraphs.length - 1 
                  ? 'font-dancing-script text-2xl' 
                  : 'text-lg'
              }`}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onClick={onNext}
        className="fixed bottom-8 right-8 px-6 py-3 bg-pink-500 text-white rounded-full
                   shadow-lg flex items-center gap-2 hover:bg-pink-600 transition-all"
      >
        Continue <Heart className="w-4 h-4" />
      </motion.button>
    </div>
  );
} 