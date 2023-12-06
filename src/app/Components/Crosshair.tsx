"use client";

import Image from "next/image";
import styles from "./crosshair.module.css";
import { Sprite, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";

interface CrosshairProps {
    pos: { x: number; y: number; }; 
  }

export default function Crosshair(props: CrosshairProps) {

  //HTML
  return (
    <Sprite
      image="./Crosshair.png"
      x={props.pos.x}
      y={props.pos.y}
      scale={0.15}
    />
  );
}
