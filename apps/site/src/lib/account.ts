// Pre-backend stubs for the Pro pages: each waits one round trip and succeeds.
// Better Auth (magic link) and the payment provider replace them; see TODO.md.
const roundTrip = (ms = 900) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Better Auth's magicLinkClient: `authClient.signIn.magicLink({ email, callbackURL })`. */
export async function sendMagicLink(_email: string, _callbackURL: string): Promise<void> {
	await roundTrip();
}

/** `authClient.signIn.social({ provider, callbackURL })`, which redirects away. */
export async function signInWithProvider(_provider: string, _callbackURL: string) {
	await roundTrip();
}

/** Whether the visitor holds a Pro seat; the Better Auth session answers this once it lands. */
export function hasProAccess(): boolean {
	return false;
}

export async function signOut(): Promise<void> {
	await roundTrip(400);
}

/** Hosted checkout URL for `plan:seats`; null keeps the visitor on the page. */
export async function createCheckout(
	_itemId: string,
	_code: string,
): Promise<string | null> {
	await roundTrip(1200);
	return null;
}

/** The discount a promo code grants, or null when the server rejects it. */
export async function redeemCode(code: string) {
	await roundTrip(600);
	return code.trim().toUpperCase() === "LAUNCH20"
		? { code: "LAUNCH20", label: "20% off", percentOff: 20 }
		: null;
}

/** The provider's customer portal, where cancel, resume and card changes happen. */
export async function openBillingPortal(): Promise<void> {
	await roundTrip(1200);
}

export async function rotateLicenseKey(): Promise<string> {
	await roundTrip(1200);
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return `bui_live_${btoa(String.fromCharCode(...bytes)).replace(/[+/=]/g, "")}`;
}
