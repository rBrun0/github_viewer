import type { GitHubRepository } from "../../interfaces/github.interface";
import { api } from "../api";

export async function getReposByUsername(username: string) {
	const response = await api.get<GitHubRepository[]>(
		`users/${username}/repos?per_page=100`,
	);
	return response.data;
}
