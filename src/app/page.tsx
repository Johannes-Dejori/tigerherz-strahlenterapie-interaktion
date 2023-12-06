"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Stage } from "@pixi/react";
import Cell from "./Components/Cell";
import Crosshair from "./Components/Crosshair";
import { useState } from "react";

// UUID Import
import {v4 as uuidv4} from 'uuid';

interface PageProps {
  image: HTMLImageElement;
}

export default function Home(page: PageProps) {
  const [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 });


  /** Native:
   *   let app = new Application<HTMLCanvasElement>({ width: 640, height: 360 });
   *   document.body.appendChild(app.view as HTMLCanvasElement);
   */

  // Utillity Function
  const getRandomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  // npm install @types/pixi.js
  const handleMouseMove = (event: any) => {
    const interaktionElement = document.getElementById("interaktion");

    if(interaktionElement) {
      const { clientX, clientY } = event;
      const rect = interaktionElement.getBoundingClientRect();
      
      //Not responsive yet -> 1/2*PNG Maße müssen subrahiert werden
      const relativeX = clientX - rect.left - 88;
      const relativeY = clientY - rect.top - 108;
      setCrosshairPosition({ x: relativeX, y: relativeY });
    }
  };

  const handleCellAliveChange = (value: boolean) => {
    // Do something in the parent component when alive changes
    console.log("Cell alive value changed to:", value);
  };

  const cells:number = 5;



  //HTML
  return (
    <main className={styles.main}>
      <h1>Strahlenterapie Interaktion</h1>
      <div className={styles.interaktion} id="interaktion" onMouseMove={handleMouseMove}>
        
        <Stage width={600} height={600}>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Crosshair pos={crosshairPosition}/>
        </Stage>

      </div>
    </main>
  );
}
