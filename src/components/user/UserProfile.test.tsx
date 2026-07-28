import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserProfile } from "@/components/user/UserProfile";
import type { GitHubUser } from "@/core/interfaces/github.interface";

const baseUser: GitHubUser = {
	login: "octocat",
	id: 1,
	avatar_url: "https://example.com/avatar.png",
	html_url: "https://github.com/octocat",
	name: "The Octocat",
	bio: "GitHub mascot",
	email: "octocat@github.com",
	public_repos: 8,
	followers: 1000,
	following: 9,
};

describe("UserProfile", () => {
	it("renders required user details", () => {
		render(<UserProfile user={baseUser} />);

		expect(
			screen.getByRole("img", { name: /avatar de octocat/i }),
		).toHaveAttribute("src", baseUser.avatar_url);
		expect(screen.getByText("The Octocat")).toBeInTheDocument();
		expect(screen.getByText("@octocat")).toBeInTheDocument();
		expect(screen.getByText("GitHub mascot")).toBeInTheDocument();
		expect(screen.getByText("1000")).toBeInTheDocument();
		expect(screen.getByText("seguidores")).toBeInTheDocument();
		expect(screen.getByText("9")).toBeInTheDocument();
		expect(screen.getByText("seguindo")).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /octocat@github.com/i }),
		).toBeInTheDocument();
	});

	it("shows fallbacks when bio and email are missing", () => {
		render(
			<UserProfile
				user={{ ...baseUser, name: null, bio: null, email: null }}
			/>,
		);

		expect(screen.getByText("octocat")).toBeInTheDocument();
		expect(screen.getByText("Sem bio")).toBeInTheDocument();
		expect(screen.getByText("E-mail não disponível")).toBeInTheDocument();
	});
});
