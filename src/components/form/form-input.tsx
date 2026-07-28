import type * as React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";

type FormInputProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	placeholder?: string;
	type?: string;
	className?: string;
	containerClassName?: string;
	onChange?: (value: string) => void;
} & Omit<
	React.ComponentProps<"input">,
	"name" | "onChange" | "value" | "defaultValue"
>;

export function FormInput<T extends FieldValues>({
	name,
	control,
	label,
	placeholder,
	type = "text",
	className,
	containerClassName,
	onChange,
	...props
}: FormInputProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("relative", containerClassName)}>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<Input
							{...field}
							type={type}
							placeholder={placeholder}
							className={className}
							onChange={(e) => {
								field.onChange(e);
								onChange?.(e.target.value);
							}}
							{...props}
						/>
					</FormControl>

					<FormMessage className="absolute top-full right-0 text-xs" />
				</FormItem>
			)}
		/>
	);
}
