import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";

const contentStyle: React.CSSProperties = {
	margin: "auto",
	maxHeight: "115px",
	maxWidth: "100%",
	alignSelf: "center",
	padding: "5px",
};

export const ImageCarousel = ({ amiibo, slideNumber }: any) => {
	const carouselRef = React.createRef<any>();
	const carouselStyle: React.CSSProperties = {
		margin: "10px 0px 0px",
		height: "150px",
		width: "100%",
	};

	const divStyle = {
		display: "flex",
		padding: "10px",
	};

	useEffect(() => {
		carouselRef.current.goTo(slideNumber);
	}, [slideNumber]);
	return (
		<Carousel
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
