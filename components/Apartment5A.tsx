import React from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface Apartment5AProps {
  showRoof: boolean;
  opacity?: number;
}

export const Apartment5A: React.FC<Apartment5AProps> = ({ showRoof, opacity = 1 }) => {
  const wallMat = new THREE.MeshStandardMaterial({ 
    color: '#eaddcf', 
    roughness: 0.8,
    transparent: opacity < 1,
    opacity: opacity 
  });
  
  const floorMat = new THREE.MeshStandardMaterial({ 
    color: '#f0f0f0', // Tiled floor
    roughness: 0.5 
  });

  const furnitureMat = new THREE.MeshStandardMaterial({ color: '#888888' });
  const bedMat = new THREE.MeshStandardMaterial({ color: '#ffffff' });
  const sofaMat = new THREE.MeshStandardMaterial({ color: '#334488' }); // Blue sofa

  // Dimensions (Approximate based on 70sqm)
  // Width: 10m, Depth: 7m
  // Origin: Bottom-Left corner of the apartment (South-West corner)
  // Coordinates relative to this origin.

  return (
    <group>
      {/* --- FLOOR --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.05, 3.5]} receiveShadow>
        <planeGeometry args={[10, 7]} />
        <primitive object={floorMat} />
      </mesh>

      {/* --- EXTERNAL WALLS --- */}
      
      {/* North Wall (Street Facing) - z=0 (relative to local, but let's say z=-3.5 is North in world space if centered) */}
      {/* Let's keep local coords: x: 0->10, z: 0->7. North is z=0, South is z=7? No, usually -z is North in 3D. */}
      {/* Let's align with World: North is -Z. */}
      {/* Apartment Extent: x: [-5, 5], z: [-3.5, 3.5] */}
      
      {/* North Wall (Street) z=-3.5 */}
      {/* Kids Window: x=2. Front Door: x=-1. Kitchen Window: x=-3 */}
      <group position={[0, 1.4, -3.5]}>
        {/* Wall Segments */}
        <mesh position={[-4, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 2.8, 0.2]} />
            <primitive object={wallMat} />
        </mesh>
        <mesh position={[0.5, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 2.8, 0.2]} />
            <primitive object={wallMat} />
        </mesh>
        <mesh position={[4, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 2.8, 0.2]} />
            <primitive object={wallMat} />
        </mesh>
        
        {/* Lintels (Above windows/doors) */}
        <mesh position={[-1.5, 1, 0]} castShadow> {/* Above Kitchen Window */}
            <boxGeometry args={[3, 0.8, 0.2]} />
            <primitive object={wallMat} />
        </mesh>
        <mesh position={[2.5, 1, 0]} castShadow> {/* Above Kids Window */}
            <boxGeometry args={[2, 0.8, 0.2]} />
            <primitive object={wallMat} />
        </mesh>
        
        {/* Kids Window Shutter Box */}
        <mesh position={[2.5, 1.2, -0.15]}>
            <boxGeometry args={[1.2, 0.3, 0.1]} />
            <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* South Wall (Patio) z=3.5 */}
      {/* Patio Doors (Living): x=-1. Master Window: x=3 */}
      <group position={[0, 1.4, 3.5]}>
         <mesh position={[-3.5, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 2.8, 0.2]} />
            <primitive object={wallMat} />
         </mesh>
         <mesh position={[1, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 2.8, 0.2]} />
            <primitive object={wallMat} />
         </mesh>
         <mesh position={[4, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 2.8, 0.2]} />
            <primitive object={wallMat} />
         </mesh>
         
         {/* Lintel Patio */}
         <mesh position={[-1, 1, 0]}>
             <boxGeometry args={[2, 0.8, 0.2]} />
             <primitive object={wallMat} />
         </mesh>
      </group>

      {/* West Wall (Side) x=-5 */}
      <mesh position={[-5, 1.4, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 2.8, 0.2]} />
        <primitive object={wallMat} />
      </mesh>

      {/* East Wall (Shared) x=5 */}
      <mesh position={[5, 1.4, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 2.8, 0.2]} />
        <primitive object={wallMat} />
      </mesh>


      {/* --- INTERNAL WALLS --- */}
      
      {/* Divider: Living/Kitchen vs Bedrooms (North-South) */}
      <mesh position={[1, 1.4, 0]} rotation={[0, Math.PI/2, 0]} castShadow>
         <boxGeometry args={[7, 2.8, 0.1]} />
         <primitive object={wallMat} />
      </mesh>

      {/* Divider: Kids Room / Master Room (East-West) */}
      <mesh position={[3, 1.4, 0]} castShadow>
         <boxGeometry args={[4, 2.8, 0.1]} />
         <primitive object={wallMat} />
      </mesh>


      {/* --- FURNITURE & DETAILS --- */}

      {/* KIDS ROOM (North-East Quadrant: x>1, z<0) */}
      <group position={[3, 0, -1.75]}>
         <Text position={[0, 2, 0]} fontSize={0.3} color="black" rotation={[-Math.PI/2, 0, 0]}>
            KIDS ROOM
         </Text>
         
         {/* Madeleine's Bed (Left wall when entering? Entering from West wall of room) */}
         {/* If door is on West wall of room (x=1), Left is North wall. */}
         {/* "Far side from window". Window is on North wall (z=-3.5). Far side is South wall of room (z=0). */}
         {/* Wait, Window is on North Wall. */}
         {/* User said: "Madeleine's bed is on the far side from the window" */}
         {/* If window is North, far side is South. */}
         <mesh position={[-1, 0.25, 1]} castShadow> {/* South-West corner of room */}
            <boxGeometry args={[0.9, 0.5, 1.9]} />
            <primitive object={bedMat} />
         </mesh>

         {/* Second Bed (Window side - North) */}
         <mesh position={[-1, 0.25, -1]} castShadow> {/* North-West corner of room */}
            <boxGeometry args={[0.9, 0.5, 1.9]} />
            <primitive object={bedMat} />
         </mesh>

         {/* Cots (Center/Right) */}
         <mesh position={[1, 0.3, 0]} castShadow>
            <boxGeometry args={[0.6, 0.6, 1]} />
            <meshStandardMaterial color="#dddddd" />
         </mesh>
      </group>

      {/* MASTER BEDROOM (South-East Quadrant: x>1, z>0) */}
      <group position={[3, 0, 1.75]}>
         <Text position={[0, 2, 0]} fontSize={0.3} color="black" rotation={[-Math.PI/2, 0, 0]}>
            MASTER
         </Text>
         {/* Double Bed */}
         <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[1.8, 0.5, 2]} />
            <primitive object={bedMat} />
         </mesh>
      </group>

      {/* LIVING ROOM (South-West Quadrant: x<1, z>0) */}
      <group position={[-2, 0, 1.75]}>
         <Text position={[0, 2, 0]} fontSize={0.3} color="black" rotation={[-Math.PI/2, 0, 0]}>
            LIVING
         </Text>
         {/* Blue Sofa (Against Window/North wall of living room? Or West wall?) */}
         {/* "Blue Sofa positioned against the window wall (facing the street/car park)" */}
         {/* If Living room is South, the "window wall facing street" might be the partition? Or maybe the layout is different. */}
         {/* Let's place it on the West wall for now. */}
         <mesh position={[-2, 0.4, 0]} castShadow>
            <boxGeometry args={[1, 0.8, 2.5]} />
            <primitive object={sofaMat} />
         </mesh>
         
         {/* Dining Table */}
         <mesh position={[1, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.8]} />
            <primitive object={furnitureMat} />
         </mesh>
      </group>

    </group>
  );
};
