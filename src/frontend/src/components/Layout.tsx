import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "@tanstack/react-router";
import { useTheme } from "../contexts/ThemeContext";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        theme={theme}
        toastOptions={{
          style: {
            background: "oklch(var(--surface))",
            border: "1px solid oklch(var(--border))",
            color: "oklch(var(--foreground))",
          },
        }}
      />
    </div>
  );
}
