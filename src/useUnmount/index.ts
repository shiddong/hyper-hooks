import { useEffect } from "react";
import useLatest from "../useLatest";

const useUnmount = (fn: () => any) => {
  // the callback function may update while re-render
  // use the latest callback function that should be called rightly
  const fnRef = useLatest(fn);

  useEffect(() => {
    return () => fnRef.current();
  });
};

export default useUnmount;
