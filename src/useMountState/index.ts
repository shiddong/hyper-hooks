import { useCallback, useEffect, useRef } from "react";

interface MountState {
  get: () => boolean;
}

function useMountState(): MountState {
  const mountStateRef = useRef<boolean>(false);
  const get = useCallback(() => mountStateRef.current, []);

  useEffect(() => {
    mountStateRef.current = true;

    return () => {
      mountStateRef.current = false;
    };
  }, []);

  return {
    get,
  };
}

export default useMountState;
