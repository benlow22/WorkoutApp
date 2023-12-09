import { TLorcanaCard } from "../types/lorcana.types";

import { TCardRef } from "../pages/inventory/Inventory";
import { GridItem } from "./GridItem";

type TProps = {
	allCards: TLorcanaCard[];
	usersCards: TCardRef[];
};

export const GridCardDisplay = ({ allCards, usersCards }: TProps) => {
	return (
		<div className="grid-card-display">
			<h1>GRID</h1>
			{allCards.map((card) => (
				<GridItem card={card} />
			))}
			{/* {allCardsCache.map(())}
			<SmallCardImageAboveInput imageUrl={allCardsCache.a.updatedUrl} imageWidth="75px" />
			<div className="card-info">
				<h4>Card Number : {cardNumber}</h4>
				<h5>Quantity = {quantity}</h5>
				{quantity > 4 && <h5>Extra = {quantity - 4}</h5>}
			</div> */}
		</div>
	);
};
