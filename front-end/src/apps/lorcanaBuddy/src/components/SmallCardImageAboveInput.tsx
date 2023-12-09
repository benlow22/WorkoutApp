import { Image } from "antd";

type TProps = {
	imageUrl: string;
	imageWidth: string;
	opacity?: string;
};

export const SmallCardImageAboveInput = ({ imageUrl, imageWidth, opacity }: TProps) => {
	return (
		<div style={{ minHeight: "70px" }}>
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
