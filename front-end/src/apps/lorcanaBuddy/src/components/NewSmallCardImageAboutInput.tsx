import { Image } from "antd";
import { getImageUrl } from "../utils/image-util";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";

type TProps = {
	imageUrl: string | undefined;
};

export const NewSmallCardImageAboveInput = ({ imageUrl }: TProps) => {
	return (
		<div style={{ minHeight: "70px" }}>
			<Image
				src={imageUrl}
				style={{
					width: "100px",
					borderRadius: "10px",
					// opacity: opacity && parseFloat(opacity),
				}}
			/>
		</div>
	);
};
