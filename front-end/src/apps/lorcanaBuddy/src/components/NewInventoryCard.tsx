import { TNewCard, TNewCardAndUserData } from "../pages/newInventory/NewInventory";

type TProps = {
	card: TNewCardAndUserData;
};

import { Image } from "antd";

export const NewInventoryCard = ({ card }: TProps) => {
	const totalQuantity = card.foil + card.nonfoil;
	return (
		<div style={{ backgroundColor: "", margin: "3px", display: "flex", flexWrap: "wrap", width: "100px" }}>
			<Image
				width={100}
				style={{ borderRadius: "5px", opacity: totalQuantity > 0 ? "1" : "0.3" }}
				src={card.image}
				fallback={"/lorcanaRarity/lorcana-cardback.jpg"}
			/>
			<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<div>
					<p style={{ color: card.foil + card.nonfoil > 3 ? "green" : "red", padding: " 5px", fontSize: "10px" }}>{card.card_num}</p>
				</div>
				<div style={{ display: "flex", width: "70px", justifyContent: "space-between" }}>
					<div style={{ padding: "2px 3px", width: "30px" }}>
						<p style={{ fontSize: "10px", color: card.foil > 0 ? "green" : "red" }}>f: {card.foil}</p>
					</div>
					<div style={{ padding: "2px 5px", width: "60px" }}>
						<p style={{ fontSize: "10px", color: card.nonfoil > 3 ? "green" : "red" }}>nf: {card.nonfoil}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
