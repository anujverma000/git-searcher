import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const DEFAULT_DEBOUNCE_TIMEOUT = 500;

/**
 * Debounce fast changing value.
 * The debounced value will only reflect the latest value when the hook has not been called for the specified time period.
 */
const useDebounce = (value: any, wait: number = DEFAULT_DEBOUNCE_TIMEOUT) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

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
};

export default useDebounce;
