import { useEffect, useRef } from "react";
import isBrowser from "../utils/isBowser";

export interface Options {
  restoreOnUnmount?: boolean;
}

const useBrowserTitle = (title: string, options: Options = {}) => {
  const { restoreOnUnmount = false } = options;
  const prevTitleRef = useRef(document.title);

  document.title = title;

  useEffect(() => {
    if (restoreOnUnmount) {
      return () => {
        document.title = prevTitleRef.current;
      };
    }
  }, []);
};

const useNonBrowserTitle = (_title: string) => {
  // do nothing if it's not in a browser
  return;
};

const useTitle = isBrowser ? useBrowserTitle : useNonBrowserTitle;

export default useTitle;
