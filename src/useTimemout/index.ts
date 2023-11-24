import { useCallback, useEffect, useRef } from "react";
import useLatest from "../useLatest";

function useTimeout(fn: Function, wait: number = 3000) {
  const called = useRef<boolean>(false);

  const timer = useRef<number>();
  // update ref.current when callback function changes
  const fnRef = useLatest(fn);

  const isCalled = useCallback(() => called.current, []);

  const reset = useCallback(() => {
    called.current = false;

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      called.current = true;
      fnRef.current();
    }, wait);
  }, [wait]);

  const cancel = useCallback(() => {
    // if has been called, then do nothing
    if (called.current) {
      return;
    }

    clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    reset();

    return cancel;
  }, [wait]);

  return {
    isCalled,
    cancel,
    reset,
  };
}

export default useTimeout;
