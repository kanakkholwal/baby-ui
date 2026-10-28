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
</script>

<Breadcrumb>
	<BreadcrumbList>
		<BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>
