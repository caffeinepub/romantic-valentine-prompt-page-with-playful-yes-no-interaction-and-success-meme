import { useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useEvasiveButton() {
  const [position, setPosition] = useState<Position | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomPosition = useCallback((): Position => {
    if (!containerRef.current) {
      return { x: 0, y: 0 };
    }

    // Button dimensions (approximate)
    const buttonWidth = 180;
    const buttonHeight = 80;
    
    // Safe margins from edges
    const margin = 40;
    
    // Calculate safe bounds
    const minX = margin + buttonWidth / 2;
    const maxX = window.innerWidth - margin - buttonWidth / 2;
    const minY = margin + buttonHeight / 2;
    const maxY = window.innerHeight - margin - buttonHeight / 2;
    
    // Generate random position within safe bounds
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    
    return { x, y };
  }, []);

  const handlePointerEnter = useCallback(() => {
    const newPosition = getRandomPosition();
    setPosition(newPosition);
  }, [getRandomPosition]);

  const handlePointerDown = useCallback((e: React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newPosition = getRandomPosition();
    setPosition(newPosition);
  }, [getRandomPosition]);

  return {
    position,
    containerRef,
    handlePointerEnter,
    handlePointerDown,
  };
}
