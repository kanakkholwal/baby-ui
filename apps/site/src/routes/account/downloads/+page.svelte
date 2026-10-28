<script lang="ts">
import { untrack } from "svelte";
import { rotateLicenseKey } from "#lib/account.js";
import GetProButton from "#lib/components/get-pro-button.svelte";
import PmCommand from "#lib/components/pm-command.svelte";
import Seo from "#lib/components/seo.svelte";
import { session } from "#lib/session.svelte.js";

let { data } = $props();

const sample = untrack(() => data.sample.sampleAccount(new Date()));
let licenseKey = $state(sample.licenseKey);
let licenseCreatedAt = $state(sample.licenseCreatedAt);
let licenseLastUsedAt = $state<string | null>(sample.licenseLastUsedAt);
const account = $derived(
	session.current?.plan === "pro"
		? { ...sample, licenseKey, licenseCreatedAt, licenseLastUsedAt }
		: null,
);

let pendingDownload = $state<string>();
let licenseStatus = $state<"idle" | "confirming" | "rotating" | "error">("idle");
let licenseRevealed = $state(false);

// No archive server yet: the button shows its preparing state, then settles.
async function download(id: string) {
	pendingDownload = id;
	await new Promise((resolve) => setTimeout(resolve, 900));
	pendingDownload = undefined;
}

async function rotate() {
	licenseStatus = "rotating";
	try {
		licenseKey = await rotateLicenseKey();
		licenseCreatedAt = new Date().toISOString();
		licenseLastUsedAt = null;
		licenseRevealed = true;
		licenseStatus = "idle";
	} catch {
		licenseStatus = "error";
	}
}
</script>

<Seo title="Downloads" description="Download Baby UI Pro and set up your access key." noindex />

{#snippet getPro()}<GetProButton />{/snippet}
{#snippet install()}<PmCommand kind="dlx" args="shadcn@latest add @baby-ui/button" />{/snippet}

<data.Screen
	downloads={data.sample.DOWNLOADS}
	{account}
	registry={data.sample.LICENSE_REGISTRY}
	{pendingDownload}
	bind:licenseStatus
	bind:licenseRevealed
	licenseError="Couldn't reach the licence server. Your current key still works."
	{getPro}
	{install}
	onDownload={download}
	onRotateKey={rotate}
/>
