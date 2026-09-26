<script lang="ts">
import { InfiniteImageField } from "@baby-ui/svelte";

const images = ["/photos/one.jpg", "/photos/two.jpg", "/photos/three.jpg"];
</script>

<InfiniteImageField {images} />
