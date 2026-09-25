<script lang="ts">
import origins from "$lib/generated/origins.json";
import { prefs } from "$lib/preferences.svelte";
import PmCommand from "./pm-command.svelte";

let { slug }: { slug: string } = $props();

const CLI = { react: "shadcn@latest", svelte: "shadcn-svelte@latest" } as const;
const ROUTE = { react: "r", svelte: "svelte/r" } as const;

// JS gets its own route, so the language switch changes what the CLI writes.
const url = $derived(
	`${origins.registry}/${ROUTE[prefs.framework]}${prefs.dialect === "js" ? "/js" : ""}/${slug}.json`,
);
</script>

<PmCommand
	kind="dlx"
	args="{CLI[prefs.framework]} add {url}"
	highlight="{slug}.json"
	analytics={{ event: "install_copied", props: { item: slug, method: "cli" } }}
/>
