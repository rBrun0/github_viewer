import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Form, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { fetchGitHubData } from "@/core/services/thunks";
import { useSearchForm } from "@/schemas";
import { setCurrentUser } from "@/store/githubSlice";
import { useAppDispatch } from "@/store/hooks";

type SearchBarProps = {
	defaultUsername?: string;
	compact?: boolean;
};

export function SearchBar({
	defaultUsername = "",
	compact = false,
}: SearchBarProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const form = useSearchForm(defaultUsername);

	const onSubmit = form.handleSubmit((values) => {
		const username = values.username.trim();
		dispatch(setCurrentUser(username));
		void dispatch(fetchGitHubData(username));
		navigate(`/users/${username}`);
	});

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className={
					compact
						? "flex w-full max-w-md items-start gap-2"
						: "flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-start"
				}
			>
				<FormInput
					control={form.control}
					name="username"
					placeholder="Digite um username do GitHub"
					containerClassName="min-w-0 flex-1"
					className="w-full"
					autoComplete="off"
					spellCheck={false}
				/>
				<Button type="submit" className="shrink-0 sm:mt-0">
					<SearchIcon className="size-4" />
					Buscar
				</Button>
			</form>
		</Form>
	);
}
