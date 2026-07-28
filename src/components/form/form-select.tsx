import type { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "../../lib/utils";
import { Select } from "../ui/select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";

type FormSelectOption = {
	label: string;
	value: string;
};

type FormSelectProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	placeholder?: string;
	options: FormSelectOption[];
	className?: string;
	containerClassName?: string;
	onChange?: (value: string | null) => void;
};

export function FormSelect<T extends FieldValues>({
	name,
	control,
	label,
	placeholder,
	options,
	className,
	containerClassName,
	onChange,
}: FormSelectProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("relative", containerClassName)}>
					{label && <FormLabel>{label}</FormLabel>}

					<Select
						value={(field.value as string) ?? null}
						onValueChange={(value) => {
							const nextValue = typeof value === "string" ? value : null;
							field.onChange(nextValue);
							onChange?.(nextValue);
						}}
					>
						<FormControl>
							<Select.Trigger className={cn("w-full", className)}>
								<Select.Value placeholder={placeholder} />
							</Select.Trigger>
						</FormControl>

						<Select.Content>
							{options.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select>

					<FormMessage className="absolute top-full right-0 text-xs" />
				</FormItem>
			)}
		/>
	);
}
