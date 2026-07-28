import type { GitHubRepository } from "@/core/interfaces/github.interface";

import { RepoEmptyState } from "./RepoEmptyState";
import { RepoListItem } from "./RepoListItem";

type RepoListProps = {
	username: string;
	repos: GitHubRepository[];
	totalCount: number;
	hasActiveFilters: boolean;
	onClearFilters: () => void;
};

export function RepoList({
	username,
	repos,
	totalCount,
	hasActiveFilters,
	onClearFilters,
}: RepoListProps) {
	if (totalCount === 0) {
		return <RepoEmptyState variant="no-repos" />;
	}

	if (repos.length === 0 && hasActiveFilters) {
		return (
			<RepoEmptyState
				variant="no-filter-results"
				onClearFilters={onClearFilters}
			/>
		);
	}

	return (
		<ul className="flex flex-col gap-3">
			{repos.map((repo) => (
				<RepoListItem key={repo.id} username={username} repo={repo} />
			))}
		</ul>
	);
}
