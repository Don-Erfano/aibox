import { useEffect, useState } from 'react';

export const useIsLargeView = (breakpoint = 1024) => {
  const [isLargeView, setIsLargeView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeView(window.innerWidth >= breakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isLargeView;
};
