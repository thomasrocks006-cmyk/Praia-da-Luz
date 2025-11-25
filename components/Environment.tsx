import React from 'react';
import * as THREE from 'three';

export const Environment: React.FC = () => {
  const groundMat = new THREE.MeshStandardMaterial({ color: '#2d3326', roughness: 1 }); // Dark grass
  const pathMat = new THREE.MeshStandardMaterial({ color: '#5e5a51', roughness: 0.9 }); // Paving
  const roadMat = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.6 }); // Asphalt
  const waterMat = new THREE.MeshPhysicalMaterial({ color: '#006699', transmission: 0.6, roughness: 0.2 });

  return (
    <group>
      {/* --- GROUND PLANE --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <primitive object={groundMat} />
      </mesh>

      {/* --- RUA DR AGOSTINHO DA SILVA (The Street) --- */}
      {/* Runs along the North side of Block 5 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -42]} receiveShadow>
        <planeGeometry args={[200, 8]} />
        <primitive object={roadMat} />
      </mesh>
      {/* Sidewalk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -37]} receiveShadow>
        <planeGeometry args={[200, 2]} />
        <primitive object={pathMat} />
      </mesh>


      {/* --- THE POOL AREA --- */}
      <group position={[0, 0.1, 0]}>
        {/* Pool Deck */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[15, 32]} />
            <primitive object={pathMat} />
        </mesh>
        {/* The Water */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
            <circleGeometry args={[10, 32]} />
            <primitive object={waterMat} />
        </mesh>
      </group>


      {/* --- THE TAPAS BAR --- */}
      {/* Situated South-East relative to Block 5 */}
      <group position={[15, 0, 35]}>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} receiveShadow>
            <boxGeometry args={[20, 15, 0.2]} />
            <primitive object={pathMat} />
        </mesh>
        {/* Roof Structure (Open air but covered) */}
        <mesh position={[0, 3.5, 0]} castShadow>
            <boxGeometry args={[22, 0.2, 17]} />
            <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Columns */}
        {[[-9, -7], [9, -7], [-9, 7], [9, 7]].map((pos, i) => (
            <mesh key={i} position={[pos[0], 1.75, pos[1]]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 3.5]} />
                <meshStandardMaterial color="#ddccaa" />
            </mesh>
        ))}
        {/* Table Placeholder */}
        <mesh position={[0, 0.5, 0]} castShadow>
             <cylinderGeometry args={[1, 1, 0.8]} />
             <meshStandardMaterial color="#fff" />
        </mesh>
      </group>


      {/* --- VEGETATION BLOCKERS --- */}
      {/* Hedges are critical as they blocked sightlines */}
      {/* Hedge between Tapas and Pool */}
      <mesh position={[10, 1, 25]} castShadow>
         <boxGeometry args={[20, 2, 1]} />
         <meshStandardMaterial color="#1a3300" />
      </mesh>
      
      {/* Garden separating Block 5 from Pool */}
      <mesh position={[-15, 0.5, -20]} castShadow>
         <boxGeometry args={[40, 1, 8]} />
         <meshStandardMaterial color="#2d3326" />
      </mesh>

    </group>
  );
};