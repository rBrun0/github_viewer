import { ExternalLinkIcon, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { GitHubRepository } from "@/core/interfaces/github.interface";
import { cn } from "@/lib/utils";

type RepoDetailsProps = {
	username: string;
	repo: GitHubRepository;
};

export function RepoDetails({ username, repo }: RepoDetailsProps) {
	return (
		<article className="flex flex-col gap-5">
			<Link
				to={`/users/${username}`}
				className="w-fit text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
			>
				← Voltar aos repositórios de @{username}
			</Link>

			<div>
				<h1 className="font-heading text-2xl font-medium tracking-tight">
					{repo.name}
				</h1>
				<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
					{repo.description ?? "Sem descrição"}
				</p>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<span className="inline-flex items-center gap-1.5 text-sm">
					<StarIcon className="size-4 text-muted-foreground" />
					<strong>{repo.stargazers_count}</strong>
					<span className="text-muted-foreground">estrelas</span>
				</span>
				<Badge variant="secondary" pastelFrom={repo.language ?? undefined}>
					{repo.language ?? "Linguagem N/D"}
				</Badge>
			</div>

			<a
				href={repo.html_url}
				target="_blank"
				rel="noreferrer"
				className={cn(
					buttonVariants({ variant: "default", size: "default" }),
					"w-fit gap-1.5",
				)}
			>
				Abrir no GitHub
				<ExternalLinkIcon className="size-3.5" />
			</a>
		</article>
	);
}
