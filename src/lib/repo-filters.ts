import type { GitHubRepository } from "@/core/interfaces/github.interface";

export type RepoSortOption =
	| "stars-desc"
	| "stars-asc"
	| "name-asc"
	| "name-desc"
	| "updated-desc"
	| "updated-asc";

export type RepoFiltersState = {
	query: string;
	sort: RepoSortOption;
	language: string;
	minStars: number;
	updatedFrom: Date | null;
	updatedTo: Date | null;
};

export const DEFAULT_REPO_FILTERS: RepoFiltersState = {
	query: "",
	sort: "stars-desc",
	language: "all",
	minStars: 0,
	updatedFrom: null,
	updatedTo: null,
};

export const MIN_STARS_OPTIONS = [
	{ label: "Qualquer", value: "0" },
	{ label: "1+", value: "1" },
	{ label: "10+", value: "10" },
	{ label: "50+", value: "50" },
	{ label: "100+", value: "100" },
] as const;

export const SORT_OPTIONS: { label: string; value: RepoSortOption }[] = [
	{ label: "Estrelas (maior → menor)", value: "stars-desc" },
	{ label: "Estrelas (menor → maior)", value: "stars-asc" },
	{ label: "Nome (A → Z)", value: "name-asc" },
	{ label: "Nome (Z → A)", value: "name-desc" },
	{ label: "Atualização (recente)", value: "updated-desc" },
	{ label: "Atualização (antiga)", value: "updated-asc" },
];

function startOfDay(date: Date) {
	const next = new Date(date);
	next.setHours(0, 0, 0, 0);
	return next;
}

function endOfDay(date: Date) {
	const next = new Date(date);
	next.setHours(23, 59, 59, 999);
	return next;
}

export function hasActiveRepoFilters(filters: RepoFiltersState) {
	return (
		filters.query.trim().length > 0 ||
		filters.language !== "all" ||
		filters.minStars > 0 ||
		filters.updatedFrom !== null ||
		filters.updatedTo !== null
	);
}

export function getRepoLanguages(repos: GitHubRepository[]) {
	const languages = new Set<string>();
	for (const repo of repos) {
		if (repo.language) languages.add(repo.language);
	}
	return Array.from(languages).sort((a, b) => a.localeCompare(b));
}

export function filterAndSortRepos(
	repos: GitHubRepository[],
	filters: RepoFiltersState,
) {
	const query = filters.query.trim().toLowerCase();
	const fromTime = filters.updatedFrom
		? startOfDay(filters.updatedFrom).getTime()
		: null;
	const toTime = filters.updatedTo
		? endOfDay(filters.updatedTo).getTime()
		: null;

	const filtered = repos.filter((repo) => {
		if (filters.minStars > 0 && repo.stargazers_count < filters.minStars) {
			return false;
		}
		if (filters.language !== "all" && repo.language !== filters.language) {
			return false;
		}

		const updatedAt = new Date(repo.updated_at).getTime();
		if (fromTime !== null && updatedAt < fromTime) return false;
		if (toTime !== null && updatedAt > toTime) return false;

		if (!query) return true;
		const name = repo.name.toLowerCase();
		const description = (repo.description ?? "").toLowerCase();
		return name.includes(query) || description.includes(query);
	});

	const sorted = [...filtered].sort((a, b) => {
		switch (filters.sort) {
			case "stars-asc":
				return a.stargazers_count - b.stargazers_count;
			case "stars-desc":
				return b.stargazers_count - a.stargazers_count;
			case "name-asc":
				return a.name.localeCompare(b.name);
			case "name-desc":
				return b.name.localeCompare(a.name);
			case "updated-asc":
				return (
					new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
				);
			case "updated-desc":
				return (
					new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
				);
			default:
				return 0;
		}
	});

	return sorted;
}
