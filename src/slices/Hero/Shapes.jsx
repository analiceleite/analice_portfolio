"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0 overflow-visible">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(2.5), // Gem central 
    },
    {
      position: [0.8, -0.5, 3],
      r: 0.4,
      geometry: new THREE.TorusKnotGeometry(0.6, 0.25, 100, 16), // Nó complexo 
    },
    {
      position: [-1.2, 1.5, -3],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.2), // Dodecaedro 
    },
    {
      position: [-0.6, -0.5, 4],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.5, 0.2, 16, 32), // Donut 
    },
    {
      position: [1.3, 1.3, -3],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.2), // Diamante 
    },
    {
      position: [-1.6, -0.3, -1.5],
      r: 0.5,
      geometry: new THREE.TetrahedronGeometry(1), // Pirâmide 
    },
    {
      position: [1.8, 0.3, 1.5],
      r: 0.45,
      geometry: new THREE.SphereGeometry(0.7, 32, 32), // Esfera 
    },
  ];

  const soundEffects = [
    new Audio("/sounds/knock1.ogg"),
    new Audio("/sounds/knock2.ogg"),
    new Audio("/sounds/knock3.ogg"),
  ];

  const materials = [
    new THREE.MeshStandardMaterial({ 
      color: 0x7c3aed, // purple-600
      roughness: 0,
      metalness: 0.3,
    }), 
    new THREE.MeshStandardMaterial({ 
      color: 0x8b5cf6, // purple-500
      roughness: 0.1,
      metalness: 0.5,
    }),  
    new THREE.MeshStandardMaterial({ 
      color: 0x9333ea, // purple-600 variant
      roughness: 0.2,
      metalness: 0.4,
    }),  
    new THREE.MeshStandardMaterial({ 
      color: 0xa855f7, // purple-500 variant
      roughness: 0.15,
      metalness: 0.6,
    }),  
    new THREE.MeshStandardMaterial({ 
      color: 0x6d28d9, // purple-700
      roughness: 0.25,
      metalness: 0.3,
    }), 
    new THREE.MeshStandardMaterial({ 
      color: 0xc084fc, // purple-400
      roughness: 0.05,
      metalness: 0.7,
    }),  
    new THREE.MeshStandardMaterial({ 
      color: 0xd8b4fe, // purple-300
      roughness: 0.1,
      metalness: 0.5,
    }), 
    new THREE.MeshStandardMaterial({
      color: 0x5b21b6, // purple-800
      roughness: 0.2,
      metalness: 0.8,
    }),
  ];
  
  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      soundEffects={soundEffects}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, soundEffects, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}