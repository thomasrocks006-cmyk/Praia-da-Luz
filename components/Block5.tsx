import React from 'react';
import * as THREE from 'three';
import { CONSTANTS } from '../types';

interface Block5Props {
  showRoof: boolean;
  opacity?: number;
}

export const Block5: React.FC<Block5Props> = ({ showRoof, opacity = 1 }) => {
  const wallMat = new THREE.MeshStandardMaterial({ 
    color: '#eaddcf', 
    roughness: 0.8,
    transparent: opacity < 1,
    opacity: opacity 
  });
  
  const floorMat = new THREE.MeshStandardMaterial({ 
    color: '#a0a0a0', 
    roughness: 0.9 
  });

  const roofMat = new THREE.MeshStandardMaterial({ 
    color: '#8b4513', 
    roughness: 0.9 
  });

  // Block 5 is a long rectangular block containing 5A, 5B, 5C etc.
  // 5A is the corner unit on the West end.
  // Coordinates are relative to the group, which is placed in the world.

  return (
    <group position={[-15, 0, -30]}> 
      {/* --- APARTMENT 5A (The Corner Unit) --- */}
      
      {/* Floor 5A */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <primitive object={floorMat} />
      </mesh>

      {/* EXTERIOR WALLS 5A */}
      
      {/* North Wall (Street Facing - Rua Dr Agostinho) */}
      <mesh position={[0, 1.4, -5]} castShadow receiveShadow>
        <boxGeometry args={[10, 2.8, 0.3]} />
        <primitive object={wallMat} />
      </mesh>
      {/* Window Shutter/Frame Box (Placeholder for the critical window) */}
      <mesh position={[-2, 1.5, -5.2]} castShadow>
        <boxGeometry args={[1.5, 1.2, 0.2]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* South Wall (Patio Facing - Pool Side) */}
      {/* Has sliding doors */}
      <group position={[0, 1.4, 5]}>
        <mesh position={[-3, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 2.8, 0.3]} />
            <primitive object={wallMat} />
        </mesh>
        <mesh position={[3, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 2.8, 0.3]} />
            <primitive object={wallMat} />
        </mesh>
        {/* Glass Door Placeholder */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2.1, 0.1]} />
            <meshPhysicalMaterial transmission={0.5} roughness={0} color="#88ccff" transparent />
        </mesh>
      </group>

      {/* West Wall (Side / Alley / Parking entrance) */}
      <mesh position={[-5, 1.4, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 2.8, 0.3]} />
        <primitive object={wallMat} />
      </mesh>

      {/* East Wall (Shared with 5B) */}
      <mesh position={[5, 1.4, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 2.8, 0.3]} />
        <primitive object={wallMat} />
      </mesh>

      {/* INTERNAL PARTITIONS (Simplified Layout) */}
      {/* Kids Room Divider */}
      <mesh position={[-2, 1.4, -2.5]} rotation={[0, 0, 0]} castShadow>
         <boxGeometry args={[6, 2.8, 0.1]} />
         <primitive object={wallMat} />
      </mesh>


      {/* --- REST OF BLOCK 5 (5B, 5C, 5D...) --- */}
      {/* Massing model for the neighbors to provide context */}
      <mesh position={[20, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[30, 2.8, 10]} />
        <primitive object={wallMat} />
      </mesh>


      {/* --- ROOF --- */}
      {showRoof && (
        <group position={[10, 3, 0]}>
            {/* Main Roof Pitch */}
            <mesh rotation={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[52, 0.4, 11]} />
                <primitive object={roofMat} />
            </mesh>
        </group>
      )}
      
      {/* Annotation */}
      <group position={[0, 4, 0]}>
         {/* Could use Html from drei here, but keeping it pure geometry for stability */}
      </group>

    </group>
  );
};