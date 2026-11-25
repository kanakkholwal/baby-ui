"use client";

import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselThumb,
	CarouselThumbs,
} from "@baby-ui/react";
import { useState } from "react";

export function Example({ rooms }: { rooms: { name: string; image: string }[] }) {
	const [index, setIndex] = useState(0);

	return (
		<Carousel label="Rooms at the Harbour" index={index} onIndexChange={setIndex}>
			<CarouselContent>
				{rooms.map((room) => (
					<CarouselItem key={room.name}>
						<img
							src={room.image}
							alt={room.name}
							className="aspect-[4/3] w-full rounded-xl object-cover"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
			<CarouselDots />
			<CarouselThumbs>
				{rooms.map((room) => (
					<CarouselThumb key={room.name}>
						<img src={room.image} alt="" />
					</CarouselThumb>
				))}
			</CarouselThumbs>
		</Carousel>
	);
}
