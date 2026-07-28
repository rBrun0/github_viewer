import { useAppSelector } from "@/store/hooks";

export function useCurrentGithubUser() {
	const currentUser = useAppSelector((state) => state.github.currentUser);
	const cached = useAppSelector((state) =>
		currentUser ? state.github.cache[currentUser] : undefined,
	);
	const loading = useAppSelector((state) => state.github.loading);
	const error = useAppSelector((state) => state.github.error);
	const searchHistory = useAppSelector((state) => state.github.searchHistory);

	return {
		currentUser,
		user: cached?.user ?? null,
		repos: cached?.repos ?? [],
		updatedAt: cached?.updatedAt,
		loading,
		error,
		searchHistory,
		hasCache: Boolean(cached),
	};
}
