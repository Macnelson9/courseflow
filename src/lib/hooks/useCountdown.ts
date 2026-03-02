"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(initialSeconds: number, onDone: () => void | Promise<void>) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (seconds <= 0) {
      void onDoneRef.current();
      return;
    }

    const timer = window.setTimeout(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [seconds]);

  const reset = useCallback((value = initialSeconds) => {
    setSeconds(value);
  }, [initialSeconds]);

  return { seconds, reset };
}
