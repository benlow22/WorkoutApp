import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import { CarouselImage } from "./CarouselImage";

const contentStyle: React.CSSProperties = {
	margin: "auto",
	maxHeight: "115px",
	maxWidth: "100%",
	alignSelf: "center",
	padding: "5px",
};

export const ImageCarousel = ({ amiibo, slideNumber }: any) => {
	const onChange = (currentSlide: number) => {
		console.log(currentSlide);
	};
	useEffect(() => {
		console.log("slideNumberimage", slideNumber);
	}, [slideNumber]);
	const carouselRef = React.createRef();
	const carouselStyle: React.CSSProperties = {
		margin: "10px 0px 0px",
		height: "150px",
		width: "100%",
	};

	const divStyle = {
		display: "flex",
		padding: "10px",
	};
	const [zoomed, setZoomed] = useState(false);

	useEffect(() => {
		carouselRef.current.goTo(slideNumber);
	}, [slideNumber]);
	return (
		<Carousel
			afterChange={onChange}
			style={carouselStyle}
			arrows={true}
			slickGoTo={slideNumber}
			ref={carouselRef}
		>
			<div className="carousel-slide">
				<Image src={amiibo.image} style={contentStyle} />
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
						<Image src={src} alt={alt} />
					</div>
				);
			})}
		</Carousel>
	);
};
// ;https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/${amiibo.user_id}/${amiibo.pack_id}/${amiibo.thumbnail_url}.png

// https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/d79ccff2-0177-46e8-93a2-ea3353691d28/4d2a3a2d-edb8-4210-9dd1-ccfafac80917/rc-upload-1692916524847-4.png
