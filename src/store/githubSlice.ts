import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { MAX_SEARCH_HISTORY } from "../core/constants/github.constants";
import type { CachedUserData } from "../core/interfaces/github.interface";
import { fetchGitHubData } from "../core/services/thunks";
import type { GithubRejectValue } from "../core/services/thunks/types";

interface GitHubState {
	cache: Record<string, CachedUserData>;
	searchHistory: string[];
	currentUser: string | null;
	loading: boolean;
	error: GithubRejectValue | null;
}

const initialState: GitHubState = {
	cache: {},
	searchHistory: [],
	currentUser: null,
	loading: false,
	error: null,
};

const githubSlice = createSlice({
	name: "github",
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<string>) => {
			state.currentUser = action.payload.toLowerCase();
		},
		clearSearch: (state) => {
			state.currentUser = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGitHubData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGitHubData.fulfilled, (state, action) => {
				state.loading = false;

				const username = action.meta.arg.toLowerCase();
				state.currentUser = username;

				state.cache[username] = {
					user: action.payload.user,
					repos: action.payload.repos,
					updatedAt: Date.now(),
				};

				state.searchHistory = state.searchHistory.filter((h) => h !== username);
				state.searchHistory.unshift(username);

				if (state.searchHistory.length > MAX_SEARCH_HISTORY) {
					const oldestUser = state.searchHistory.pop();
					if (oldestUser) {
						delete state.cache[oldestUser];
					}
				}
			})
			.addCase(fetchGitHubData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? {
					message: "Erro ao buscar dados do GitHub",
				};
			});
	},
});

export const { setCurrentUser, clearSearch } = githubSlice.actions;
export default githubSlice.reducer;
