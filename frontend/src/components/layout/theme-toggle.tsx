import { useTheme } from "@/lib/theme";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${theme}`}
      className="size-9 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
    >
      <Icon className="size-4" />
    </button>
  );
}
