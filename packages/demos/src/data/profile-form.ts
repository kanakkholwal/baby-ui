import { z } from "zod";

/** The form demos' profile: one schema both ports validate with on blur and on submit. */
export const PROFILE_SCHEMA = z.object({
	name: z.string().trim().min(1, "Enter your name."),
	email: z.email("Enter an email like name@company.com."),
});

export const PROFILE_DEFAULTS: z.infer<typeof PROFILE_SCHEMA> = { name: "", email: "" };
