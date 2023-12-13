import { TCardRef } from "../pages/inventory/Inventory";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";

export const InventoryCardDisplay = ({ cardNumber, nonFoil, image, foil, wave }: TCardRef) => {
	const updatedUrl =
		foil && wave === 1 ? image.replace("large", "foil") : image.replace("large", "small");
	const totalCards = foil + nonFoil;
	return (
		<div className="inventory-card-display">
			<SmallCardImageAboveInput imageUrl={updatedUrl} imageWidth="75px" />
			<div className="card-info">
				<h4>Card Number : {cardNumber}</h4>
				<h5>foil = {foil}</h5>
				<h5>nonfoil = {nonFoil}</h5>
				{totalCards > 4 && <h5>Extra = {totalCards - 4}</h5>}
			</div>
		</div>
	);
};
