import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CakeWithCandle({ candleBlown }) {
  return (
    <svg 
      viewBox="0 0 240 280" 
      className="w-full h-full" 
      style={{ filter: 'drop-shadow(0 20px 40px rgba(244,63,94,0.35))' }}
    >
      <defs>
        {/* Shading/Gradient for the main candle stem */}
        <linearGradient id="candleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFDEAD" />
          <stop offset="40%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#F4A460" />
        </linearGradient>

        {/* Shading for the outer flame glow */}
        <radialGradient id="flameGrad" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#fff7c2" />
          <stop offset="40%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF6B00" />
        </radialGradient>

        {/* Shading for the intense inner core of the flame */}
        <radialGradient id="flameCore" cx="50%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* --- CAKE BASE SHADOW --- */}
      <ellipse cx="115" cy="265" rx="90" ry="12" fill="rgba(0,0,0,0.35)" />

      {/* --- TIER 3 (BOTTOM LARGEST TIER) --- */}
      <g id="bottom-tier">
        {/* Main Base Structure */}
        <rect x="25" y="195" width="180" height="65" rx="14" fill="#bc125c" />
        {/* Top Highlight Layer */}
        <rect x="25" y="195" width="180" height="12" rx="6" fill="#ec4899" />
        {/* Embedded Shading Bars */}
        {[52, 79, 106, 133, 160].map((x, i) => (
          <rect key={i} x={x} y="215" width="10" height="30" rx="4" fill="rgba(0,0,0,0.06)" />
        ))}
        {/* Cream Drips */}
        {[35, 60, 85, 110, 135, 160, 185].map((x, i) => (
          <path key={i} d={`M${x},195 Q${x + 5},216 ${x + 4},224`} stroke="#fff0f5" strokeWidth="11" fill="none" strokeLinecap="round" />
        ))}
        {/* Decorative Dots */}
        {[40, 68, 97, 126, 155, 184].map((x, i) => (
          <circle key={i} cx={x} cy="232" r="6" fill={["#f59e0b", "#f9a8d4", "#38bdf8", "#f59e0b", "#f9a8d4", "#38bdf8"][i]} />
        ))}
      </g>

      {/* --- TIER 2 (MIDDLE TIER) --- */}
      <g id="middle-tier">
        {/* Main Base Structure */}
        <rect x="45" y="130" width="140" height="65" rx="12" fill="#d81b60" />
        {/* Top Highlight Layer */}
        <rect x="45" y="130" width="140" height="12" rx="6" fill="#f43f5e" />
        {/* Cream Drips */}
        {[57, 79, 101, 123, 145, 167].map((x, i) => (
          <path key={i} d={`M${x},130 Q${x + 4},148 ${x + 4},155`} stroke="#fff0f5" strokeWidth="10" fill="none" strokeLinecap="round" />
        ))}
        {/* Dual Pink Cream Toppings */}
        {[61, 101, 141, 169].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="161" r="8" fill="#c2185b" opacity="0.8" />
            <circle cx={x - 3} cy="159" r="5" fill="#e91e63" opacity="0.85" />
            <circle cx={x + 3} cy="159" r="5" fill="#e91e63" opacity="0.85" />
            <circle cx={x} cy="154" r="5" fill="#ff85af" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* --- TIER 1 (TOP SMALLEST TIER) --- */}
      <g id="top-tier">
        {/* Main Base Structure */}
        <rect x="65" y="65" width="100" height="56" rx="10" fill="#e91e63" />
        {/* Top Highlight Layer */}
        <rect x="65" y="65" width="100" height="11" rx="5" fill="#f472b6" />
        {/* Cream Drips */}
        {[73, 91, 110, 128, 147].map((x, i) => (
          <path key={i} d={`M${x},65 Q${x + 3},78 ${x + 3},86`} stroke="#fff0f5" strokeWidth="9" fill="none" strokeLinecap="round" />
        ))}
        {/* Gold Celebratory Stars */}
        {[81, 115, 149].map((x, i) => (
          <text key={i} x={x} y="100" textAnchor="middle" fontSize="17" fill="#fbbf24" style={{ fontFamily: 'Arial' }}>★</text>
        ))}
      </g>

      {/* --- LITTLE FLOATING FLOWER EXTRA --- */}
      <g id="mini-flower" transform="translate(78, 42) scale(0.8)">
        <path d="M4,12 Q6,2 10,2 Q14,2 16,12" stroke="#4ade80" strokeWidth="2" fill="none" />
        <circle cx="10" cy="14" r="5" fill="#fb7185" />
        <circle cx="6" cy="12" r="4" fill="#f43f5e" />
        <circle cx="14" cy="12" r="4" fill="#f43f5e" />
      </g>

      {/* --- THE INTERACTIVE CANDLE --- */}
      <g id="candle">
        {/* Candle Stem Body */}
        <rect x="109" y="32" width="12" height="34" rx="4" fill="url(#candleGrad)" />
        {/* Soft Wax Highlight Reflection */}
        <rect x="112" y="36" width="3" height="20" rx="1.5" fill="rgba(255,255,255,0.4)" />
        
        {/* Animated Flame Container */}
        <AnimatePresence>
          {!candleBlown && (
            <motion.g 
              initial={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0, y: -25 }} 
              transition={{ duration: 0.4, ease: "easeOut" }} 
              style={{ transformOrigin: '115px 24px' }}
            >
              {/* Outer Ambient Fire Halo Glow */}
              <circle cx="115" cy="22" r="16" fill="rgba(245,158,11,0.2)" />
              {/* Main Outer Flame Layer */}
              <ellipse cx="115" cy="18" rx="8" ry="14" fill="url(#flameGrad)" className="flame" />
              {/* Intense Inner Core Layer */}
              <ellipse cx="115" cy="21" rx="4" ry="8" fill="url(#flameCore)" className="flame" style={{ animationDelay: '0.05s' }} />
              {/* Brightest Center Candle Ember Point */}
              <circle cx="115" cy="12" r="2.5" fill="#ffffff" opacity="0.95" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Animated Smoke Trails After Blow Out */}
        <AnimatePresence>
          {candleBlown && (
            <g>
              <motion.ellipse 
                cx="115" cy="24" rx="3" ry="5" fill="rgba(220,220,220,0.5)"
                initial={{ opacity: 0.7, scaleX: 1, y: 0 }}
                animate={{ opacity: 0, scaleX: 3.5, y: -45 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.ellipse 
                cx="112" cy="20" rx="2" ry="4" fill="rgba(200,200,200,0.4)"
                initial={{ opacity: 0.6, scaleX: 1, y: 0 }}
                animate={{ opacity: 0, scaleX: 2.8, y: -38 }}
                transition={{ duration: 1.3, delay: 0.15, ease: "easeOut" }}
              />
            </g>
          )}
        </AnimatePresence>
      </g>
    </svg>
  );
}