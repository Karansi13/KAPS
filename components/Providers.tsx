"use client";

import { ThemeProvider } from "next-themes";
import { ChatProvider } from "@/context/KAPS.context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ChatProvider>{children}</ChatProvider>
    </ThemeProvider>
  );
}
