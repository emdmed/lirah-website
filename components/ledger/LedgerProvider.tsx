"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  CHOSEN,
  DEMO_TAB,
  TAB_TOKENS,
  NEXT_DETAIL,
  NEXT_MODE,
  exploreTokens,
  hasDetail,
  selectionTokens,
  type Detail,
  type Selection,
} from "./demoSession";

// The page is one workspace around one demo session. The hero replica, the
// sticky status-bar meter and every section after it read and change it.

export type Scene = "explore" | "explicit";

interface Ledger {
  scene: Scene;
  /** Files the exploring agent has read so far. */
  readCount: number;
  selection: Selection;
  compact: boolean;
  tokens: number;
  /** The workspace tab the status-bar meter is showing. */
  tab: string;
  /** Context of the tab the meter shows. */
  meterTokens: number;
  sandbox: boolean;
  setTab: (name: string) => void;
  setSandbox: (on: boolean) => void;
  setScene: (s: Scene) => void;
  setReadCount: (n: number) => void;
  toggleFile: (path: string) => void;
  cycleMode: (path: string) => void;
  cycleDetail: (path: string) => void;
  setDetail: (path: string, d: Detail) => void;
  setCompact: (on: boolean) => void;
  reset: () => void;
}

const LedgerContext = createContext<Ledger | null>(null);

export function useLedger() {
  return useContext(LedgerContext);
}

export function LedgerProvider({ children }: { children: React.ReactNode }) {
  const [scene, setSceneState] = useState<Scene>("explore");
  const [readCount, setReadCount] = useState(0);
  const [selection, setSelection] = useState<Selection>(CHOSEN);
  const [compact, setCompactState] = useState(false);
  const [tab, setTab] = useState(DEMO_TAB);
  const [sandbox, setSandbox] = useState(true);

  // Touching the demo session brings the meter back to its tab.
  const setScene = useCallback((s: Scene) => {
    setSceneState(s);
    setTab(DEMO_TAB);
  }, []);

  const setCompact = useCallback((on: boolean) => {
    setCompactState(on);
    setTab(DEMO_TAB);
  }, []);

  const toggleFile = useCallback((path: string) => {
    setScene("explicit");
    setSelection((s) => {
      if (s[path]) {
        const next = { ...s };
        delete next[path];
        return next;
      }
      return { ...s, [path]: { mode: "read", detail: hasDetail(path) ? "sig" : "full" } };
    });
  }, [setScene]);

  const cycleMode = useCallback((path: string) => {
    setTab(DEMO_TAB);
    setSelection((s) => (s[path] ? { ...s, [path]: { ...s[path], mode: NEXT_MODE[s[path].mode] } } : s));
  }, []);

  const cycleDetail = useCallback((path: string) => {
    setTab(DEMO_TAB);
    setSelection((s) => (s[path] ? { ...s, [path]: { ...s[path], detail: NEXT_DETAIL[s[path].detail] } } : s));
  }, []);

  const setDetail = useCallback((path: string, detail: Detail) => {
    setScene("explicit");
    setSelection((s) => ({ ...s, [path]: { mode: s[path]?.mode ?? "read", detail } }));
  }, [setScene]);

  const reset = useCallback(() => {
    setSelection(CHOSEN);
    setCompact(false);
  }, [setCompact]);

  const tokens = scene === "explore" ? exploreTokens(readCount) : selectionTokens(selection, compact);
  const meterTokens = tab === DEMO_TAB ? tokens : (TAB_TOKENS[tab] ?? 0);

  const value = useMemo<Ledger>(
    () => ({
      scene,
      readCount,
      selection,
      compact,
      tokens,
      tab,
      meterTokens,
      sandbox,
      setTab,
      setSandbox,
      setScene,
      setReadCount,
      toggleFile,
      cycleMode,
      cycleDetail,
      setDetail,
      setCompact,
      reset,
    }),
    [
      scene,
      readCount,
      selection,
      compact,
      tokens,
      tab,
      meterTokens,
      sandbox,
      setScene,
      setCompact,
      toggleFile,
      cycleMode,
      cycleDetail,
      setDetail,
      reset,
    ],
  );

  return <LedgerContext.Provider value={value}>{children}</LedgerContext.Provider>;
}
