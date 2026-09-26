import { DraggableMarquee } from "@baby-ui/react";

export function Example({ logos }: { logos: { src: string; alt: string }[] }) {
	return (
		<DraggableMarquee pauseOnHover>
			{logos.map((logo) => (
				<img key={logo.src} src={logo.src} alt={logo.alt} className="h-10" />
			))}
		</DraggableMarquee>
	);
}
