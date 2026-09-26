import { ArtGallery, type ArtGalleryItem } from "@baby-ui/react";

export function Example({ works }: { works: ArtGalleryItem[] }) {
	return <ArtGallery items={works} className="h-[28rem]" />;
}
