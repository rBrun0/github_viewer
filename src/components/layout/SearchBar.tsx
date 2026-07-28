import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Form, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { fetchGitHubData } from "@/core/services/thunks";
import { setCurrentUser } from "@/store/githubSlice";
import { useAppDispatch } from "@/store/hooks";

const searchSchema = z.object({
	username: z
		.string()
		.trim()
		.min(1, "Informe um usuário")
		.regex(/^[a-zA-Z0-9-]+$/, "Username inválido"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

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

	const form = useForm<SearchFormValues>({
		resolver: zodResolver(searchSchema),
		defaultValues: { username: defaultUsername },
	});

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
