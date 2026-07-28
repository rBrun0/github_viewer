import { Button } from "@/components/ui/button";

type RepoEmptyStateProps = {
	variant: "no-repos" | "no-filter-results";
	onClearFilters?: () => void;
};

export function RepoEmptyState({
	variant,
	onClearFilters,
}: RepoEmptyStateProps) {
	if (variant === "no-repos") {
		return (
			<div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
				<p className="font-medium">
					Este usuário não tem repositórios públicos
				</p>
				<p className="mt-1 text-sm text-muted-foreground">
					Quando houver repositórios, eles aparecerão aqui.
				</p>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
			<p className="font-medium">Nenhum repositório corresponde aos filtros</p>
			<p className="mt-1 text-sm text-muted-foreground">
				Tente ajustar a busca, linguagem ou estrelas mínimas.
			</p>
			{onClearFilters ? (
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="mt-4"
					onClick={onClearFilters}
				>
					Remover filtros
				</Button>
			) : null}
		</div>
	);
}
