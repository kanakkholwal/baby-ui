<script lang="ts">
import { Section } from "@better-svelte-email/components";
import type { Snippet } from "svelte";
import { type EmailCalloutTone, emailCallout } from "./variants";

let { children, tone = "neutral" }: { children: Snippet; tone?: EmailCalloutTone } =
	$props();
</script>

<Section class={emailCallout({ tone })}>{@render children()}</Section>
