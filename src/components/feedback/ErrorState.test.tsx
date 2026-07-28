import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ErrorState } from "@/components/feedback/ErrorState";

describe("ErrorState", () => {
	it("renders title and description", () => {
		render(
			<ErrorState
				title="Nenhum usuário encontrado com esse nome"
				description="Não existe esse usuário."
			/>,
		);

		expect(
			screen.getByText("Nenhum usuário encontrado com esse nome"),
		).toBeInTheDocument();
		expect(screen.getByText("Não existe esse usuário.")).toBeInTheDocument();
	});

	it("calls actions when buttons are clicked", async () => {
		const user = userEvent.setup();
		const onAction = vi.fn();
		const onSecondary = vi.fn();

		render(
			<ErrorState
				title="Erro"
				actionLabel="Tentar novamente"
				onAction={onAction}
				secondaryLabel="Voltar ao início"
				onSecondary={onSecondary}
			/>,
		);

		await user.click(screen.getByRole("button", { name: /tentar novamente/i }));
		await user.click(screen.getByRole("button", { name: /voltar ao início/i }));

		expect(onAction).toHaveBeenCalledTimes(1);
		expect(onSecondary).toHaveBeenCalledTimes(1);
	});
});
