<script lang="ts">
import type { TrackEvent } from "#lib/analytics.js";
import type { PmKind } from "#lib/pm.js";
import { pmCommand } from "#lib/pm.js";
import { prefs } from "#lib/preferences.svelte.js";
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
