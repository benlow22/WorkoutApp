import React, { useState } from "react";
import { Carousel } from "antd";
import Image from "react-image-enlarger";

export const CarouselImage = ({ src, alt }: any) => {
	const [zoomed, setZoomed] = useState(false);

	return (
		<Image
			style={{ width: "100%", maxHeight: "auto" }}
			zoomed={zoomed}
			src={src}
			alt={alt}
			onClick={() => setZoomed(true)}
			onRequestClose={() => setZoomed(false)}
		/>
	);
};
