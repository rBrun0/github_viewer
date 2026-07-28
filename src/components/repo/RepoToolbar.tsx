import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
	MIN_STARS_OPTIONS,
	type RepoFiltersState,
	type RepoSortOption,
	SORT_OPTIONS,
} from "@/lib/repo-filters";

type RepoToolbarProps = {
	filters: RepoFiltersState;
	languages: string[];
	visibleCount: number;
	totalCount: number;
	hasActiveFilters: boolean;
	onQueryChange: (value: string) => void;
	onSortChange: (value: RepoSortOption) => void;
	onLanguageChange: (value: string) => void;
	onMinStarsChange: (value: number) => void;
	onClearFilters: () => void;
};

export function RepoToolbar({
	filters,
	languages,
	visibleCount,
	totalCount,
	hasActiveFilters,
	onQueryChange,
	onSortChange,
	onLanguageChange,
	onMinStarsChange,
	onClearFilters,
}: RepoToolbarProps) {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end">
				<div className="flex min-w-0 flex-1 flex-col gap-1.5">
					<Label htmlFor="repo-search">Filtrar repositórios</Label>
					<Input
						id="repo-search"
						value={filters.query}
						onChange={(e) => onQueryChange(e.target.value)}
						placeholder="Buscar por nome ou descrição..."
						className="w-full"
					/>
				</div>

				{hasActiveFilters ? (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="sm:mb-0.5"
						onClick={onClearFilters}
					>
						Limpar filtros
					</Button>
				) : null}
			</div>

			<div className="grid gap-3 sm:grid-cols-3">
				<div className="flex flex-col gap-1.5">
					<Label>Ordenar por</Label>
					<Select
						value={filters.sort}
						onValueChange={(value) => {
							if (value) onSortChange(value as RepoSortOption);
						}}
					>
						<Select.Trigger className="w-full">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{SORT_OPTIONS.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label>Linguagem</Label>
					<Select
						value={filters.language}
						onValueChange={(value) => {
							if (value) onLanguageChange(value);
						}}
					>
						<Select.Trigger className="w-full">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="all">Todas</Select.Item>
							{languages.map((language) => (
								<Select.Item key={language} value={language}>
									{language}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label>Estrelas mínimas</Label>
					<Select
						value={String(filters.minStars)}
						onValueChange={(value) => {
							if (value) onMinStarsChange(Number(value));
						}}
					>
						<Select.Trigger className="w-full">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{MIN_STARS_OPTIONS.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</div>
			</div>

			<p className="text-sm text-muted-foreground">
				{visibleCount} de {totalCount} repositórios
			</p>
		</div>
	);
}
