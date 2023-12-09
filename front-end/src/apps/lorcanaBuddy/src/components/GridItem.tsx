import { TLorcanaCard } from "../types/lorcana.types";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";

type TProps = {
	card: TLorcanaCard;
};

export const GridItem = ({ card }: TProps) => {
	return (
		<div className="grid-card-item">
			<h1>grid CARD Item</h1>
			<SmallCardImageAboveInput imageUrl={card.imageUrl} imageWidth="100px" />
		</div>
	);
};
