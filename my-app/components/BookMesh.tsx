'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { BookData } from '../lib/bookTypes';
import {
  createBackCoverTexture,
  createPageTexture,
  createFrontCoverTexture,
  createInnerRightPageTexture,
  createShadowTexture,
} from '../lib/bookTextures';

type BookMeshProps = {
  bookData: BookData;
  reducedMotion?: boolean;
};

const BookMesh: React.FC<BookMeshProps> = ({ bookData, reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const coverGroupRef = useRef<THREE.Group>(null!);

  const [hovered, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  const [backTexture, setBackTexture] = useState<THREE.CanvasTexture | null>(null);
  const [frontTexture, setFrontTexture] = useState<THREE.CanvasTexture | null>(null);
  const [rightInnerTexture, setRightInnerTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    createBackCoverTexture(bookData.description).then(setBackTexture);
  }, [bookData.description]);

  useEffect(() => {
    createFrontCoverTexture(
      bookData.title,
      bookData.author,
      bookData.color
    ).then(setFrontTexture);
  }, [bookData.title, bookData.author, bookData.color]);

  useEffect(() => {
    const heading = '...';
    const dateLine = '...';
    const placeLine = '...';
    const note = '...';
    createInnerRightPageTexture(heading, dateLine, placeLine, note).then(setRightInnerTexture);
  }, []);

  const pageTexture = useMemo(() => createPageTexture(), []);
  const shadowTexture = useMemo(() => createShadowTexture(), []);

  const width = 3.2;
  const height = 4.8;
  const depth = 0.5;
  const coverThickness = 0.05;

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.set(-0.1, 0, 0);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const coverGroup = coverGroupRef.current;
    if (!group || !coverGroup) return;

    const time = state.clock.getElapsedTime();

    let targetRotationY = 0;
    let targetRotationX = -0.1;
    let targetZ = 0;
    let targetY = 0;

    if (isOpen) {
        targetRotationY = 0; 
        targetRotationX = 0.05; 
        targetZ = 0; 
    } else if (hovered) {
        targetRotationY = 0.3;
        targetRotationX = -0.15;
        targetZ = 0.5;
        targetY = 0.2;
    } else {
        if (!reducedMotion) {
            targetRotationY = Math.sin(time * 0.3) * 0.1;
            targetY = Math.sin(time * 0.5) * 0.1;
        }
    }

    const damp = 4 * delta;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotationY, damp);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotationX, damp);
    group.position.z = THREE.MathUtils.lerp(group.position.z, targetZ, damp);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, damp);

    const openTarget = isOpen ? -Math.PI * 0.9 : 0;
    
    coverGroup.rotation.y = THREE.MathUtils.lerp(
      coverGroup.rotation.y,
      openTarget,
      reducedMotion ? 10 * delta : 5 * delta
    );
  });

  const handleToggle = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  if (!backTexture || !frontTexture || !pageTexture || !shadowTexture || !rightInnerTexture) {
    return null;
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={handleToggle}
    >
  
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} receiveShadow>
        <planeGeometry args={[width * 2, depth * 10]} />
        <meshBasicMaterial map={shadowTexture} transparent opacity={0.4} depthWrite={false} />
      </mesh>
      <group position={[0, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, height, depth]} />
          
          <meshStandardMaterial attach="material-0" map={pageTexture} roughness={0.9} />
          <meshStandardMaterial attach="material-1" color={bookData.color} roughness={0.8} metalness={0.1} />
          <meshStandardMaterial attach="material-2" map={pageTexture} roughness={0.9} />
          <meshStandardMaterial attach="material-3" map={pageTexture} roughness={0.9} />
          
          <meshStandardMaterial 
            attach="material-4" 
            map={rightInnerTexture} 
            roughness={0.8} 
            metalness={0.0}
            color="#fff"
            emissive="#fff"
            emissiveIntensity={0.1} 
          />
          
          <meshStandardMaterial 
            attach="material-5" 
            map={backTexture} 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>
      </group>

      <group 
        ref={coverGroupRef} 
        position={[-width / 2, 0, depth / 2]} 
      >
        <mesh 
          position={[width / 2, 0, coverThickness / 2]} 
          castShadow 
          receiveShadow={false}
        >
          <boxGeometry args={[width, height, coverThickness]} />
          
          <meshStandardMaterial attach="material-0" map={pageTexture} color="#eee" />
          <meshStandardMaterial attach="material-1" map={pageTexture} color="#eee" />
          <meshStandardMaterial attach="material-2" map={pageTexture} color="#eee" />
          <meshStandardMaterial attach="material-3" map={pageTexture} color="#eee" />

          <meshStandardMaterial 
            attach="material-4" 
            map={frontTexture} 
            roughness={0.4} 
            metalness={0.1}
          />

          <meshStandardMaterial 
            attach="material-5" 
            map={pageTexture} 
            roughness={0.9}
            metalness={0.0} 
            color="#fffdf5" 
            emissive="#fffdf5"
            emissiveIntensity={0.05}
          />
        </mesh>
      </group>
    </group>
  );
};

export default BookMesh;