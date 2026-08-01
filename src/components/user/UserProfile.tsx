import { ExternalLinkIcon, UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { GitHubUser } from "@/core/interfaces/github.interface";
import { cn } from "@/lib/utils";

type UserProfileProps = {
	user: GitHubUser;
};

export function UserProfile({ user }: UserProfileProps) {
	return (
		<section className="flex flex-col gap-5 sm:flex-row sm:items-start">
			<img
				src={user.avatar_url}
				alt={`Avatar de ${user.login}`}
				width={96}
				height={96}
				loading="lazy"
				className="size-24 shrink-0 rounded-full border border-border bg-muted"
			/>

			<div className="flex min-w-0 flex-1 flex-col gap-3">
				<div>
					<h1 className="font-heading text-2xl font-medium tracking-tight">
						{user.name ?? user.login}
					</h1>
					<p className="text-muted-foreground">@{user.login}</p>
				</div>

				<p
					className={
						user.bio
							? "text-sm leading-relaxed"
							: "text-sm text-muted-foreground"
					}
				>
					{user.bio ?? "Sem bio"}
				</p>

				<div className="flex flex-wrap items-center gap-3 text-sm">
					<span className="inline-flex items-center gap-1.5">
						<UsersIcon className="size-4 text-muted-foreground" />
						<strong>{user.followers}</strong>
						<span className="text-muted-foreground">seguidores</span>
					</span>
					<span className="text-muted-foreground">·</span>
					<span>
						<strong>{user.following}</strong>{" "}
						<span className="text-muted-foreground">seguindo</span>
					</span>
					<Badge variant="secondary">{user.public_repos} repos</Badge>
				</div>

				<p className="text-sm">
					{user.email ? (
						<>
							<span className="text-muted-foreground">E-mail: </span>
							<a
								href={`mailto:${user.email}`}
								className="underline underline-offset-2 hover:text-foreground"
							>
								{user.email}
							</a>
						</>
					) : (
						<span className="text-muted-foreground">E-mail não disponível</span>
					)}
				</p>

				<a
					href={user.html_url}
					target="_blank"
					rel="noreferrer"
					className={cn(
						buttonVariants({ variant: "outline", size: "sm" }),
						"w-fit gap-1.5",
					)}
				>
					Ver no GitHub
					<ExternalLinkIcon className="size-3.5" />
				</a>
			</div>
		</section>
	);
}
