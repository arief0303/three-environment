import './App.css';
import { Canvas } from '@react-three/fiber'
import { CameraControls, GizmoHelper, GizmoViewport, SoftShadows } from '@react-three/drei'

function App() {
  return (
    <div id="canvas-container" className='h-screen w-screen'>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 45 }}>
        <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
        </directionalLight>
        <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
        <pointLight position={[0, -10, 0]} intensity={1} />
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[0, 5, 0]} />
        <SoftShadows />
        <fog attach="fog" args={["white", 0, 40]} />

        <CameraControls makeDefault />
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        
        <group position={[0, 0, 0]}>
          <mesh receiveShadow castShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial transparent opacity={0.4} />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}

export default App;

