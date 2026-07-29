import { describe, expect, it } from "vitest";
import type { GitHubRepository } from "@/core/interfaces/github.interface";
import {
	DEFAULT_REPO_FILTERS,
	filterAndSortRepos,
	getRepoLanguages,
	hasActiveRepoFilters,
} from "@/lib/repo-filters";

const repos: GitHubRepository[] = [
	{
		id: 1,
		name: "zebra",
		full_name: "u/zebra",
		description: "old project",
		html_url: "https://github.com/u/zebra",
		stargazers_count: 2,
		language: "Python",
		updated_at: "2024-01-01T00:00:00Z",
	},
	{
		id: 2,
		name: "alpha",
		full_name: "u/alpha",
		description: "typescript utils",
		html_url: "https://github.com/u/alpha",
		stargazers_count: 50,
		language: "TypeScript",
		updated_at: "2025-06-01T00:00:00Z",
	},
	{
		id: 3,
		name: "beta",
		full_name: "u/beta",
		description: null,
		html_url: "https://github.com/u/beta",
		stargazers_count: 10,
		language: "TypeScript",
		updated_at: "2025-01-01T00:00:00Z",
	},
];

describe("DEFAULT_REPO_FILTERS", () => {
	it("defaults sort to stars-desc", () => {
		expect(DEFAULT_REPO_FILTERS.sort).toBe("stars-desc");
	});
});

describe("filterAndSortRepos", () => {
	it("sorts by stars descending by default filters", () => {
		const result = filterAndSortRepos(repos, DEFAULT_REPO_FILTERS);
		expect(result.map((r) => r.name)).toEqual(["alpha", "beta", "zebra"]);
	});

	it("sorts by stars ascending", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			sort: "stars-asc",
		});
		expect(result.map((r) => r.name)).toEqual(["zebra", "beta", "alpha"]);
	});

	it("sorts by name ascending", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			sort: "name-asc",
		});
		expect(result.map((r) => r.name)).toEqual(["alpha", "beta", "zebra"]);
	});

	it("sorts by updated descending", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			sort: "updated-desc",
		});
		expect(result.map((r) => r.name)).toEqual(["alpha", "beta", "zebra"]);
	});

	it("filters by text query on name and description", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			query: "typescript",
		});
		expect(result.map((r) => r.name)).toEqual(["alpha"]);
	});

	it("filters by language", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			language: "Python",
		});
		expect(result).toHaveLength(1);
		expect(result[0]?.name).toBe("zebra");
	});

	it("filters by min stars", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			minStars: 20,
		});
		expect(result.map((r) => r.name)).toEqual(["alpha"]);
	});

	it("filters by updatedFrom", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			updatedFrom: new Date("2025-01-01"),
		});
		expect(result.map((r) => r.name)).toEqual(["alpha", "beta"]);
	});

	it("filters by updatedTo", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			updatedTo: new Date("2025-01-01"),
		});
		expect(result.map((r) => r.name)).toEqual(["beta", "zebra"]);
	});

	it("filters by updated date range", () => {
		const result = filterAndSortRepos(repos, {
			...DEFAULT_REPO_FILTERS,
			updatedFrom: new Date("2025-01-01"),
			updatedTo: new Date("2025-01-01"),
		});
		expect(result.map((r) => r.name)).toEqual(["beta"]);
	});
});

describe("hasActiveRepoFilters", () => {
	it("returns false for defaults", () => {
		expect(hasActiveRepoFilters(DEFAULT_REPO_FILTERS)).toBe(false);
	});

	it("returns true when query is set", () => {
		expect(
			hasActiveRepoFilters({ ...DEFAULT_REPO_FILTERS, query: "api" }),
		).toBe(true);
	});

	it("returns true when updatedFrom is set", () => {
		expect(
			hasActiveRepoFilters({
				...DEFAULT_REPO_FILTERS,
				updatedFrom: new Date("2025-01-01"),
			}),
		).toBe(true);
	});
});

describe("getRepoLanguages", () => {
	it("returns unique sorted languages", () => {
		expect(getRepoLanguages(repos)).toEqual(["Python", "TypeScript"]);
	});
});
