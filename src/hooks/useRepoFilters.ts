import { useCallback, useMemo, useState } from "react";

import {
	DEFAULT_REPO_FILTERS,
	hasActiveRepoFilters,
	type RepoFiltersState,
	type RepoSortOption,
} from "@/lib/repo-filters";

export function useRepoFilters() {
	const [filters, setFilters] =
		useState<RepoFiltersState>(DEFAULT_REPO_FILTERS);

	const setQuery = useCallback((query: string) => {
		setFilters((prev) => ({ ...prev, query }));
	}, []);

	const setSort = useCallback((sort: RepoSortOption) => {
		setFilters((prev) => ({ ...prev, sort }));
	}, []);

	const setLanguage = useCallback((language: string) => {
		setFilters((prev) => ({ ...prev, language }));
	}, []);

	const setMinStars = useCallback((minStars: number) => {
		setFilters((prev) => ({ ...prev, minStars }));
	}, []);

	const setUpdatedFrom = useCallback((updatedFrom: Date | null) => {
		setFilters((prev) => ({ ...prev, updatedFrom }));
	}, []);

	const setUpdatedTo = useCallback((updatedTo: Date | null) => {
		setFilters((prev) => ({ ...prev, updatedTo }));
	}, []);

	const clearFilters = useCallback(() => {
		setFilters((prev) => ({
			...DEFAULT_REPO_FILTERS,
			sort: prev.sort,
		}));
	}, []);

	const hasActiveFilters = useMemo(
		() => hasActiveRepoFilters(filters),
		[filters],
	);

	return {
		filters,
		setQuery,
		setSort,
		setLanguage,
		setMinStars,
		setUpdatedFrom,
		setUpdatedTo,
		clearFilters,
		hasActiveFilters,
	};
}
