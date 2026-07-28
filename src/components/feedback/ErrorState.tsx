import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
	secondaryLabel?: string;
	onSecondary?: () => void;
};

export function ErrorState({
	title,
	description,
	actionLabel,
	onAction,
	secondaryLabel,
	onSecondary,
}: ErrorStateProps) {
	return (
		<Alert variant="destructive" className="gap-3 p-4">
			<Alert.Title>{title}</Alert.Title>
			{description ? (
				<Alert.Description>{description}</Alert.Description>
			) : null}
			{(onAction || onSecondary) && (
				<div className="col-span-full mt-2 flex flex-wrap gap-2">
					{onAction && actionLabel ? (
						<Button type="button" size="sm" onClick={onAction}>
							{actionLabel}
						</Button>
					) : null}
					{onSecondary && secondaryLabel ? (
						<Button
							type="button"
							size="sm"
							variant="outline"
							onClick={onSecondary}
						>
							{secondaryLabel}
						</Button>
					) : null}
				</div>
			)}
		</Alert>
	);
}
