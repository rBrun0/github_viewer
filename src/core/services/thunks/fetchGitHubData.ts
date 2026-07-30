import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { RootState } from "../../../store";
import { CACHE_TTL_MS } from "../../constants/github.constants";
import type {
	GitHubRepository,
	GitHubUser,
} from "../../interfaces/github.interface";
import { getReposByUsername, getUserByUsername } from "../queries";
import type { GithubRejectValue } from "./types";

type FetchGitHubDataResult = {
	user: GitHubUser;
	repos: GitHubRepository[];
};

export const fetchGitHubData = createAsyncThunk<
	FetchGitHubDataResult,
	string,
	{ rejectValue: GithubRejectValue; state: RootState }
>(
	"github/fetchData",
	async (username, { rejectWithValue }) => {
		try {
			const [user, repos] = await Promise.all([
				getUserByUsername(username),
				getReposByUsername(username),
			]);

			return { user, repos };
		} catch (error) {
			const err = error as AxiosError<{ message: string }>;

			return rejectWithValue({
				status: err.response?.status,
				message:
					err.response?.data?.message || "Erro ao buscar dados do GitHub",
			});
		}
	},
	{
		condition: (username, { getState }) => {
			const lowerUsername = username.toLowerCase();
			const cachedData = getState().github.cache[lowerUsername];

			if (cachedData) {
				const elapsedTime = Date.now() - cachedData.updatedAt;

				if (elapsedTime < CACHE_TTL_MS) {
					if (import.meta.env.DEV) {
						console.log(
							`[CACHE HIT] Dados de ${username} estão frescos. Usando Redux.`,
						);
					}
					return false;
				}

				if (import.meta.env.DEV) {
					console.log(
						`[CACHE STALE] Dados de ${username} expiraram. Atualizando via Axios...`,
					);
				}
				return true;
			}

			if (import.meta.env.DEV) {
				console.log(
					`[CACHE MISS] Usuário ${username} não está no cache. Buscando via Axios...`,
				);
			}
			return true;
		},
	},
);
