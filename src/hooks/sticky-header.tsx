import { useLayoutEffect, useState } from 'react';

export const useStickyHeader = (offset = 0) => {
  const [stick, setStick] = useState(false);

  const handleScroll = () => {
    setStick(window.scrollY >= offset);
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return stick;
};
