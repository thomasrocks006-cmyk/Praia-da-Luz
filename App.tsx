import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Html, PerspectiveCamera } from '@react-three/drei';
import { Block5 } from './components/Block5';
import { Apartment5A } from './components/Apartment5A';
import { Environment } from './components/Environment';
import { VIEWS, CONSTANTS } from './types';
import * as THREE from 'three';

const UI: React.FC<{
  onViewChange: (viewKey: string) => void,
  toggleRoof: () => void,
  roofVisible: boolean,
  time: number,
  setTime: (t: number) => void
}> = ({ onViewChange, toggleRoof, roofVisible, time, setTime }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-6">

      {/* Header */}
      <div className="pointer-events-auto bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg max-w-md">
        <h1 className="text-xl font-bold font-mono text-amber-400 mb-1 tracking-wider">OCEAN CLUB RECONSTRUCTION</h1>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE RENDER // SCALE 1:1
        </div>
        <p className="mt-4 text-xs text-gray-300 leading-relaxed font-sans border-l-2 border-amber-400 pl-3">
          Forensic visualization of Block 5 and the Tapas Restaurant area.
          Use controls to navigate key locations and investigate sightlines.
        </p>
      </div>

      {/* Controls */}
      <div className="pointer-events-auto flex flex-col gap-4 items-end">

        {/* Viewpoints */}
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg w-64">
          <h2 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">Surveillance Feeds</h2>
          <div className="flex flex-col gap-2">
            {Object.keys(VIEWS).map((key) => (
              <button
                key={key}
                onClick={() => onViewChange(key)}
                className="text-left text-xs font-mono py-2 px-3 bg-white/5 hover:bg-white/10 hover:text-amber-400 border border-transparent hover:border-amber-400/30 transition-all rounded"
              >
                {VIEWS[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg w-64">
          <h2 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">Investigation Tools</h2>

          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-1 block">Timeline (Hour of Night)</label>
            <input
              type="range" min="18" max="26" step="0.5"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
              <span>18:00</span>
              <span className="text-amber-400">{(time % 24).toFixed(1).replace('.5', ':30').replace('.0', ':00')}</span>
              <span>02:00</span>
            </div>
          </div>

          <button
            onClick={toggleRoof}
            className={`w-full text-xs font-mono py-2 px-3 border transition-all rounded ${roofVisible ? 'bg-amber-400/20 border-amber-400 text-amber-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
          >
            TOGGLE ROOF: {roofVisible ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-[10px] text-gray-600 font-mono">
        COORD: 37°05'N 8°43'W <br />
        ELEV: 12M
      </div>
    </div>
  );
};

// Scene Controller to handle camera movements
const SceneController: React.FC<{ targetView: string }> = ({ targetView }) => {
  const view = VIEWS[targetView];

  // Smooth camera transition would go here, for now we just snap or let OrbitControls handle simple damping if manual
  return (
    <PerspectiveCamera makeDefault position={view.position as [number, number, number]} fov={50} />
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<string>('OVERVIEW');
  const [roofVisible, setRoofVisible] = useState(true);
  const [time, setTime] = useState(21.5); // 21:30

  // Calculate sun position based on time
  const sunPosition = new THREE.Vector3();
  const phi = (time - 12) / 12 * Math.PI; // Simple arc
  sunPosition.setFromSphericalCoords(100, phi, Math.PI / 4);

  const isNight = time > 20 || time < 6;

  return (
    <div className="w-full h-screen bg-black">
      <UI
        onViewChange={setCurrentView}
        toggleRoof={() => setRoofVisible(!roofVisible)}
        roofVisible={roofVisible}
        time={time}
        setTime={setTime}
      />

      <Canvas shadows dpr={[1, 2]}>
        <SceneController targetView={currentView} />

        {/* Lighting Conditions */}
        <ambientLight intensity={isNight ? 0.1 : 0.6} />
        <directionalLight
          position={isNight ? [20, 20, 10] : [sunPosition.x, sunPosition.y, sunPosition.z]}
          intensity={isNight ? 0.2 : 1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera attach="shadow-camera" args={[-50, 50, 50, -50]} />
        </directionalLight>

        {isNight && (
          <>
            <pointLight position={[8, 4, -40]} intensity={1.5} color="#ffaa00" distance={20} /> {/* Street Light */}
            <pointLight position={[15, 3, 35]} intensity={1} color="#ffffcc" distance={15} /> {/* Tapas Light */}
            <pointLight position={[-15, 3, -25]} intensity={0.5} color="#aaccee" distance={15} /> {/* Garden Light */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </>
        )}
        <Sky sunPosition={isNight ? [0, -10, 0] : [sunPosition.x, sunPosition.y, sunPosition.z]} turbidity={10} rayleigh={isNight ? 0.1 : 2} />

        <Suspense fallback={null}>
          <Environment />
          <Block5 showRoof={roofVisible} />
          <group position={[-15, 0, -30]}>
            <Apartment5A showRoof={roofVisible} />
          </group>

          {/* Markers for Context */}
          <Html position={[-15, 4, -30]} distanceFactor={15}>
            <div className="bg-black/50 text-white text-xs px-2 py-1 rounded border border-white/20 backdrop-blur-sm whitespace-nowrap">
              APT 5A
            </div>
          </Html>

          <Html position={[15, 5, 35]} distanceFactor={15}>
            <div className="bg-amber-900/50 text-amber-200 text-xs px-2 py-1 rounded border border-amber-500/20 backdrop-blur-sm whitespace-nowrap">
              TAPAS RESTAURANT
            </div>
          </Html>
        </Suspense>

        <OrbitControls
          target={VIEWS[currentView].target as [number, number, number]}
          enableDamping
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going under ground
        />
        <gridHelper args={[100, 100, 0x444444, 0x222222]} position={[0, 0.01, 0]} />
      </Canvas>
    </div>
  );
}