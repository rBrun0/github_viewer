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
});

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
	FormSelect,
	useFormField,
};
