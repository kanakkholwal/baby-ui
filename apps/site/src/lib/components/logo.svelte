<script lang="ts">
let { class: classProp }: { class?: string } = $props();
</script>

<!-- One path, even-odd: the tile is filled and the "b" is cut out of it, so the mark
     inherits currentColor and needs no second colour to read. -->
<svg viewBox="0 0 24 24" aria-hidden="true" class={classProp}>
	<path
		fill="currentColor"
		fill-rule="evenodd"
		d="M7 0h10a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7z
		   M7.3 4.6a1.3 1.3 0 0 1 1.3 1.3v12.2a1.3 1.3 0 1 1-2.6 0V5.9a1.3 1.3 0 0 1 1.3-1.3z
		   M8.6 14.5a4.9 4.9 0 1 0 9.8 0 4.9 4.9 0 1 0-9.8 0z
		   M11.1 14.5a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 1 0-4.8 0z"
	/>
</svg>
