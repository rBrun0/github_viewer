import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorState } from "@/components/feedback/ErrorState";
import { SearchBar } from "@/components/layout/SearchBar";
import { RepoList } from "@/components/repo/RepoList";
import { RepoListSkeleton } from "@/components/repo/RepoListSkeleton";
import { RepoToolbar } from "@/components/repo/RepoToolbar";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/components/user/UserProfile";
import { UserProfileSkeleton } from "@/components/user/UserProfileSkeleton";
import { fetchGitHubData } from "@/core/services/thunks";
import { useRepoFilters } from "@/hooks/useRepoFilters";
import { useSortedFilteredRepos } from "@/hooks/useSortedFilteredRepos";
import { getRepoLanguages } from "@/lib/repo-filters";
import { setCurrentUser } from "@/store/githubSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function UserPage() {
	const { username = "" } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const normalized = username.toLowerCase();

	const cached = useAppSelector((state) => state.github.cache[normalized]);
	const loading = useAppSelector((state) => state.github.loading);
	const error = useAppSelector((state) => state.github.error);
	const currentUser = useAppSelector((state) => state.github.currentUser);

	const {
		filters,
		setQuery,
		setSort,
		setLanguage,
		setMinStars,
		clearFilters,
		hasActiveFilters,
	} = useRepoFilters();

	const repos = cached?.repos ?? [];
	const filteredRepos = useSortedFilteredRepos(repos, filters);
	const languages = useMemo(() => getRepoLanguages(repos), [repos]);

	useEffect(() => {
		if (!username) return;
		dispatch(setCurrentUser(username));
		void dispatch(fetchGitHubData(username));
		clearFilters();
	}, [username, dispatch, clearFilters]);

	const showSkeleton = loading && !cached;
	const showError = !!error && !cached && !loading;
	const isCurrentUserMatch = currentUser === normalized;

	if (showSkeleton) {
		return (
			<div className="flex flex-col gap-8">
				<SearchBar defaultUsername={username} compact />
				<UserProfileSkeleton />
				<RepoListSkeleton />
			</div>
		);
	}

	if (showError && error) {
		const isNotFound = error.status === 404;
		return (
			<div className="flex flex-col gap-6">
				<SearchBar defaultUsername={username} compact />
				<ErrorState
					title={
						isNotFound
							? "Nenhum usuário encontrado com esse nome"
							: "Não foi possível carregar o usuário"
					}
					description={
						isNotFound
							? `Não existe um usuário “${username}” no GitHub.`
							: error.message
					}
					actionLabel={isNotFound ? "Nova busca" : "Tentar novamente"}
					onAction={() => {
						if (isNotFound) {
							navigate("/");
							return;
						}
						void dispatch(fetchGitHubData(username));
					}}
					secondaryLabel="Voltar ao início"
					onSecondary={() => navigate("/")}
				/>
			</div>
		);
	}

	if (!cached || !isCurrentUserMatch) {
		return (
			<div className="flex flex-col gap-8">
				<SearchBar defaultUsername={username} compact />
				<UserProfileSkeleton />
				<RepoListSkeleton />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			<SearchBar defaultUsername={username} compact />
			<UserProfile user={cached.user} />

			<Separator className="my-4" />

			<section className="flex flex-col gap-4">
				<h2 className="font-heading text-lg font-medium">Repositórios</h2>
				<RepoToolbar
					filters={filters}
					languages={languages}
					visibleCount={filteredRepos.length}
					totalCount={repos.length}
					hasActiveFilters={hasActiveFilters}
					onQueryChange={setQuery}
					onSortChange={setSort}
					onLanguageChange={setLanguage}
					onMinStarsChange={setMinStars}
					onClearFilters={clearFilters}
				/>

				<Separator className="my-4" />

				{loading ? <RepoListSkeleton count={3} /> : null}
				<RepoList
					username={normalized}
					repos={filteredRepos}
					totalCount={repos.length}
					hasActiveFilters={hasActiveFilters}
					onClearFilters={clearFilters}
				/>
			</section>
		</div>
	);
}
