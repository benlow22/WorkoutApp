import { TNewCard } from "./NewInventory";

type TProps = {
	card: TNewCard;
};

import { Image } from "antd";

export const NewInventoryCard = ({ card }: TProps) => {
	return (
		<div style={{ margin: "3px", display: "flex", flexWrap: "wrap", width: "100px" }}>
			<Image width={99} style={{ borderRadius: "5px" }} src={card.image} fallback={"/lorcanaRarity/lorcana-cardback.jpg"} />
			<div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "13px" }}>
				<div>
					<p style={{ color: "black", fontSize: "10px", verticalAlign: "top", width: "19px" }}>{card.card_num}</p>
				</div>
				<div style={{ display: "flex" }}>
					<p style={{ color: "#E7C404", fontSize: "12px" }}>&#x25A2;</p>
					<p style={{ color: "black", fontSize: "12px", padding: "0px 3px" }}>&#x25A2;&#x25A2;&#x25A2;&#x25A2;</p>
					<p style={{ color: "#7E7E7E", fontSize: "12px", paddingRight: "3px" }}>&#x25A2;</p>

					{/* <p style={{ fontSize: "10px" }}>foils:</p>
					<p style={{ fontSize: "10px" }}>non-foils:</p> */}
				</div>
			</div>
		</div>
	);
};
