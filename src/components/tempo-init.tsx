"use client";

import { TempoDevtools } from "tempo-devtools";
import { useEffect, useState } from "react";

export function TempoInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initTempo = async () => {
      try {
        if (process.env.NEXT_PUBLIC_TEMPO && !isInitialized) {
          await TempoDevtools.init();
          setIsInitialized(true);
        }
      } catch (error) {
        console.warn("Failed to initialize Tempo devtools:", error);
      }
    };

    initTempo();
  }, [isInitialized]);

  return null;
}
