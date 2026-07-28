import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const searchSchema = z.object({
	username: z
		.string()
		.trim()
		.min(1, "Informe um usuário")
		.regex(/^[a-zA-Z0-9-]+$/, "Username inválido"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;

export const searchFormDefaults = (username = ""): SearchFormValues => ({
	username,
});

export function useSearchForm(defaultUsername = "") {
	return useForm<SearchFormValues>({
		resolver: zodResolver(searchSchema),
		defaultValues: searchFormDefaults(defaultUsername),
	});
}
