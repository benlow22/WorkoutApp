import React, { useState } from "react";
import { Carousel } from "antd";
import { CarouselImage } from "./CarouselImage";

const contentStyle: React.CSSProperties = {
	margin: "auto",
	maxHeight: "115px",
	maxWidth: "100%",
	alignSelf: "center",
	padding: "5px",
};

export const ImageCarousel = ({ amiibo }: any) => {
	const onChange = (currentSlide: number) => {
		console.log(currentSlide);
	};

	const carouselStyle: React.CSSProperties = {
		margin: "10px 0px 0px",
		height: "150px",
		width: "100%",
	};

	const divStyle = {
		display: "flex",
	};
	const [zoomed, setZoomed] = useState(false);

	return (
		<Carousel afterChange={onChange} style={carouselStyle} arrows={true}>
			<div className="carousel-slide">
				<img src={amiibo.image} style={contentStyle} />
			</div>
			{amiibo.photoPaths.map((photoPath: string, index: number) => {
				let src = `https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/${amiibo.user_id}/${amiibo.pack_id}/${photoPath}.png`;
				let alt = `${amiibo.name} from ${amiibo.series} amiibo`;
				return (
					<div
						className="carousel-slide"
						key={index}
						style={divStyle}
					>
						<CarouselImage
							src={src}
							alt={alt}
							style={contentStyle}
						/>
					</div>
				);
			})}
		</Carousel>
	);
};
// ;https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/${amiibo.user_id}/${amiibo.pack_id}/${amiibo.thumbnail_url}.png

// https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/d79ccff2-0177-46e8-93a2-ea3353691d28/4d2a3a2d-edb8-4210-9dd1-ccfafac80917/rc-upload-1692916524847-4.png
