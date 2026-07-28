import type { GitHubUser } from "../../interfaces/github.interface";
import { api } from "../api";

export async function getUserByUsername(username: string) {
	const response = await api.get<GitHubUser>(`users/${username}`);
	return response.data;
}
