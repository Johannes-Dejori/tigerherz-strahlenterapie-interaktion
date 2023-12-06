"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Sprite, render, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';

// Wichtiger Import!
import "@pixi/events";

interface CellProps {
  uuid: string;
  i: number;
  onAliveChange: (value: boolean) => void; // Callback function
}

export default function Cell(props: CellProps) {
  const alive = useRef(true),
    iRef = useRef(props.i),
    scale = useRef(0.2),

    scaleState = useRef(false),
    pressState = useRef(false),

    [x, setX] = useState(0),
    [y, setY] = useState(0),

    handleAliveChange = (value: boolean) => {
      alive.current = value;
      props.onAliveChange(value); // Notify the parent component about the change
    },

    handleMouseDown = () => {
      pressState.current = true;
    },
  
    handleMouseUp = () => {
      pressState.current = false;
    },
  
    handleMouseOver = () => {
      scaleState.current = true;
    },
  
    handleMouseOut = () => {
      scaleState.current = false;
    }

  // Draw Loop
  useTick((delta) => {
    iRef.current += 0.001;

    setX(Math.sin(iRef.current) * 250 + 250);
    setY(Math.sin(iRef.current / 1.5) * 250 + 250);

    if (scaleState.current && pressState.current) {
      if (scale.current > 0.06) {
        scale.current -= 0.005;
      } else {
        scale.current = 0;
        handleAliveChange(false)
      }
    }
  });

  //HTML
  return (
    <Sprite
      image="./cell.png"
      x={x}
      y={y}
      scale={scale.current}

      // Wichtige Property
      interactive={true}

      // Handles MousePress
      pointerdown={handleMouseDown}
      pointerup={handleMouseUp}
      
      // Handles MouseOver
      pointerover={handleMouseOver}
      pointerout={handleMouseOut}
    />
  );
}
