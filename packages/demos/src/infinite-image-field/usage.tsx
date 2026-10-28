import { InfiniteImageField, type InfiniteImageItem } from "@baby-ui/react";

export function Example({ works }: { works: InfiniteImageItem[] }) {
	return <InfiniteImageField items={works} variant="fisheye" />;
}
