'use client';
import { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const FlowerCanvas = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const petalsRef = useRef([] as any[]);
  const [petals, setPetals] = useState([] as any[]);
  const { height, width } = useWindowDimensions();
  const numberOfPetals = 200;
  //console.log('Flower canvas rerenderd');
  //console.log('Render petals', petals);

  const animate = (time:any) => {
    const canvas = canvasRef.current as any;
    // @ts-ignore
    const context = canvas.getContext('2d');
    // @ts-ignore
    context.clearRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    image.src = '/petal.png';
    let newPetals = petalsRef.current.map((petal) => {
      const newPetal = { ...petal };
      if(petal.x > canvas.width || petal.y > canvas.height) {
        newPetal.x = -image.width;
        newPetal.y = (Math.random() * canvas.height * 2) - canvas.height;
        newPetal.xSpeed = 1.5 + Math.random() * 2;
        newPetal.ySpeed = 1 + Math.random();
        newPetal.flip = Math.random();
      } else {
        newPetal.x = petal.x + petal.xSpeed;
        newPetal.y = petal.y + petal.ySpeed;
        newPetal.flip = petal.flip + petal.flipSpeed;
      }
      return {
        ...newPetal,
      };
    });
    newPetals.forEach((petal:any, idx: number) => {
      context.globalAlpha = petal.opacity;
      context.drawImage(
        image,
        petal.x,
        petal.y,
        petal.w * (0.6 + (Math.abs(Math.cos(petal.flip)) / 3)),
        petal.h * (0.8 + (Math.abs(Math.cos(petal.flip)) / 5))
      );
    });
    petalsRef.current = newPetals;
    // The 'state' will always be the initial value here
    // @ts-ignore
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current as any;
    let newPetals = [] as any[];
    for(let i = 0; i < numberOfPetals; i++) {
      const w = 25 + Math.random() * 15;
      newPetals.push({
        x: Math.random() * canvas.width,
        y: (Math.random() * canvas.height * 2) - canvas.height,
        w,
        h: 20 + Math.random() * 10,
        opacity: w / 40,
        flip: Math.random(),
        xSpeed: 1.5 + Math.random() * 2,
        ySpeed: 1 + Math.random(),
        flipSpeed: Math.random() * 0.03,
      });
    }
    petalsRef.current = newPetals;
    // @ts-ignore
    requestRef.current = requestAnimationFrame(animate);
    // @ts-ignore
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once


  return (
    <canvas ref={canvasRef} className={'fixed top-0 left-0 z-0'} width={width} height={height}></canvas>
  );
};

export default FlowerCanvas;
