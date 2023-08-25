import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
	margin: 0,
	width: "75%",
};

export const ImageCarousel = ({ amiibo }: any) => {
	const onChange = (currentSlide: number) => {
		console.log(currentSlide);
	};

	const carouselStyle: React.CSSProperties = {
		margin: 0,
		height: "100%",
		width: "100%",
	};

	return (
		<Carousel afterChange={onChange} style={carouselStyle}>
			<div>
				<img src={amiibo.image} style={contentStyle} />
			</div>
			<div>
				<h3 style={contentStyle}>2</h3>
			</div>
			<div>
				<h3 style={contentStyle}>3</h3>
			</div>
			<div>
				<h3 style={contentStyle}>4</h3>
			</div>
		</Carousel>
	);
};
