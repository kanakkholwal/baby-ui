<script lang="ts">
import IconArrowsMaximize from "@tabler/icons-svelte/icons/arrows-maximize";
import IconDeviceDesktop from "@tabler/icons-svelte/icons/device-desktop";
import IconDeviceMobile from "@tabler/icons-svelte/icons/device-mobile";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import IconX from "@tabler/icons-svelte/icons/x";

let {
	viewport = $bindable(),
	fullscreen = $bindable(),
	onReload,
}: {
	viewport: "desktop" | "mobile";
	fullscreen: boolean;
	onReload: () => void;
} = $props();

const button =
	"grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground aria-pressed:bg-foreground/[0.06] aria-pressed:text-foreground";
</script>

<div class="flex shrink-0 items-center gap-0.5 rounded-full border border-border bg-card/20 p-1">
	<button
		type="button"
		aria-label="Desktop viewport"
		aria-pressed={viewport === "desktop"}
		onclick={() => (viewport = "desktop")}
		class={button}
	>
		<IconDeviceDesktop size={15} stroke={1.6} />
	</button>
	<button
		type="button"
		aria-label="Mobile viewport"
		aria-pressed={viewport === "mobile"}
		onclick={() => (viewport = "mobile")}
		class={button}
	>
		<IconDeviceMobile size={15} stroke={1.6} />
	</button>
	<button type="button" aria-label="Reload preview" onclick={onReload} class={button}>
		<IconRefresh size={15} stroke={1.6} />
	</button>
	<button
		type="button"
		aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen preview"}
		onclick={() => (fullscreen = !fullscreen)}
		class={button}
	>
		{#if fullscreen}
			<IconX size={15} stroke={1.6} />
		{:else}
			<IconArrowsMaximize size={15} stroke={1.6} />
		{/if}
	</button>
</div>
