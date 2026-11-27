import {
	Lightbox,
	LightboxBody,
	LightboxClose,
	LightboxContent,
	LightboxCounter,
	LightboxFilmstrip,
	LightboxNext,
	LightboxPrevious,
	LightboxStage,
	LightboxToolbar,
	LightboxTrigger,
	LightboxZoom,
} from "@baby-ui/react";

const images = [
	{ src: "/photos/one.jpg", alt: "A harbour at dawn" },
	{ src: "/photos/two.jpg", alt: "A street market" },
];

export function Example() {
	return (
		<Lightbox images={images}>
			<div className="grid w-full max-w-md grid-cols-3 gap-2">
				{images.map((image, index) => (
					<LightboxTrigger key={image.src} index={index} aria-label={`Open ${image.alt}`}>
						<img
							src={image.src}
							alt=""
							className="block aspect-[4/3] w-full rounded-lg object-cover"
						/>
					</LightboxTrigger>
				))}
			</div>
			<LightboxContent>
				<LightboxToolbar>
					<LightboxPrevious />
					<LightboxCounter />
					<LightboxNext />
					<LightboxZoom className="mx-auto" />
					<LightboxClose />
				</LightboxToolbar>
				<LightboxBody>
					<LightboxStage />
				</LightboxBody>
				<LightboxFilmstrip />
			</LightboxContent>
		</Lightbox>
	);
}
