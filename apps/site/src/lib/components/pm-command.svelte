<script lang="ts">
import type { TrackEvent } from "$lib/analytics";
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
	cascade = false,
	analytics = { event: "command_copied", props: { kind } },
}: {
	kind: PmKind;
	args: string;
	highlight?: string;
	cascade?: boolean;
	analytics?: TrackEvent;
} = $props();

const command = $derived(pmCommand(kind, args, prefs.pm));
</script>

<CodeFrame copyText={command} {analytics}>
	{#snippet title()}<PmTabs />{/snippet}
	<PmTerminal {kind} {args} {highlight} {cascade} />
</CodeFrame>
