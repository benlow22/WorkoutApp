import { TNewCard } from "../pages/newInventory/NewInventory";

type TProps = {
	card: TNewCard;
};

import { Image } from "antd";

export const NewInventoryCard = ({ card }: TProps) => {
	return (
		<div style={{ backgroundColor: "", margin: "1px", display: "flex", flexWrap: "wrap", width: "100px" }}>
			<Image width={100} style={{ borderRadius: "5px" }} src={card.image} fallback={"/public/lorcanaRarity/lorcana-cardback.jpg"} />
			<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<div>
					<p style={{ color: "white" }}>{card.card_num}</p>
				</div>
				<div style={{ display: "flex" }}>
					<p style={{ fontSize: "10px" }}>foils:</p>
					<p style={{ fontSize: "10px" }}>non-foils:</p>
				</div>
			</div>
		</div>
	);
};
