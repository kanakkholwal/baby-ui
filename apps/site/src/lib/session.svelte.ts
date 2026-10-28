import { persisted } from "./persisted-state.svelte";

export type LocalSession = {
	/** Empty when signed out. */
	email: string;
	/** `pro` previews the licensed account; there is no billing behind it yet. */
	plan: "none" | "pro";
	newsletter: boolean;
};

const SIGNED_OUT: LocalSession = { email: "", plan: "none", newsletter: false };

// Local-only until Better Auth lands: the "session" is this browser's storage, nothing more.
const stored = persisted<LocalSession>("baby-ui:session", SIGNED_OUT);

export const session = {
	get current(): LocalSession | null {
		return stored.current.email ? stored.current : null;
	},
	signIn(email: string, newsletter = false) {
		stored.current = { ...stored.current, email: email.trim().toLowerCase(), newsletter };
	},
	update(patch: Partial<Omit<LocalSession, "email">>) {
		if (stored.current.email) stored.current = { ...stored.current, ...patch };
	},
	signOut() {
		stored.current = SIGNED_OUT;
	},
};

/** A same-origin path to return to after sign-in, so `?next=` can't bounce a visitor off-site. */
export function safeNext(raw: string | null, fallback = "/account"): string {
	return raw?.startsWith("/") && !raw.startsWith("//") ? raw : fallback;
}
