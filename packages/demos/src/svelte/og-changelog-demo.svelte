<script lang="ts">
import { OgChangelog, type OgChangelogMode, type OgChangelogTone } from "@baby-ui/svelte";
import { OG_CHANGELOG } from "../data/og-samples";
import OgFrame from "./og-frame.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<OgFrame>
	<OgChangelog
		{...OG_CHANGELOG}
		version={(props.version as string) || "v2.4.0"}
		headline={(props.headline as string) || "Charts land, dialogs grow from their trigger"}
		site={(props.site as string) || "baby ui"}
		date={(props.date as string) ?? undefined}
		mode={(props.mode as OgChangelogMode) ?? "light"}
		tone={(props.tone as OgChangelogTone) ?? "chart"}
	/>
</OgFrame>
