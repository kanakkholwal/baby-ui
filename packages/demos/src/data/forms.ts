/** Sample sign-up form content shared by the field, input-group and native-select demos. */
export const SIGNUP_ROLES = [
	{ value: "", label: "Choose a role" },
	{ value: "engineer", label: "Engineer" },
	{ value: "designer", label: "Designer" },
	{ value: "product", label: "Product manager" },
	{ value: "founder", label: "Founder" },
];

export type SignupValues = {
	name: string;
	email: string;
	password: string;
	role: string;
};
export type SignupErrors = Partial<Record<keyof SignupValues, string>>;

/** The demo's validation rules; a real form would use its schema library of choice. */
export function validateSignup(values: SignupValues): SignupErrors {
	const errors: SignupErrors = {};
	if (!values.name.trim()) errors.name = "Enter your name.";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
		errors.email = "Enter an email like name@company.com.";
	if (values.password.length < 8) errors.password = "Use at least 8 characters.";
	if (!values.role) errors.role = "Choose the role closest to yours.";
	return errors;
}

/** Field order, so submit can focus the first invalid control. */
export const SIGNUP_ORDER: (keyof SignupValues)[] = ["name", "email", "password", "role"];
