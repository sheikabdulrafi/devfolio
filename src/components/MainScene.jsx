import { Canvas } from "@react-three/fiber";
import React from "react";
import Avatar from "./individuals/Avatar";
import "../Style.scss";

const MainScene = () => {
  return (
    <Canvas style={{ width: "100%", height: "100vh" }}>
      <ambientLight intensity={1.5} />
      <Avatar />
    </Canvas>
  );
};

export default MainScene;
