import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  useTexture,
  Html,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { useCustomization } from "./Configurator";

const Model = ({ url }: { url: string }) => {
  const { state } = useCustomization();
  const { scene } = useGLTF(url);
  const texture = useTexture(state.fabric.textureUrl);
  
  // Clone the scene to avoid mutating the cached version
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  
  // Memoize the material
  const material = React.useMemo(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
    }
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      color: new THREE.Color(state.fabric.color),
      roughness: 0.7,
      metalness: 0.1,
    });
  }, [texture, state.fabric.color]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, material]);

  return <primitive object={clonedScene} scale={2.5} position={[0, -2.5, 0]} />;
};

const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-white text-xs uppercase tracking-[0.3em]">Preparing Studio</span>
    </div>
  </Html>
);

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Visualizer Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#080808] text-center p-10">
          <div className="max-w-md space-y-4">
             <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-500 mb-4">
                <span className="text-2xl">!</span>
             </div>
             <h3 className="text-white font-display text-2xl uppercase tracking-tight italic">3D Rendering Offline</h3>
             <p className="text-white/40 text-xs leading-relaxed uppercase tracking-widest">
               We encountered a technical issue displaying the 3D model. Your configuration is still being saved.
             </p>
             <Button 
               variant="outline" 
               className="border-white/10 text-white/40 mt-6"
               onClick={() => window.location.reload()}
             >
               Retry Visualizer
             </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const Visualizer = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <ErrorBoundary>
        <Canvas 
          shadows 
          dpr={[1, 2]}
          gl={{ 
            preserveDrawingBuffer: true, 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <Suspense fallback={<Loader />}>
            <Model url="/models/mannequin.glb" />
            <Environment preset="studio" />
            <ContactShadows 
              position={[0, -2.5, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4.5} 
            />
          </Suspense>

          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={4}
            maxDistance={12}
            makeDefault 
          />
        </Canvas>
      </ErrorBoundary>

      {/* Floating Info Overlay */}
      <div className="absolute bottom-10 left-10 pointer-events-none">
        <div className="p-6 bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-1 font-bold">Current Vision</p>
          <h2 className="text-white font-display text-2xl italic tracking-tight uppercase">
            Spring/Summer '26
          </h2>
        </div>
      </div>
    </div>
  );
};

useGLTF.preload("/models/mannequin.glb");

export default Visualizer;
