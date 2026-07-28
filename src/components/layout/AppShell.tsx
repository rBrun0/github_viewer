import { MoonIcon, SunIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme";

export function AppShell() {
	const { isDark, setTheme } = useTheme();

	return (
		<div className="flex min-h-svh flex-col bg-background text-foreground">
			<header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-sm">
				<div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-4 px-4">
					<Link
						to="/"
						className="font-heading text-sm font-medium tracking-tight"
					>
						GitHub Viewer
					</Link>

					<div className="flex items-center gap-2">
						<SunIcon className="size-3.5 text-muted-foreground" />
						<Switch
							checked={isDark}
							onCheckedChange={(checked) =>
								setTheme(checked ? "dark" : "light")
							}
							aria-label="Alternar tema escuro"
						/>
						<MoonIcon className="size-3.5 text-muted-foreground" />
						<Label className="sr-only">Tema escuro</Label>
					</div>
				</div>
			</header>

			<main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
				<Outlet />
			</main>

			<ScrollToTopButton />
		</div>
	);
}
