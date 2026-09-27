<script lang="ts">
import { Link, Section, Text } from "@better-svelte-email/components";
import { type EmailFooterAlign, emailFooter } from "./variants";

export interface EmailFooterLink {
	label: string;
	href: string;
}

let {
	lines,
	links = [],
	align = "center",
}: {
	/** Sender identity and postal address: required for commercial mail in many regions. */
	lines: string[];
	links?: EmailFooterLink[];
	align?: EmailFooterAlign;
} = $props();

const s = $derived(emailFooter({ align }));
</script>

<Section class={s.root()}>
	{#each lines as line (line)}
		<Text class={s.text()}>{line}</Text>
	{/each}
	{#if links.length > 0}
		<Text class={s.text()}>
			{#each links as link, i (link.href)}{#if i > 0}{" · "}{/if}<Link href={link.href} class={s.link()}>{link.label}</Link>{/each}
		</Text>
	{/if}
</Section>
