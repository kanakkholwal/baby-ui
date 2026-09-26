<script lang="ts">
import { StickyScrollCards } from "@baby-ui/svelte";

const cards = [
	{ title: "Misty Alps", src: "/photos/alps.jpg" },
	{ title: "Quiet Shore", src: "/photos/shore.jpg" },
	{ title: "Rolling Hills", src: "/photos/hills.jpg" },
];
</script>

<StickyScrollCards {cards} />
