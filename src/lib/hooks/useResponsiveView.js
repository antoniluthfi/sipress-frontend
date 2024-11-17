import { useEffect, useState } from 'react';

export default function useResponsiveView() {
  const [viewType, setViewType] = useState('desktop'); // 'mobile' | 'tablet' | 'desktop'

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setViewType('mobile');
      } else if (width < 1024) {
        setViewType('tablet');
      } else {
        setViewType('desktop');
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewType;
};
