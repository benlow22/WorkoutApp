import { Image } from "antd";
import { getImageUrl } from "../utils/image-util";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";

type TProps = {
	num: string;
	wave: number;
};

export const NewSmallCardImageAboveInput = ({ num, wave }: TProps) => {
	const [imageUrl, setimageUrl] = useState<string>("/lorcanaRarity/lorcana-cardback.jpg");

	const { lorcanaCards } = useContext(AuthContext);

	const getImageUrl = (cardNumber: string) => {
		if (cardNumber) {
			const card = lorcanaCards.filter((card) => card.card_num === cardNumber && card.set_num === wave);
			setimageUrl(card[0] ? card[0].image : "/lorcanaRarity/lorcana-cardback.jpg");
		} else {
			setimageUrl("/lorcanaRarity/lorcana-cardback.jpg");
		}
	};

	useEffect(() => {
		getImageUrl(num);
	}, [num]);
	return (
		<div style={{ minHeight: "70px" }}>
			<p>{num}</p>
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
