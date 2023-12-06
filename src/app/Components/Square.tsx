'use client'

import Image from 'next/image'
import * as PIXI from 'pixi.js';
import { Graphics, useTick } from '@pixi/react';
import { useCallback, useState } from 'react';


let position = {xPos: 200, yPos: 200};

export default function Square() {

  //const app = useApp()

  const [x, setX] = useState(200)
  const [y, setY] = useState(200)  

  useTick(delta =>{
    if(position.xPos < 600){
      position.xPos += 1;
    } else {
      position.xPos = 0;
    }

    if(position.yPos < 600){
      position.yPos += 1;
    } else {
      position.yPos = 0;
    }

    setX(position.xPos)
    setY(position.yPos)
    console.log(position.xPos)
   });


  /* Drawing shapes*/
  const draw = useCallback((g) => {
    g.clear()
    g.beginFill(0x0033cc, 1) 
    g.drawRect(x, y, 50, 50)
    g.endFill()
  },[position.xPos, position.yPos]);


  //HTML
  return (
    <Graphics draw={draw}/>
  )
}
