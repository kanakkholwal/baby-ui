<script lang="ts">
import { WheelCarousel, type WheelCarouselItem } from "@baby-ui/svelte";

let { projects }: { projects: WheelCarouselItem[] } = $props();
let active = $state(0);
</script>

<WheelCarousel items={projects} bind:activeIndex={active} class="h-[28rem]" />
