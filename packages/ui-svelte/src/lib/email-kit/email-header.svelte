<script lang="ts">
import { Img, Section, Text } from "@better-svelte-email/components";
import { type EmailHeaderAlign, emailHeader } from "./variants";

let {
	brand,
	logo,
	logoWidth = 32,
	align = "left",
}: {
	brand: string;
	/** Absolute URL: inboxes cannot resolve relative paths. */
	logo?: string;
	logoWidth?: number;
	align?: EmailHeaderAlign;
} = $props();

const s = $derived(emailHeader({ align }));
</script>

<Section class={s.root()}>
	{#if logo}
		<Img src={logo} alt={brand} width={String(logoWidth)} height="32" class={s.logo()} />
	{:else}
		<Text class={s.brand()}>{brand}</Text>
	{/if}
</Section>
