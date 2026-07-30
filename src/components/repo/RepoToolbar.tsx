import { useForm } from "react-hook-form";

import { Form } from "@/components/form";
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

type DateFilterFormValues = {
	updatedFrom: Date | null;
	updatedTo: Date | null;
};

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
	onUpdatedFromChange: (value: Date | null) => void;
	onUpdatedToChange: (value: Date | null) => void;
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
	onUpdatedFromChange,
	onUpdatedToChange,
	onClearFilters,
}: RepoToolbarProps) {
	const languageItems = [
		{ label: "Todas", value: "all" },
		...languages.map((language) => ({ label: language, value: language })),
	];

	const dateForm = useForm<DateFilterFormValues>({
		values: {
			updatedFrom: filters.updatedFrom,
			updatedTo: filters.updatedTo,
		},
	});

	return (
		<div className="flex min-w-0 flex-col gap-3">
			<div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end">
				<div className="flex min-w-0 flex-1 flex-col gap-1.5">
					<Label htmlFor="repo-search">Filtrar repositórios</Label>
					<Input
						id="repo-search"
						value={filters.query}
						onChange={(e) => onQueryChange(e.target.value)}
						placeholder="Buscar por nome ou descrição..."
						className="w-full min-w-0"
					/>
				</div>

				{hasActiveFilters ? (
					<Button
						type="button"
						// variant="ghost"
						size="sm"
						className="shrink-0 sm:mb-0.5"
						onClick={onClearFilters}
					>
						Limpar filtros
					</Button>
				) : null}
			</div>

			<div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				<div className="flex min-w-0 flex-col gap-1.5">
					<Label>Ordenar por</Label>
					<Select
						items={SORT_OPTIONS}
						value={filters.sort}
						onValueChange={(value) => {
							if (value) onSortChange(value as RepoSortOption);
						}}
					>
						<Select.Trigger className="w-full min-w-0 max-w-full overflow-hidden">
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

				<div className="flex min-w-0 flex-col gap-1.5">
					<Label>Linguagem</Label>
					<Select
						items={languageItems}
						value={filters.language}
						onValueChange={(value) => {
							if (value) onLanguageChange(value);
						}}
					>
						<Select.Trigger className="w-full min-w-0 max-w-full overflow-hidden">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{languageItems.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</div>

				<div className="flex min-w-0 flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
					<Label>Estrelas mínimas</Label>
					<Select
						items={[...MIN_STARS_OPTIONS]}
						value={String(filters.minStars)}
						onValueChange={(value) => {
							if (value) onMinStarsChange(Number(value));
						}}
					>
						<Select.Trigger className="w-full min-w-0 max-w-full overflow-hidden">
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

			<Form {...dateForm}>
				<div className="grid min-w-0 gap-3 sm:grid-cols-2">
					<Form.Date
						name="updatedFrom"
						control={dateForm.control}
						label="De"
						placeholder="Data inicial"
						toDate={filters.updatedTo ?? undefined}
						onChange={onUpdatedFromChange}
					/>
					<Form.Date
						name="updatedTo"
						control={dateForm.control}
						label="Até"
						placeholder="Data final"
						fromDate={filters.updatedFrom ?? undefined}
						onChange={onUpdatedToChange}
					/>
				</div>
			</Form>

			<p className="text-sm text-muted-foreground">
				{visibleCount} de {totalCount} repositórios
			</p>
		</div>
	);
}
