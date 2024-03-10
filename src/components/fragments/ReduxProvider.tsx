"use client";

import { Provider } from "react-redux";
import { AppStore, store } from "@/lib/redux/store";
import { useRef } from "react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
