import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { RepoDetails } from "@/components/repo/RepoDetails";
import type { GitHubRepository } from "@/core/interfaces/github.interface";

const repo: GitHubRepository = {
	id: 42,
	name: "hello-world",
	full_name: "octocat/hello-world",
	description: "My first repository",
	html_url: "https://github.com/octocat/hello-world",
	stargazers_count: 99,
	language: "TypeScript",
	updated_at: "2025-01-01T00:00:00Z",
};

describe("RepoDetails", () => {
	it("renders repository details and GitHub link", () => {
		render(
			<MemoryRouter>
				<RepoDetails username="octocat" repo={repo} />
			</MemoryRouter>,
		);

		expect(
			screen.getByRole("heading", { name: "hello-world" }),
		).toBeInTheDocument();
		expect(screen.getByText("My first repository")).toBeInTheDocument();
		expect(screen.getByText("99")).toBeInTheDocument();
		expect(screen.getByText("estrelas")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /abrir no github/i }),
		).toHaveAttribute("href", repo.html_url);
	});

	it("shows fallbacks for missing description and language", () => {
		render(
			<MemoryRouter>
				<RepoDetails
					username="octocat"
					repo={{ ...repo, description: null, language: null }}
				/>
			</MemoryRouter>,
		);

		expect(screen.getByText("Sem descrição")).toBeInTheDocument();
		expect(screen.getByText("Linguagem N/D")).toBeInTheDocument();
	});
});
