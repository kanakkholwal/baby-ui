<script lang="ts">
import { LIGHTBOX_ICONS, type LightboxIcon } from "../icons";

let { name }: { name: LightboxIcon } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={LIGHTBOX_ICONS[name]} />
</svg>
