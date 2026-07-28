import { Link } from "react-router-dom";

import { SearchBar } from "@/components/layout/SearchBar";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";

export function HomePage() {
	const searchHistory = useAppSelector((state) => state.github.searchHistory);

	return (
		<div className="flex flex-col gap-10">
			<section className="flex flex-col gap-4">
				<div>
					<h1 className="font-heading text-3xl font-medium tracking-tight">
						GitHub Viewer
					</h1>
					<p className="mt-2 max-w-md text-muted-foreground">
						Busque um usuário do GitHub para ver perfil e repositórios públicos.
					</p>
				</div>
				<SearchBar />
			</section>

			<section className="flex flex-col gap-3">
				<h2 className="text-sm font-medium text-muted-foreground">
					Buscas recentes
				</h2>

				{searchHistory.length === 0 ? (
					<div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
						<p className="font-medium">
							Busque um usuário do GitHub para começar
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							As últimas 8 buscas aparecerão aqui para acesso rápido.
						</p>
					</div>
				) : (
					<ul className="flex flex-wrap gap-2">
						{searchHistory.map((username) => (
							<li key={username}>
								<Link to={`/users/${username}`}>
									<Badge
										variant="secondary"
										className="cursor-pointer px-3 py-1 text-sm hover:bg-muted"
									>
										@{username}
									</Badge>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
		</div>
	);
}
