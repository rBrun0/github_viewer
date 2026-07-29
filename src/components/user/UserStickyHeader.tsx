import type { GitHubUser } from "@/core/interfaces/github.interface";
import { cn } from "@/lib/utils";

type UserStickyHeaderProps = {
	user: GitHubUser;
	visible: boolean;
};

export function UserStickyHeader({ user, visible }: UserStickyHeaderProps) {
	const displayName = user.name ?? user.login;

	return (
		<div
			aria-hidden={!visible}
			className={cn(
				"pointer-events-none fixed inset-x-0 top-14 z-[15]",
				"transition-[transform,opacity] duration-300 ease-out",
				visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
			)}
		>
			<div
				className={cn(
					"border-b border-border/60 bg-background/55 shadow-sm",
					"backdrop-blur-xl backdrop-saturate-150",
					"dark:bg-background/50",
					visible && "pointer-events-auto",
				)}
			>
				<div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-3 px-4">
					<img
						src={user.avatar_url}
						alt=""
						width={32}
						height={32}
						className="size-8 shrink-0 rounded-full border border-border bg-muted"
					/>
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-medium leading-tight">
							{displayName}
						</p>
						<p className="truncate text-xs text-muted-foreground">
							@{user.login}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
