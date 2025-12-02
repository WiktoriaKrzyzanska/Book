'use client';

import React from 'react';

const GrainOverlay: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 50,
      opacity: 0.05,
      mixBlendMode: 'overlay',
    }}
  >
    <svg width="100%" height="100%">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves={3}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

export default GrainOverlay;
