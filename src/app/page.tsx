"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Sprite, Stage } from "@pixi/react";
import Cell from "./Components/Cell";
import Crosshair from "./Components/Crosshair";
import { useState } from "react";

// UUID Import
import {v4 as uuidv4} from 'uuid';
import Square from "./Components/Square";
import Point from "./Components/Point";

interface PageProps {
  image: HTMLImageElement;
}

export default function Home(page: PageProps) {

  const 
    [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 }),
    [drawPosition, setDrawPosition] = useState({ x: 0, y: 0 }),
    [drawActive, setDrawActive] = useState(false),


  /** Native:
   *   let app = new Application<HTMLCanvasElement>({ width: 640, height: 360 });
   *   document.body.appendChild(app.view as HTMLCanvasElement);
   */

    // Utillity Function
    getRandomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    },

    // npm install @types/pixi.js
    handleMouseMove = (event: any) => {
      const interaktionElement = document.getElementById("interaktion");

      if(interaktionElement) {
        const { clientX, clientY } = event;
        const rect = interaktionElement.getBoundingClientRect();
        
        const relativeX = clientX - rect.left;
        const relativeY = clientY - rect.top;

        //Not responsive yet -> 1/2*PNG Maße müssen subrahiert werden
        setCrosshairPosition({ x: relativeX-88, y: relativeY-108 });
        setDrawPosition({x: relativeX, y: relativeY})
      }
    },

    handleCellAliveChange = (value: boolean) => {
      // Do something in the parent component when alive changes
      console.log("Cell alive value changed to:", value);
    },

    handleMausDown = () => {
      setDrawActive(true);
    },
  
    handleMausUp = () => {
      setDrawActive(false);
    };

  const cells:number = 5;

  //HTML
  return (
    <main className={styles.main}>
      <h1>Strahlenterapie Interaktion</h1>

      <div className={styles.interaktion} id="interaktion" onMouseMove={handleMouseMove} onMouseDown={handleMausDown} onMouseUp={handleMausUp}>
        
        <Stage width={600} height={600}>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>
          <Cell i={getRandomInRange(1, 10)} onAliveChange={handleCellAliveChange} uuid={uuidv4()}/>

          <Sprite
          image="./cell.png"
          x={200}
          y={200}
          scale={0.5}
          />
          
          <Point pos={drawPosition} drawActive={drawActive}/>
          <Crosshair pos={crosshairPosition}/>
        </Stage>

      </div>

    </main>
  );
}
