import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, XIcon } from "lucide-react";
import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";

type FormDateProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	placeholder?: string;
	className?: string;
	containerClassName?: string;
	disabled?: boolean;
	fromDate?: Date;
	toDate?: Date;
	onChange?: (value: Date | null) => void;
};

export function FormDate<T extends FieldValues>({
	name,
	control,
	label,
	placeholder = "Selecionar data",
	className,
	containerClassName,
	disabled,
	fromDate,
	toDate,
	onChange,
}: FormDateProps<T>) {
	const [open, setOpen] = useState(false);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const rawValue = field.value as
					| Date
					| string
					| number
					| null
					| undefined;
				const selected =
					rawValue instanceof Date
						? rawValue
						: rawValue
							? new Date(rawValue)
							: undefined;

				return (
					<FormItem className={cn("relative min-w-0", containerClassName)}>
						{label && <FormLabel>{label}</FormLabel>}

						<div className="relative min-w-0">
							<Popover open={open} onOpenChange={setOpen}>
								<FormControl>
									<PopoverTrigger
										disabled={disabled}
										render={
											<Button
												type="button"
												variant="outline"
												data-empty={!selected}
												className={cn(
													"w-full min-w-0 justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
													selected && "pr-8",
													className,
												)}
											/>
										}
									>
										<CalendarIcon className="shrink-0" />
										<span className="truncate">
											{selected
												? format(selected, "dd/MM/yyyy", { locale: ptBR })
												: placeholder}
										</span>
									</PopoverTrigger>
								</FormControl>

								<PopoverContent
									className="w-auto max-w-[calc(100vw-2rem)] p-0"
									align="start"
								>
									<Calendar
										mode="single"
										locale={ptBR}
										className="[--cell-size:--spacing(7)] max-[360px]:[--cell-size:--spacing(6)]"
										selected={selected}
										disabled={[
											...(fromDate ? [{ before: fromDate }] : []),
											...(toDate ? [{ after: toDate }] : []),
										]}
										onSelect={(date) => {
											const next = date ?? null;
											field.onChange(next);
											onChange?.(next);
											setOpen(false);
										}}
									/>
								</PopoverContent>
							</Popover>

							{selected ? (
								<Button
									type="button"
									variant="ghost"
									size="icon-xs"
									aria-label="Limpar data"
									disabled={disabled}
									className="absolute top-1/2 right-1 z-10 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										field.onChange(null);
										onChange?.(null);
									}}
								>
									<XIcon />
								</Button>
							) : null}
						</div>

						<FormMessage className="absolute top-full right-0 text-xs" />
					</FormItem>
				);
			}}
		/>
	);
}
