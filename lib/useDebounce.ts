import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

/**
 * Debounce fast changing value.
 * The debounced value will only reflect the latest value when the hook has not been called for the specified time period.
 */
function useDebounce<T>(value: T, wait: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debouncedFn = debounce(() => setDebouncedValue(value), wait);

    debouncedFn();

    // Cancel the timeout if value changes
    // Timeout gets cleared and restarted
    return () => {
      debouncedFn.cancel();
    };
  }, [value, wait]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
