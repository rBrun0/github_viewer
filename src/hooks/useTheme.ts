import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "github-viewer-theme";

function getSystemTheme(): "light" | "dark" {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyTheme(theme: Theme) {
	const resolved = theme === "system" ? getSystemTheme() : theme;
	document.documentElement.classList.toggle("dark", resolved === "dark");
	document.documentElement.style.colorScheme = resolved;
}

function readStoredTheme(): Theme {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark" || stored === "system") {
		return stored;
	}
	return "system";
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") return "system";
		const stored = readStoredTheme();
		applyTheme(stored);
		return stored;
	});

	useEffect(() => {
		applyTheme(theme);
		localStorage.setItem(STORAGE_KEY, theme);

		if (theme !== "system") return;

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme("system");
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [theme]);

	const setTheme = useCallback((next: Theme) => {
		setThemeState(next);
	}, []);

	const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
	const isDark = resolvedTheme === "dark";

	const toggleDark = useCallback(() => {
		setThemeState((current) => {
			const resolved = current === "system" ? getSystemTheme() : current;
			return resolved === "dark" ? "light" : "dark";
		});
	}, []);

	return { theme, setTheme, isDark, toggleDark, resolvedTheme };
}
