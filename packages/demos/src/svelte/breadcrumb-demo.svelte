<script lang="ts">
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const collapsed = $derived(props.collapsed !== false);
</script>

<Breadcrumb>
	<BreadcrumbList>
		<BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
		<BreadcrumbSeparator />
		{#if collapsed}
			<BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
		{:else}
			<BreadcrumbItem>
				<BreadcrumbLink href="/components">Components</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/components/base">Base</BreadcrumbLink>
			</BreadcrumbItem>
		{/if}
		<BreadcrumbSeparator />
		<BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>
