import axios from "axios";

import { GITHUB_API_URL } from "../constants/github.constants";

export const api = axios.create({
	baseURL: GITHUB_API_URL,
});
