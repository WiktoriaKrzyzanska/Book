'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { BookData } from '../lib/bookTypes';
import BookMesh from './BookMesh';

type BookSceneProps = {
  bookData: BookData;
  reducedMotion?: boolean;
};

const BookScene: React.FC<BookSceneProps> = ({ bookData, reducedMotion }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 9.5], fov: 35 }} 
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} color="#ffffff" />
      
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      <pointLight
        position={[-5, 2, 5]}
        intensity={0.4}
        color="#ffdca8"
        distance={20}
      />
      
      <pointLight
        position={[0, 0, 3]}
        intensity={0.2}
        distance={5}
        decay={2}
      />

      <BookMesh bookData={bookData} reducedMotion={!!reducedMotion} />
    </Canvas>
  );
};

export default BookScene;