import { useEffect, useState } from "react";
import useDebounce from "../useDebounce";

function useDebounceValue<T>(
  value: T,
  wait: number // milliseconds
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const update = useDebounce((updatedValue) => {
    setDebouncedValue(updatedValue);
  }, wait);

  useEffect(() => {
    update(value);
  }, [value]);

  return debouncedValue;
}

export default useDebounceValue;
