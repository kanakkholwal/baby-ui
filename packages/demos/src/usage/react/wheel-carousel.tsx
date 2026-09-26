import { WheelCarousel, type WheelCarouselItem } from "@baby-ui/react";

export function Example({ projects }: { projects: WheelCarouselItem[] }) {
	return <WheelCarousel items={projects} className="h-[28rem]" />;
}
