import { Image } from "antd";
import { getImageUrl } from "../utils/image-util";

type TProps = {
	imageUrl: string;
	imageWidth: string;
	opacity?: string;
	wave: number;
};

export const SmallCardImageAboveInput = ({
	imageUrl,
	imageWidth,
	opacity,
	wave,
}: TProps) => {
	// console.log("WAVE: ", wave, imageUrl);
	return (
		<div style={{ minHeight: "70px" }}>
			<Image
				src={getImageUrl(imageUrl)}
				style={{
					width: imageWidth,
					borderRadius: "3px",
					opacity: opacity && parseFloat(opacity),
				}}
			/>
		</div>
	);
};
