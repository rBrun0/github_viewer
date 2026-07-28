import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RepoEmptyState } from "@/components/repo/RepoEmptyState";

describe("RepoEmptyState", () => {
	it("shows message when user has no public repos", () => {
		render(<RepoEmptyState variant="no-repos" />);

		expect(
			screen.getByText("Este usuário não tem repositórios públicos"),
		).toBeInTheDocument();
	});

	it("shows clear filters CTA when filters yield no results", async () => {
		const user = userEvent.setup();
		const onClearFilters = vi.fn();

		render(
			<RepoEmptyState
				variant="no-filter-results"
				onClearFilters={onClearFilters}
			/>,
		);

		expect(
			screen.getByText("Nenhum repositório corresponde aos filtros"),
		).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: /remover filtros/i }));
		expect(onClearFilters).toHaveBeenCalledTimes(1);
	});
});
