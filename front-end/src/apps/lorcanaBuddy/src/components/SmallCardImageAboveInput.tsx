import { Image } from "antd";
import { getImageUrl } from "../utils/image-util";

type TProps = {
	imageUrl: string | undefined;
	imageWidth: string;
	opacity?: string;
	wave: number;
};

export const SmallCardImageAboveInput = ({ imageUrl, imageWidth, opacity, wave }: TProps) => {
	return (
		<div style={{ minHeight: "140px" }}>
			<Image
				src={imageUrl}
				style={{
					width: imageWidth,
					borderRadius: "3px",
					opacity: opacity && parseFloat(opacity),
				}}
			/>
		</div>
	);
};
