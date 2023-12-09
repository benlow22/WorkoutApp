import { Image } from "antd";

type TProps = {
	imageUrl: string;
	imageWidth: string;
};

export const SmallCardImageAboveInput = ({ imageUrl, imageWidth }: TProps) => {
	return (
		<div style={{ minHeight: "70px" }}>
			<Image
				src={imageUrl}
				style={{
					width: imageWidth,
					borderRadius: "3px",
				}}
			/>
		</div>
	);
};
