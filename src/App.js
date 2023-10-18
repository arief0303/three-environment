import './App.css';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, GizmoHelper, GizmoViewport, SoftShadows, PivotControls, useGLTF, Center } from '@react-three/drei'

function App() {
  return (
    <div id="canvas-container" className='h-screen w-screen'>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 30 }}>
        <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
        </directionalLight>

        <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
        <pointLight position={[0, -10, 0]} intensity={1} />
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[0, 5, 0]} />
        <SoftShadows />
        <fog attach="fog" args={["white", 0, 40]} />

        <OrbitControls makeDefault />
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>

        <group position={[0, 0, 0]}>
          <PivotControls rotation={[0, -Math.PI / 2, 0]} anchor={[1, -1, -1]} scale={75} depthTest={false} fixed lineWidth={2}>
            <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial />
            </mesh>
          </PivotControls>

          <PivotControls anchor={[1, 1, 1]} rotation={[Math.PI, -Math.PI / 2, 0]} scale={0.75}>
            <Center top scale={1.5} position={[1, 0, -1]}>
              <Cup />
            </Center>
          </PivotControls>

          <mesh scale={20} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry />
            <shadowMaterial transparent opacity={0.5} />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}

function Cup(props) {
  const { nodes, materials } = useGLTF('/coffee-transformed.glb')
  return (
    <mesh
      receiveShadow
      castShadow
      geometry={nodes.coffee_cup_top_16oz.geometry}
      material={materials['13 - Default']}
      {...props}
      dispose={null}
    />
  )
}

export default App;

