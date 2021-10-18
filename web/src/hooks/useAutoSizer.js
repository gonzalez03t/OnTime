import { useEffect, useState } from 'react';

export default function useAutoSizer(ratios = { height: 1, width: 1 }) {
  function calculateSizes() {
    const { innerWidth, innerHeight } = window;
    return {
      height: innerHeight * (ratios.height ?? 1),
      width: innerWidth * (ratios.width ?? 1),
    };
  }

  const [size, setSize] = useState(calculateSizes());

  useEffect(() => {
    function handleResize() {
      setSize(calculateSizes());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
