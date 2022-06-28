import React, { useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/bunny.gltf");

  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 20, 20]} intensity={0.6} />
      <spotLight position={[1000, 2000, 0]} intensity={0.1} />
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bunny.geometry}
          material={materials["Default OBJ"]}
        />
      </group>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

useGLTF.preload("/models/bunny.gltf");
