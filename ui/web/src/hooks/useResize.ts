import { useEffect } from 'react';

export function useResize(onResize: () => void) {
  useEffect(() => {
    addEventListener('resize', onResize);

    return function cleanUp() {
      removeEventListener('resize', onResize);
    };
  }, [onResize]);
}
