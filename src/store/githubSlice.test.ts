import { describe, expect, it } from "vitest";
import type {
	GitHubRepository,
	GitHubUser,
} from "@/core/interfaces/github.interface";
import { fetchGitHubData } from "@/core/services/thunks";
import githubReducer, {
	clearSearch,
	setCurrentUser,
} from "@/store/githubSlice";

const mockUser: GitHubUser = {
	login: "octocat",
	id: 1,
	avatar_url: "https://example.com/a.png",
	html_url: "https://github.com/octocat",
	name: "The Octocat",
	bio: "Mascot",
	email: null,
	public_repos: 2,
	followers: 100,
	following: 10,
};

const mockRepos: GitHubRepository[] = [
	{
		id: 1,
		name: "hello",
		full_name: "octocat/hello",
		description: "demo",
		html_url: "https://github.com/octocat/hello",
		stargazers_count: 5,
		language: "JavaScript",
		updated_at: "2025-01-01T00:00:00Z",
	},
];

describe("githubSlice", () => {
	it("setCurrentUser stores lowercase username", () => {
		const state = githubReducer(undefined, setCurrentUser("OctoCat"));
		expect(state.currentUser).toBe("octocat");
	});

	it("clearSearch resets currentUser and error", () => {
		const withError = githubReducer(undefined, setCurrentUser("octocat"));
		const withReject = githubReducer(withError, {
			type: fetchGitHubData.rejected.type,
			payload: { status: 404, message: "Not Found" },
		});
		const cleared = githubReducer(withReject, clearSearch());
		expect(cleared.currentUser).toBeNull();
		expect(cleared.error).toBeNull();
	});

	it("fulfilled stores cache and prepends history", () => {
		const state = githubReducer(undefined, {
			type: fetchGitHubData.fulfilled.type,
			payload: { user: mockUser, repos: mockRepos },
			meta: { arg: "Octocat" },
		});

		expect(state.loading).toBe(false);
		expect(state.currentUser).toBe("octocat");
		expect(state.cache.octocat?.user.login).toBe("octocat");
		expect(state.cache.octocat?.repos).toHaveLength(1);
		expect(state.searchHistory[0]).toBe("octocat");
	});

	it("fulfilled keeps at most 8 users in history and drops oldest cache", () => {
		let state = githubReducer(undefined, { type: "init" });

		for (let i = 1; i <= 9; i++) {
			state = githubReducer(state, {
				type: fetchGitHubData.fulfilled.type,
				payload: {
					user: { ...mockUser, login: `user${i}`, id: i },
					repos: mockRepos,
				},
				meta: { arg: `user${i}` },
			});
		}

		expect(state.searchHistory).toHaveLength(8);
		expect(state.searchHistory[0]).toBe("user9");
		expect(state.cache.user1).toBeUndefined();
		expect(state.cache.user9).toBeDefined();
	});

	it("rejected sets error and clears loading", () => {
		const pending = githubReducer(undefined, {
			type: fetchGitHubData.pending.type,
		});
		expect(pending.loading).toBe(true);

		const rejected = githubReducer(pending, {
			type: fetchGitHubData.rejected.type,
			payload: { status: 403, message: "API rate limit exceeded" },
		});

		expect(rejected.loading).toBe(false);
		expect(rejected.error).toEqual({
			status: 403,
			message: "API rate limit exceeded",
		});
	});
});
