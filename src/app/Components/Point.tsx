"use client";

import Image from "next/image";
import * as PIXI from "pixi.js";
import { Graphics, useTick } from "@pixi/react";
import { useCallback, useState } from "react";

interface SquareProps {
  pos: { x: number; y: number };
  drawActive: boolean;
}

export default function Square(props: SquareProps) {
  //const app = useApp()

  const [x, setX] = useState(props.pos.x);
  const [y, setY] = useState(props.pos.y);

  useTick((delta) => {
    setX(props.pos.x);
    setY(props.pos.y);
  });

  /* Drawing shapes*/
  const [xOld, setXOld] = useState(x);
  const [yOld, setYOld] = useState(y)

  const draw = useCallback(
    (g) => {
      if(props.drawActive){
        console.log("click");

        if( x - xOld > 10 || x - xOld < -10 || 
            y - yOld > 10 || y - yOld < -10){
          console.log("OldX: " + xOld)
          console.log("NewX: " + x)
          g.beginFill(0x0033cc, 1);
          g.drawCircle(x, y, 5);
          g.endFill(); 
          setXOld(x);
          setYOld(y);
        }
      }
    },
    [props.pos.x, props.pos.y]
  );

  //HTML
  return <Graphics draw={draw} />;
}
