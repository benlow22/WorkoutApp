import React, { useState } from "react";
import { Carousel } from "antd";

export const CarouselImage = ({ src, alt }: any) => {
	return <Image src={src} alt={alt} preview={false} />;
};
