import { useEffect, useRef } from 'react';

const useIsFirstMount = () => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return isFirstMount.current;
};
export default useIsFirstMount;
