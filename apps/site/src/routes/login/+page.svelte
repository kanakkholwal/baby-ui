<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { sendMagicLink, signInWithProvider } from "$lib/account";
import Logo from "$lib/components/logo.svelte";
import Seo from "$lib/components/seo.svelte";

let { data } = $props();

const RESEND_COOLDOWN_MS = 30_000;

let status = $state<"idle" | "sending" | "sent" | "error">("idle");
let email = $state("");
let now = $state(Date.now());
let resendAvailableAt = $state<number>();
let pendingProvider = $state<string>();

// Only same-origin paths, so the link can't bounce a signed-in visitor off-site.
const next = $derived.by(() => {
	const raw = page.url.searchParams.get("next") ?? "";
	return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";
});

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
	} catch {
		status = "error";
	}
}

async function provider(id: string) {
	pendingProvider = id;
	try {
		await signInWithProvider(id, next);
		await goto(next);
	} finally {
		pendingProvider = undefined;
	}
}
</script>

<Seo
	title="Sign in"
	description="Sign in to Baby UI Pro with a magic link to get your registry token, licence and invoices."
	noindex
/>

{#snippet brand()}
	<Logo class="size-5 text-foreground" />
	Baby UI
{/snippet}

{#snippet legal()}
	No licence yet? <a href="/pricing">See Pro plans</a>.
{/snippet}

<data.Screen
	{status}
	bind:email
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
