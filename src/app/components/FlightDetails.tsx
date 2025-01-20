'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Download, Calendar, Clock, MapPin } from 'lucide-react';

interface FlightSegment {
  flight: string;
  departure: string;
  arrival: string;
  from: string;
  to: string;
  seat: string;
  class: string;
}

interface FlightDetails {
  outbound: {
    date: string;
    duration: string;
    distance: string;
    segments: FlightSegment[];
    confirmation: string;
  };
  return: {
    date: string;
    flight: string;
    from: {
      city: string;
      terminal: string;
    };
    to: {
      city: string;
      terminal: string;
    };
    departure: string;
    arrival: string;
    duration: string;
    seat: string;
    class: string;
    aircraft: string;
  };
}

const flights: FlightDetails = {
  outbound: {
    date: 'Fri, Feb 14, 2025',
    duration: '5h 39min',
    distance: '1234 miles',
    segments: [
      {
        flight: 'AS 3417',
        departure: '05:20 PM',
        arrival: '06:28 PM',
        from: 'Vancouver Intl.',
        to: 'Seattle/Tacoma Intl.',
        seat: '13A',
        class: 'Main (S)'
      },
      {
        flight: 'AS 644',
        departure: '08:10 PM',
        arrival: '11:59 PM',
        from: 'Seattle/Tacoma Intl.',
        to: 'Sky Harbor Intl.',
        seat: '29C',
        class: 'Main (B)'
      }
    ],
    confirmation: 'MHSRRN'
  },
  return: {
    date: 'Mon, Feb 17, 2025',
    flight: 'AC 1055',
    from: {
      city: 'Phoenix, AZ (PHX)',
      terminal: 'Terminal 3'
    },
    to: {
      city: 'Vancouver, BC (YVR)',
      terminal: 'Terminal M'
    },
    departure: '13:15',
    arrival: '15:35',
    duration: '3h 20m',
    seat: '23E',
    class: 'Economy Class (S)',
    aircraft: 'Airbus A320-200'
  }
};

export default function FlightDetails(): JSX.Element {
  const [timeToFlight, setTimeToFlight] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'outbound' | 'return'>('outbound');
  
  useEffect(() => {
    const calculateTimeToFlight = () => {
      const outboundDate = new Date('2025-02-14T17:20:00');
      const now = new Date();
      const diff = outboundDate.getTime() - now.getTime();
      
      if (diff < 0) return 'Departed';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${days}d ${hours}h ${minutes}m`;
    };

    const timer = setInterval(() => {
      setTimeToFlight(calculateTimeToFlight());
    }, 60000);

    setTimeToFlight(calculateTimeToFlight());
    return () => clearInterval(timer);
  }, []);

  const ReturnFlightContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-semibold text-gray-800">Return Journey</h3>
        <div className="text-right">
          <p className="text-sm text-gray-500">{flights.return.duration}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-pink-500">{flights.return.flight}</p>
          <p className="text-sm text-gray-500">{flights.return.class}</p>
        </div>
        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <div>
            <p className="text-xl font-medium">{flights.return.departure}</p>
            <p className="text-gray-500">{flights.return.from.city}</p>
            <p className="text-sm text-gray-400">{flights.return.from.terminal}</p>
          </div>
          <Plane className="w-5 h-5 text-pink-400 rotate-90" />
          <div className="text-right">
            <p className="text-xl font-medium">{flights.return.arrival}</p>
            <p className="text-gray-500">{flights.return.to.city}</p>
            <p className="text-sm text-gray-400">{flights.return.to.terminal}</p>
          </div>
        </div>
        <div className="flex justify-between text-gray-500">
          <p>Seat {flights.return.seat}</p>
          <p>{flights.return.aircraft}</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.open('/pdfs/return.pdf', '_blank')}
        className="mt-8 w-full px-4 py-4 bg-pink-500 text-white rounded-xl 
                   hover:bg-pink-600 transition-all flex items-center justify-center gap-2
                   font-medium text-lg shadow-lg"
      >
        <Download className="w-5 h-5" />
        Download Itinerary
      </motion.button>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      {/* Enhanced Countdown Timer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-center gap-3">
          <Clock className="w-6 h-6 text-pink-500" />
          <p className="text-gray-600/80 text-xl">Your adventure begins in</p>
        </div>
        <p className="text-5xl font-semibold text-pink-500 tracking-tight">{timeToFlight}</p>
      </motion.div>

      {/* Flight Tab Navigation */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setActiveTab('outbound')}
          className={`px-6 py-3 rounded-xl transition-all ${
            activeTab === 'outbound' 
              ? 'bg-pink-500 text-white shadow-lg' 
              : 'bg-white/50 text-gray-600 hover:bg-white/80'
          }`}
        >
          Outbound Flight
        </button>
        <button
          onClick={() => setActiveTab('return')}
          className={`px-6 py-3 rounded-xl transition-all ${
            activeTab === 'return' 
              ? 'bg-pink-500 text-white shadow-lg' 
              : 'bg-white/50 text-gray-600 hover:bg-white/80'
          }`}
        >
          Return Flight
        </button>
      </div>

      {/* Flight Cards with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'outbound' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === 'outbound' ? 20 : -20 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white/95 rounded-3xl shadow-lg p-6 md:p-8 overflow-hidden"
        >
          {activeTab === 'outbound' ? (
            // Outbound Flight Content
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold text-gray-800">Outbound Journey</h3>
                <div className="text-right">
                  <span className="text-pink-500 font-medium">#{flights.outbound.confirmation}</span>
                  <p className="text-sm text-gray-500">{flights.outbound.duration}</p>
                </div>
              </div>

              {flights.outbound.segments.map((segment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative border-l-2 border-pink-200 pl-6 py-4"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-pink-200" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium text-pink-500">{segment.flight}</p>
                      <p className="text-sm text-gray-500">{segment.class}</p>
                    </div>
                    <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                      <div>
                        <p className="text-xl font-medium">{segment.departure}</p>
                        <p className="text-gray-500">{segment.from}</p>
                      </div>
                      <Plane className="w-5 h-5 text-pink-400 rotate-90" />
                      <div className="text-right">
                        <p className="text-xl font-medium">{segment.arrival}</p>
                        <p className="text-gray-500">{segment.to}</p>
                      </div>
                    </div>
                    <p className="text-gray-500">Seat {segment.seat}</p>
                  </div>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('/pdfs/depart.pdf', '_blank')}
                className="mt-8 w-full px-4 py-4 bg-pink-500 text-white rounded-xl 
                         hover:bg-pink-600 transition-all flex items-center justify-center gap-2
                         font-medium text-lg shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download Itinerary
              </motion.button>
            </div>
          ) : (
            <ReturnFlightContent />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 