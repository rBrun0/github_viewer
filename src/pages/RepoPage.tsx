import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorState } from "@/components/feedback/ErrorState";
import { RepoDetails } from "@/components/repo/RepoDetails";
import { RepoDetailsSkeleton } from "@/components/repo/RepoDetailsSkeleton";
import { fetchGitHubData } from "@/core/services/thunks";
import { setCurrentUser } from "@/store/githubSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function RepoPage() {
	const { username = "", repo: repoName = "" } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const normalizedUser = username.toLowerCase();
	const normalizedRepo = repoName.toLowerCase();

	const cached = useAppSelector((state) => state.github.cache[normalizedUser]);
	const loading = useAppSelector((state) => state.github.loading);
	const error = useAppSelector((state) => state.github.error);

	useEffect(() => {
		if (!username) return;
		dispatch(setCurrentUser(username));
		void dispatch(fetchGitHubData(username));
	}, [username, dispatch]);

	const repo = useMemo(
		() =>
			cached?.repos.find((item) => item.name.toLowerCase() === normalizedRepo),
		[cached, normalizedRepo],
	);

	if (loading && !cached) {
		return <RepoDetailsSkeleton />;
	}

	if (error && !cached) {
		const isNotFound = error.status === 404;
		return (
			<ErrorState
				title={
					isNotFound
						? "Nenhum usuário encontrado com esse nome"
						: "Não foi possível carregar os dados"
				}
				description={error.message}
				actionLabel="Voltar ao início"
				onAction={() => navigate("/")}
				secondaryLabel="Tentar novamente"
				onSecondary={() => void dispatch(fetchGitHubData(username))}
			/>
		);
	}

	if (!cached) {
		return <RepoDetailsSkeleton />;
	}

	if (!repo) {
		return (
			<ErrorState
				title="Repositório não encontrado"
				description={`Não encontramos “${repoName}” entre os repositórios públicos de @${normalizedUser}.`}
				actionLabel={`Voltar aos repositórios de @${normalizedUser}`}
				onAction={() => navigate(`/users/${normalizedUser}`)}
			/>
		);
	}

	return <RepoDetails username={normalizedUser} repo={repo} />;
}
