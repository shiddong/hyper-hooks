import { useEffect } from "react";

function useMount(fn: () => any) {
  useEffect(() => {
    fn();
  }, []);
}

export default useMount;
