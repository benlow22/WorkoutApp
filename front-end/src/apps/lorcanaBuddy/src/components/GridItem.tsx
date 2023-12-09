import { useEffect, useState } from "react";
import { TCardRef } from "../pages/inventory/Inventory";
import { TLorcanaCard } from "../types/lorcana.types";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { ICardAndUserInfo } from "./GridCardDisplay";
import { Space } from "antd";

type TProps = {
	card: ICardAndUserInfo;
};

export const GridItem = ({ card }: TProps) => {
	const [owned, setOwned] = useState<boolean>(false);
	useEffect(() => {
		if (card.quantity > 0) {
			setOwned(true);
		}
	}, [card]);
	return (
		<div className={`${owned ? "own-card" : "do-not-own"} grid-card-item `}>
			<SmallCardImageAboveInput imageUrl={card.imageUrl.replace("large", "small")} imageWidth="100px" opacity={owned ? "1" : "0.2"} />
			<Space style={{ display: "flex", justifyContent: "space-between" }}>
				<p>#{card.cardNumber}</p>
				<p>x{card.quantity}</p>
			</Space>
		</div>
	);
};
