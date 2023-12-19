import { TCardRef } from "../pages/inventory/Inventory";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";

export const InventoryCardDisplay = ({
	cardNumber,
	nonFoil,
	image,
	foil,
	wave,
	cardId,
}: TCardRef) => {
	const updatedUrl =
		wave === 1
			? foil
				? image.replace("large", "foil")
				: image.replace("large", "small")
			: image;
	const totalCards = (foil ? foil : 0) + (nonFoil ? nonFoil : 0);
	return (
		<div className="inventory-card-display">
			<h4>card # {cardNumber}</h4>
			<SmallCardImageAboveInput imageUrl={updatedUrl} imageWidth="75px" />
			<div className="card-info">
				<h5>foil = {foil}</h5>
				<h5>nonfoil = {nonFoil}</h5>
				{totalCards > 4 && <h5>Extra = {totalCards - 4}</h5>}
			</div>
		</div>
	);
};
