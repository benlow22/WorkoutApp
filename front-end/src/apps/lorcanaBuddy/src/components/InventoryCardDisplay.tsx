import { useState } from "react";
import { TCardRef } from "../pages/inventory/Inventory";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
// import { SmallCardImageAboveInputInventory } from "./SmallCardImageAboveInputInventory";
import wave4items from "./wave4.json";

export const InventoryCardDisplay = ({ cardNumber, nonFoil, image, foil, wave, cardId }: TCardRef) => {
	const [imageUrl, setImageUrl] = useState<string | undefined>("");

	const updatedUrl = wave === 1 ? (foil ? image.replace("large", "foil") : image.replace("large", "small")) : image;
	const totalCards = (foil ? foil : 0) + (nonFoil ? nonFoil : 0);
	console.log("WAAAVE:", wave);
	// const newTestImage = wave4items.filter((card) => card.Set_Num === wave && card.Card_Num === cardNumber);
	if (cardNumber && cardNumber > 0 && cardNumber < 216) {
		const newTestImage = wave4items.filter((card) => card.Set_Num === wave && card.Card_Num === cardNumber);
		console.log("NEW test image:", newTestImage[0].Image);
		cardNumber ? setImageUrl(newTestImage[0].Image) : setImageUrl("");
	}
	return (
		<div className="inventory-card-display">
			<h4>card # {cardNumber}</h4>
			<SmallCardImageAboveInput imageUrl={imageUrl} imageWidth="75px" wave={wave} />
			<div className="card-info">
				<h5>foil = {foil}</h5>
				<h5>nonfoil = {nonFoil}</h5>
				{totalCards > 4 && <h5>Extra = {totalCards - 4}</h5>}
			</div>
		</div>
	);
};
