'use client';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Group } from 'three';          // 👈 DODANE
import './SommelierSection.css';

interface SommelierSectionProps {
  wineName?: string;
  shortDescription?: string;
}

type WineBottleProps = {
  hovered: boolean;
  onHoverChange: (value: boolean) => void;
};

const WineBottle: React.FC<WineBottleProps> = ({ hovered, onHoverChange }) => {
  const groupRef = useRef<Group | null>(null);   // 👈 ZAMIANA THREE.Group -> Group

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // delikatny obrót + „oddychanie”
    groupRef.current.rotation.y += delta * 0.25;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;

    const targetScale = hovered ? 1.06 : 1;
    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.15;
    groupRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => onHoverChange(true)}
      onPointerOut={() => onHoverChange(false)}
    >
      {/* Korpus butelki */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.27, 2.4, 40]} />
        <meshPhysicalMaterial
          color="#2b0f0c"
          roughness={0.35}
          metalness={0.15}
          transmission={0.02}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Szyjka */}
      <mesh castShadow position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 32]} />
        <meshPhysicalMaterial color="#1c0907" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Korek */}
      <mesh castShadow position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.25, 24]} />
        <meshStandardMaterial color="#b07b53" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Etykieta */}
      <mesh castShadow position={[0, 0.2, 0.34]}>
        <planeGeometry args={[0.65, 0.9]} />
        <meshStandardMaterial
          color="#f5f1e9"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

const SommelierSection: React.FC<SommelierSectionProps> = ({
  wineName = 'Sote',
  shortDescription = 'Czerwone, półwytrawne. Lokalny akcent z Wielkopolski.',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`sommelier-section ${
        isHovered ? 'sommelier-section--hovered' : ''
      }`}
    >
      <div className="sommelier-inner">
        <header className="sommelier-header">
          <p className="sommelier-kicker">Sommelier poleca</p>
          <h2 className="sommelier-title">W tym miesiącu w kieliszkach</h2>
        </header>

        <div className="sommelier-stage">
          {/* Latające słowa */}
          <div className="sommelier-floating-word sommelier-floating-word--cherry">
            WIŚNIA
          </div>
          <div className="sommelier-floating-word sommelier-floating-word--oak">
            DĄB
          </div>
          <div className="sommelier-floating-word sommelier-floating-word--chocolate">
            CZEKOLADA
          </div>
          <div className="sommelier-floating-word sommelier-floating-word--poland">
            POLSKA
          </div>

          {/* Canvas 3D */}
          <div className="sommelier-3d-container">
            <Canvas
              camera={{ position: [0, 1.2, 4], fov: 35 }}
              shadows
              gl={{ antialias: true }}
            >
              <color attach="background" args={['transparent']} />

              <ambientLight intensity={0.45} />
              <directionalLight
                intensity={1.1}
                position={[3, 6, 6]}
                castShadow
              />
              <spotLight
                intensity={0.9}
                position={[-4, 6, 4]}
                angle={0.5}
                penumbra={0.4}
                castShadow
              />

              {/* „półka” */}
              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.3, 0]}
                receiveShadow
              >
                <circleGeometry args={[3.2, 64]} />
                <meshStandardMaterial
                  color="#1f0c09"
                  roughness={0.95}
                  metalness={0.05}
                />
              </mesh>

              <WineBottle hovered={isHovered} onHoverChange={setIsHovered} />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.4}
                maxPolarAngle={Math.PI / 1.7}
                rotateSpeed={0.5}
              />
            </Canvas>
          </div>

          {/* Karta opisu */}
          <div
            className={`sommelier-card ${
              isHovered ? 'sommelier-card--visible' : ''
            }`}
          >
            <div className="sommelier-card-tagline">Wino miesiąca</div>
            <h3 className="sommelier-card-name">{wineName}</h3>
            <p className="sommelier-card-description">{shortDescription}</p>
          </div>
        </div>

        <p className="sommelier-disclaimer">
          Spożywanie alkoholu jest dozwolone wyłącznie dla osób pełnoletnich.
          Pij odpowiedzialnie.
        </p>
      </div>
    </section>
  );
};

export default SommelierSection;
