import { useRef } from "react";

function useDebounce<T = void>(
  fn: Function,
  wait: number = 3000,
  immediate: boolean = false
) {
  const timer = useRef<number>();
  const shouldCallImmediately = useRef<boolean>(immediate);

  return function (...args): Promise<T> {
    return new Promise((resolve) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (shouldCallImmediately.current) {
        shouldCallImmediately.current = false;

        const result: T = fn.apply(this, args);
        resolve(result);
      } else {
        timer.current = setTimeout(() => {
          const retult: T = fn.apply(this, args);
          resolve(retult);
        }, wait);
      }
    });
  };
}

export default useDebounce;
