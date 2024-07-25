import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Avatar = () => {
  const [resume, setResume] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // State to track animation playing
  const { scene, animations } = useGLTF("model/avatar.glb");
  const groupRef = useRef();
  const { actions, mixer } = useAnimations(animations, groupRef);
  console.log(actions);

  const handleClick = () => {
    if (actions && !isAnimating) {
      setIsAnimating(true); // Set animating state to true

      actions.idle.stop();

      // List of animations to choose from randomly
      const animationsToPlay = [
        "checkout",
        "dance",
        "hitonface",
        "lauging",
        "lly",
      ];

      // Randomly select an animation
      const randomAnimation =
        animationsToPlay[Math.floor(Math.random() * animationsToPlay.length)];

      if (actions[randomAnimation]) {
        actions[randomAnimation].setLoop(THREE.LoopOnce);
        actions[randomAnimation].reset().play();

        // Listen for when the randomly selected animation finishes
        mixer.addEventListener("finished", onAnimationFinished);
      }
    }
  };

  const onAnimationFinished = () => {
    setIsAnimating(false); // Set animating state to false
    setResume((prev) => prev + 1); // Update resume state to trigger useEffect
  };

  useEffect(() => {
    actions.idle.reset().play();
  }, [actions, resume]);

  return (
    <group position-y={-3} ref={groupRef} onClick={handleClick}>
      <primitive object={scene} scale={3} />
    </group>
  );
};

export default Avatar;
