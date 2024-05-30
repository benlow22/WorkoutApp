import { TNewCard } from "../pages/newInventory/NewInventory";

type TProps = {
	card: TNewCard;
};

import { Image } from "antd";

export const NewInventoryCard = ({ card }: TProps) => {
	return (
		<div>
			<h1>hi</h1>
			<h2>
				{card.Card_Num} {card.Set_Num}
			</h2>
			<Image width={100} src={card.Image} fallback={"/public/lorcanaRarity/lorcana-cardback.jpg"} />;
		</div>
	);
};
