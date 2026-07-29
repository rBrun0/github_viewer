import { useEffect, useState } from "react";

type UseElementOutOfViewOptions = {
	/** Offset do topo (ex.: altura do header sticky) */
	rootMarginTop?: number;
};

export function useElementOutOfView({
	rootMarginTop = 56,
}: UseElementOutOfViewOptions = {}) {
	const [element, setElement] = useState<HTMLDivElement | null>(null);
	const [outOfView, setOutOfView] = useState(false);

	useEffect(() => {
		if (!element) {
			setOutOfView(false);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry) return;
				setOutOfView(!entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: `-${rootMarginTop}px 0px 0px 0px`,
				threshold: 0,
			},
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [element, rootMarginTop]);

	return { ref: setElement, outOfView };
}
