/** One requirement in the checklist; `test` decides whether the value meets it. */
export type PasswordRule = {
	id: string;
	label: string;
	test: (value: string) => boolean;
};

export type PasswordStrength = {
	/** Rules the value meets, in rule order. */
	met: string[];
	/** 0 to 4: none, weak, fair, good, strong. */
	score: 0 | 1 | 2 | 3 | 4;
};

/** A common baseline set; pass your own `rules` to replace it. Not applied by default. */
export function defaultPasswordRules(minLength = 12): PasswordRule[] {
	return [
		{
			id: "length",
			label: `At least ${minLength} characters`,
			test: (v) => v.length >= minLength,
		},
		{
			id: "case",
			label: "Upper and lower case letters",
			test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v),
		},
		{ id: "number", label: "A number", test: (v) => /\d/.test(v) },
		{ id: "symbol", label: "A symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
	];
}

export function passwordStrength(value: string, rules: PasswordRule[]): PasswordStrength {
	const met = rules.filter((r) => r.test(value)).map((r) => r.id);
	if (!value || rules.length === 0) return { met, score: 0 };
	const ratio = met.length / rules.length;
	const score = ratio === 1 ? 4 : ratio >= 0.75 ? 3 : ratio >= 0.5 ? 2 : 1;
	return { met, score };
}

export type PasswordLabels = {
	show: string;
	hide: string;
	capsLock: string;
	strength: string;
	levels: [string, string, string, string, string];
};

export const PASSWORD_LABELS: PasswordLabels = {
	show: "Show password",
	hide: "Hide password",
	capsLock: "Caps Lock is on",
	strength: "Password strength",
	levels: ["", "Weak", "Fair", "Good", "Strong"],
};

/** Tabler icon paths (MIT), inlined so the component needs no icon package. */
export const PASSWORD_ICONS = {
	eye: [
		"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",
		"M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6",
	],
	eyeOff: [
		"M10.585 10.587a2 2 0 0 0 2.829 2.828",
		"M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87",
		"M3 3l18 18",
	],
	caps: [
		"M9 12h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v3h-6v-3z",
		"M9 21h6",
		"M9 18h6",
	],
	check: ["M5 12l5 5l10 -10"],
	dot: ["M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"],
} as const;
