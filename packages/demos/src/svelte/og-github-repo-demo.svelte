<script lang="ts">
import {
	OgGithubRepo,
	type OgGithubRepoMode,
	type OgGithubRepoTone,
} from "@baby-ui/svelte";
import { OG_GITHUB_REPO } from "../data/og-samples";
import OgFrame from "./og-frame.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<OgFrame>
	<OgGithubRepo
		{...OG_GITHUB_REPO}
		owner={(props.owner as string) || "kanakkholwal"}
		name={(props.name as string) || "baby-ui"}
		description={(props.description as string) ?? undefined}
		language={(props.language as string) ?? undefined}
		mode={(props.mode as OgGithubRepoMode) ?? "light"}
		tone={(props.tone as OgGithubRepoTone) ?? "chart"}
	/>
</OgFrame>
