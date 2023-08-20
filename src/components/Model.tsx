import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { AnimationAction } from "three";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export default function Model({ refresh }: { refresh: boolean }) {
  const group = useRef();
  const { animations, scene } = useGLTF("/models/fox.glb");
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    if (actions) {
      const list: { key: string; value: AnimationAction }[] = [];
      Object.entries(actions).forEach(([key, value]) => {
        if (value) {
          value?.stop();
          list.push({
            key,
            value,
          });
        }
      });
      const random = getRandomInt(0, list.length);
      const action = list[random];
      action.value.play();
    }
  }, [actions, refresh]);

  return (
    <object3D>
      <group>
        <primitive object={scene} ref={group} />
      </group>
    </object3D>
  );
}

useGLTF.preload("/models/fox.glb");
