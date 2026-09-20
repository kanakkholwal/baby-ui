import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { type InputSize, input } from "./variants";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	size?: InputSize;
	invalid?: boolean;
}

export function Input({ className, size = "md", invalid = false, ...rest }: InputProps) {
	return (
		<input
			{...rest}
			aria-invalid={invalid || undefined}
			className={cn(input({ size }), className)}
		/>
	);
}
