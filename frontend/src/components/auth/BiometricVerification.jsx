import React, { useState, useEffect } from 'react';
import { Shield, Fingerprint, Eye, EyeOff } from 'lucide-react';

const BiometricVerification = ({ onVerify }) => {
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  // Grid size for pattern lock
  const gridSize = 3;
  const totalDots = gridSize * gridSize;

  useEffect(() => {
    // Generate random pattern for demo (in production, this would be stored)
    const randomPattern = [];
    const dotsNeeded = 4 + Math.floor(Math.random() * 3); // 4-6 dots
    while (randomPattern.length < dotsNeeded) {
      const dot = Math.floor(Math.random() * totalDots);
      if (!randomPattern.includes(dot)) {
        randomPattern.push(dot);
      }
    }
    setPattern(randomPattern);
  }, []);

  const handleDotEnter = (dotIndex) => {
    if (isDrawing && !userPattern.includes(dotIndex)) {
      setUserPattern([...userPattern, dotIndex]);
    }
  };

  const handleDotStart = (dotIndex) => {
    setIsDrawing(true);
    setUserPattern([dotIndex]);
    setError('');
  };

  const handleDotEnd = () => {
    setIsDrawing(false);
    
    // Verify pattern
    if (userPattern.length < 4) {
      setError('Pattern too short - connect at least 4 dots');
      setTimeout(() => {
        setUserPattern([]);
        setError('');
      }, 1500);
      return;
    }

    // For demo: accept any pattern with 4+ dots
    setVerified(true);
    setTimeout(() => {
      onVerify(true);
    }, 800);
  };

  return (
    <div className="mb-6 p-6 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30">
      <div className="flex items-center gap-3 mb-4">
        <Fingerprint className="w-6 h-6 text-purple-400" />
        <div>
          <h3 className="text-lg font-semibold text-purple-300">Biometric Pattern Lock</h3>
          <p className="text-xs text-gray-400">Draw your pattern to unlock</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-2 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {verified && (
        <div className="mb-4 p-2 rounded bg-green-500/20 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Pattern verified! Unlocking vault...
        </div>
      )}

      {/* Pattern Grid */}
      <div className="relative bg-black/40 rounded-lg p-8">
        <div
          className="grid gap-12 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: 'fit-content',
          }}
          onMouseUp={handleDotEnd}
          onMouseLeave={handleDotEnd}
        >
          {Array.from({ length: totalDots }).map((_, index) => {
            const isActive = userPattern.includes(index);
            const isFirst = userPattern[0] === index;
            const isLast = userPattern[userPattern.length - 1] === index;

            return (
              <div
                key={index}
                className="relative"
                onMouseDown={() => handleDotStart(index)}
                onMouseEnter={() => handleDotEnter(index)}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? verified
                        ? 'bg-green-400 shadow-lg shadow-green-400/50 scale-150'
                        : 'bg-purple-400 shadow-lg shadow-purple-400/50 scale-150'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
                {isActive && (
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${
                      verified ? 'text-green-300' : 'text-purple-300'
                    }`}
                  >
                    {userPattern.indexOf(index) + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connection Lines (SVG overlay) */}
        {userPattern.length > 1 && (
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          >
            {userPattern.slice(0, -1).map((dotIndex, i) => {
              const nextDotIndex = userPattern[i + 1];
              const row1 = Math.floor(dotIndex / gridSize);
              const col1 = dotIndex % gridSize;
              const row2 = Math.floor(nextDotIndex / gridSize);
              const col2 = nextDotIndex % gridSize;

              // Calculate positions (accounting for padding and gap)
              const x1 = col1 * 60 + 40;
              const y1 = row1 * 60 + 40;
              const x2 = col2 * 60 + 40;
              const y2 = row2 * 60 + 40;

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={verified ? '#4ade80' : '#c084fc'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="transition-all duration-200"
                  style={{
                    filter: verified
                      ? 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.6))'
                      : 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.6))',
                  }}
                />
              );
            })}
          </svg>
        )}
      </div>

      <p className="text-xs text-center text-gray-500 mt-4">
        {verified ? 'Access granted!' : 'Connect at least 4 dots to create your pattern'}
      </p>
    </div>
  );
};

export default BiometricVerification;
