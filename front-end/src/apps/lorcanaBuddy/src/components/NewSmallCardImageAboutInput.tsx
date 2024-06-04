import { Image } from "antd";
import { getImageUrl } from "../utils/image-util";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";

type TProps = {
	cardNumber: string;
	wave: number;
};

export const NewSmallCardImageAboveInput = ({ cardNumber, wave }: TProps) => {
	const { auth, userId, refreshLorcanaCardImage, lorcanaCards } = useContext(AuthContext);
	const imageUrl = lorcanaCards.filter((card) => {
		if (card.set_num === wave && card.card_num === cardNumber) {
			return card.image;
		}
	});
	console.log(imageUrl);
	return (
		<div style={{ minHeight: "70px" }}>
			<Image
				src={imageUrl}
				style={{
					// width: imageWidth,
					borderRadius: "3px",
					// opacity: opacity && parseFloat(opacity),
				}}
			/>
		</div>
	);
};
