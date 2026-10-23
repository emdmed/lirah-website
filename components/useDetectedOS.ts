"use client";

import { useSyncExternalStore } from "react";
import type { OS } from "@/lib/releases";

function detect(): OS {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  return "linux";
}

// Android reports Linux and iOS reports Mac OS X, so a phone would be offered
// a desktop installer it cannot run. iPadOS asks for the desktop site; touch
// points give it away.
function detectPhone(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod|mobile/.test(ua) || (ua.includes("mac") && navigator.maxTouchPoints > 1);
}

const subscribe = () => () => {};

// Linux on the server (the primary platform); the visitor's OS after hydration.
export function useDetectedOS(): OS {
  return useSyncExternalStore(subscribe, detect, () => "linux");
}

export function useIsPhone(): boolean {
  return useSyncExternalStore(subscribe, detectPhone, () => false);
}
