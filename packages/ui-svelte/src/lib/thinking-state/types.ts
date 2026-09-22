export type ThinkingRow = {
	primary: string;
	secondary?: string;
	mono?: boolean;
	add?: number;
	del?: number;
	href?: string;
	/** Only meaningful for the `steps` variant: shows a spinner instead of a checkmark. */
	status?: "active";
};
