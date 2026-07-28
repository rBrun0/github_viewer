import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import type { GitHubRepository } from "@/core/interfaces/github.interface";

type RepoListItemProps = {
	username: string;
	repo: GitHubRepository;
};

function formatUpdatedAt(value: string) {
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

export function RepoListItem({ username, repo }: RepoListItemProps) {
	return (
		<li>
			<Link
				to={`/users/${username}/${repo.name}`}
				className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				<div className="flex flex-wrap items-start justify-between gap-2">
					<h3 className="font-medium text-foreground">{repo.name}</h3>
					<span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
						<StarIcon className="size-3.5" />
						{repo.stargazers_count}
					</span>
				</div>

				<p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
					{repo.description ?? "Sem descrição"}
				</p>

				<div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
					<Badge variant="secondary" pastelFrom={repo.language ?? undefined}>
						{repo.language ?? "N/D"}
					</Badge>
					<span>Atualizado em {formatUpdatedAt(repo.updated_at)}</span>
				</div>
			</Link>
		</li>
	);
}
