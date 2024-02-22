import { useEffect, useRef } from "react";

/**
 *  Custom hook to storage a previous value, it can be use to compare if a certain value has changed
 *
 */
export default function usePreviousProps(value: unknown) {
  const ref = useRef<unknown>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
