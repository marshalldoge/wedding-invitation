'use client';
import { useEffect, useRef } from 'react';
import useWindowDimensions from '@/hooks/useWindowDimensions';
class Petal {

}
const FlowerCanvas = () => {
  const canvasRef = useRef(null);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const context = canvas.getContext('2d');
    //Our first draw
    context.fillStyle = 'transparent';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  return (
    <canvas ref={canvasRef} className={'fixed top-0 left-0 z-0'} width={width} height={height}></canvas>
  );
};

export default FlowerCanvas;
