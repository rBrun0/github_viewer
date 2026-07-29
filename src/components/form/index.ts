import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as FormRoot,
	useFormField,
} from "./form";
import { FormDate } from "./form-date";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";

const Form = Object.assign(FormRoot, {
	Field: FormField,
	Item: FormItem,
	Label: FormLabel,
	Control: FormControl,
	Description: FormDescription,
	Message: FormMessage,
	Input: FormInput,
	Select: FormSelect,
	Date: FormDate,
});

export {
	Form,
	FormControl,
	FormDate,
	FormDescription,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
	FormSelect,
	useFormField,
};
