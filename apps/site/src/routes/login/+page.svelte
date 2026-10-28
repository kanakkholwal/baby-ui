<script lang="ts">
import { sendMagicLink, signInWithProvider } from "#lib/account.js";
import Logo from "#lib/components/logo.svelte";
import Seo from "#lib/components/seo.svelte";
import { safeNext, session } from "#lib/session.svelte.js";
import { goto } from "$app/navigation";
import { page } from "$app/state";

let { data } = $props();

const RESEND_COOLDOWN_MS = 30_000;

let status = $state<"idle" | "sending" | "sent" | "error">("idle");
let email = $state("");
let newsletter = $state(false);
let now = $state(Date.now());
let resendAvailableAt = $state<number>();
let pendingProvider = $state<string>();

const next = $derived(safeNext(page.url.searchParams.get("next")));

$effect(() => {
	const tick = setInterval(() => (now = Date.now()), 1000);
	return () => clearInterval(tick);
});

async function send(address = email) {
	status = "sending";
	try {
		await sendMagicLink(address, next);
		resendAvailableAt = Date.now() + RESEND_COOLDOWN_MS;
		now = Date.now();
		status = "sent";
		// No inbox to open locally, so the sent link counts as followed.
		session.signIn(address, newsletter);
	} catch {
		status = "error";
	}
}

async function provider(id: string) {
	pendingProvider = id;
	try {
		await signInWithProvider(id, next);
		session.signIn(email || `you@${id}.local`, newsletter);
		// goto rejects a path no route matches; a stale ?next= lands on the account instead.
		await goto(next).catch(() => goto("/account"));
	} finally {
		pendingProvider = undefined;
	}
}
</script>

<Seo
	title="Sign in"
	description="Sign in to Baby UI Pro for your downloads, access key and invoices."
	noindex
/>

{#snippet brand()}
	<Logo class="size-6 text-foreground" />
	<span class="font-display font-semibold">Baby UI</span>
{/snippet}

{#snippet legal()}
	No account yet? Signing in creates one, with any email address. Want Pro? See
	<a href="/pricing">Pricing</a>.
{/snippet}

<data.Screen
	{status}
	bind:email
	bind:newsletter
	{now}
	{resendAvailableAt}
	{pendingProvider}
	error="We couldn't send the link. Try again in a moment."
	onSubmit={send}
	onResend={() => send()}
	onBack={() => (status = "idle")}
	onProvider={provider}
	{brand}
	{legal}
/>
