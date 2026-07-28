import { useDeferredValue, useMemo } from "react";

import type { GitHubRepository } from "@/core/interfaces/github.interface";
import { filterAndSortRepos, type RepoFiltersState } from "@/lib/repo-filters";

export function useSortedFilteredRepos(
	repos: GitHubRepository[],
	filters: RepoFiltersState,
) {
	const deferredQuery = useDeferredValue(filters.query);

	return useMemo(
		() =>
			filterAndSortRepos(repos, {
				...filters,
				query: deferredQuery,
			}),
		[repos, filters, deferredQuery],
	);
}
