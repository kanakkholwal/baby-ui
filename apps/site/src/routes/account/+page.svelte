<script lang="ts">
import { untrack } from "svelte";
import {
	deleteAccount,
	openBillingPortal,
	sendLicenseTransfer,
	setNewsletter,
	signOutEverywhere,
} from "#lib/account.js";
import GetProButton from "#lib/components/get-pro-button.svelte";
import Seo from "#lib/components/seo.svelte";
import { session } from "#lib/session.svelte.js";
import { goto } from "$app/navigation";
import { page } from "$app/state";

let { data } = $props();

type Pending = "idle" | "pending" | "error";
const INVOICE_PAGE = 5;
const now = new Date();

// `?plan=pro` previews the licensed account until billing returns the real one.
$effect(() => {
	const plan = page.url.searchParams.get("plan");
	if (plan === "pro" || plan === "none") untrack(() => session.update({ plan }));
});

const sample = untrack(() => data.sample.sampleAccount(now));
const email = $derived(session.current?.email ?? "");
const account = $derived(session.current?.plan === "pro" ? { ...sample, email } : null);

let newsletterStatus = $state<Pending>("idle");
let transferEmail = $state("");
let transferStatus = $state<"idle" | "sending" | "sent" | "error">("idle");
let signOutStatus = $state<Pending>("idle");
let deleteStatus = $state<Pending>("idle");
let subscriptionPending = $state<string | null>(null);
let paymentStatus = $state<"idle" | "redirecting" | "error">("idle");
let invoicesShown = $state(INVOICE_PAGE);
let loadingMoreInvoices = $state(false);

async function newsletter(subscribed: boolean) {
	newsletterStatus = "pending";
	try {
		await setNewsletter(subscribed);
		session.update({ newsletter: subscribed });
		newsletterStatus = "idle";
	} catch {
		newsletterStatus = "error";
	}
}

async function transfer(address: string) {
	transferStatus = "sending";
	try {
		await sendLicenseTransfer(address);
		transferStatus = "sent";
	} catch {
		transferStatus = "error";
	}
}

async function leaveEverywhere() {
	signOutStatus = "pending";
	await signOutEverywhere();
	session.signOut();
	await goto("/login");
}

async function remove() {
	deleteStatus = "pending";
	await deleteAccount();
	session.signOut();
	await goto("/");
}

// Cancel, resume, plan and card changes all happen in the provider's hosted portal.
async function portal(pending: string) {
	subscriptionPending = pending;
	try {
		await openBillingPortal();
	} finally {
		subscriptionPending = null;
	}
}

async function updatePayment() {
	paymentStatus = "redirecting";
	try {
		await openBillingPortal();
		paymentStatus = "idle";
	} catch {
		paymentStatus = "error";
	}
}

async function loadMore() {
	loadingMoreInvoices = true;
	await new Promise((resolve) => setTimeout(resolve, 600));
	invoicesShown = sample.invoices.length;
	loadingMoreInvoices = false;
}
</script>

<Seo title="Account" description="Your Baby UI plan, email settings and invoices." noindex />

{#snippet getPro()}<GetProButton />{/snippet}

<data.Screen
	{email}
	{account}
	{now}
	newsletter={session.current?.newsletter ?? false}
	{newsletterStatus}
	bind:transferEmail
	{transferStatus}
	{signOutStatus}
	{deleteStatus}
	{subscriptionPending}
	{paymentStatus}
	{invoicesShown}
	{loadingMoreInvoices}
	{getPro}
	onNewsletterChange={newsletter}
	onTransfer={transfer}
	onSignOutEverywhere={leaveEverywhere}
	onDelete={remove}
	onManageBilling={() => portal("manage")}
	onChangePlan={() => portal("change")}
	onCancel={() => portal("cancel")}
	onResume={() => portal("resume")}
	onUpdatePayment={updatePayment}
	onLoadMoreInvoices={loadMore}
/>
