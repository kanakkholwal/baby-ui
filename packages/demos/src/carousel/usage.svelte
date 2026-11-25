<script lang="ts">
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselThumb,
	CarouselThumbs,
} from "@baby-ui/svelte";

let { rooms }: { rooms: { name: string; image: string }[] } = $props();
let index = $state(0);
</script>

<Carousel label="Rooms at the Harbour" bind:index>
	<CarouselContent>
		{#each rooms as room (room.name)}
			<CarouselItem>
				<img src={room.image} alt={room.name} class="aspect-[4/3] w-full rounded-xl object-cover" />
			</CarouselItem>
		{/each}
	</CarouselContent>
	<CarouselPrevious />
	<CarouselNext />
	<CarouselDots />
	<CarouselThumbs>
		{#each rooms as room (room.name)}
			<CarouselThumb><img src={room.image} alt="" /></CarouselThumb>
		{/each}
	</CarouselThumbs>
</Carousel>
