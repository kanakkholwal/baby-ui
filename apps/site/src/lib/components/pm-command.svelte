<script lang="ts">
import type { PmKind } from "$lib/pm";
import { pmCommand } from "$lib/pm";
import { prefs } from "$lib/preferences.svelte";
import CodeFrame from "./code-frame.svelte";
import PmTabs from "./pm-tabs.svelte";
import PmTerminal from "./pm-terminal.svelte";

let {
	kind,
	args,
	highlight = "",
}: { kind: PmKind; args: string; highlight?: string } = $props();

const command = $derived(pmCommand(kind, args, prefs.pm));
</script>

<CodeFrame copyText={command}>
	{#snippet title()}<PmTabs />{/snippet}
	<PmTerminal {kind} {args} {highlight} />
</CodeFrame>
