import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 320;

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY > SHOW_AFTER_PX);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<button
			type="button"
			aria-label="Voltar ao topo"
			tabIndex={visible ? 0 : -1}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			className={cn(
				"fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full",
				"border border-white/25 bg-background/45 text-foreground shadow-lg",
				"backdrop-blur-xl backdrop-saturate-150",
				"transition-all duration-300 ease-out",
				"hover:bg-background/60 hover:shadow-xl",
				"focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
				"dark:border-white/10 dark:bg-background/40 dark:hover:bg-background/55",
				visible
					? "pointer-events-auto translate-y-0 scale-100 opacity-100"
					: "pointer-events-none translate-y-2 scale-90 opacity-0",
			)}
		>
			<ArrowUpIcon className="size-4" />
		</button>
	);
}
