<script lang="ts">
import { untrack } from "svelte";
import { goto } from "$app/navigation";
import { openBillingPortal, rotateLicenseKey, signOut } from "$lib/account";
import Seo from "$lib/components/seo.svelte";

let { data } = $props();

const INVOICE_PAGE = 5;
const now = new Date();

// Sample account until the auth session and billing API return the real one.
let account = $state(untrack(() => data.sample.sampleAccount(now)));
let setupCompleted = $state<string[]>([]);
let setupDismissed = $state(false);
let licenseStatus = $state<"idle" | "confirming" | "rotating" | "error">("idle");
let licenseRevealed = $state(false);
let subscriptionPending = $state<string | null>(null);
let paymentStatus = $state<"idle" | "redirecting" | "error">("idle");
let invoicesShown = $state(INVOICE_PAGE);
let loadingMoreInvoices = $state(false);
let signingOut = $state(false);

const complete = (id: string) => {
	if (!setupCompleted.includes(id)) setupCompleted = [...setupCompleted, id];
};

function setupAction(id: string) {
	complete(id);
	if (id === "token") licenseRevealed = true;
	if (id === "install") void goto("/components");
	// Seats sit on the subscription card; the token and registry block under Registry access.
	else
		document
			.getElementById(id === "invite" ? "plan" : "access")
			?.scrollIntoView({ behavior: "smooth" });
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

async function rotate() {
	licenseStatus = "rotating";
	try {
		account.licenseKey = await rotateLicenseKey();
		account.licenseCreatedAt = new Date().toISOString();
		account.licenseLastUsedAt = null;
		licenseRevealed = true;
		licenseStatus = "idle";
	} catch {
		licenseStatus = "error";
	}
}

async function loadMore() {
	loadingMoreInvoices = true;
	await new Promise((resolve) => setTimeout(resolve, 600));
	invoicesShown = account.invoices.length;
	loadingMoreInvoices = false;
}

async function leave() {
	signingOut = true;
	await signOut();
	await goto("/login");
}
</script>

<Seo title="Account" description="Your Baby UI Pro licence, registry token and invoices." noindex />

<data.Screen
	{account}
	{now}
	registry={data.sample.LICENSE_REGISTRY}
	setupSteps={data.sample.SETUP_STEPS}
	bind:setupCompleted
	{setupDismissed}
	bind:licenseStatus
	bind:licenseRevealed
	licenseError="Couldn't reach the licence server. Your current key still works."
	{subscriptionPending}
	{paymentStatus}
	{invoicesShown}
	{loadingMoreInvoices}
	{signingOut}
	onSetupAction={setupAction}
	onDismissSetup={() => (setupDismissed = true)}
	onRotateKey={rotate}
	onManageBilling={() => portal("manage")}
	onChangePlan={() => portal("change")}
	onCancel={() => portal("cancel")}
	onResume={() => portal("resume")}
	onUpdatePayment={updatePayment}
	onLoadMoreInvoices={loadMore}
	onSignOut={leave}
/>
