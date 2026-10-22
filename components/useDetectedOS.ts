"use client";

import { useSyncExternalStore } from "react";
import type { OS } from "@/lib/releases";

function detect(): OS {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  return "linux";
}

const subscribe = () => () => {};

// Linux on the server (the primary platform); the visitor's OS after hydration.
export function useDetectedOS(): OS {
  return useSyncExternalStore(subscribe, detect, () => "linux");
}
