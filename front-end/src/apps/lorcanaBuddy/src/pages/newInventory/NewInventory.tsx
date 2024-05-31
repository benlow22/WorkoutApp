import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { NewInventoryCard } from "../../components/NewInventoryCard";

export type TCardRef = {
	cardNumber: number;
	foil?: number;
	nonFoil?: number;
	wave: number;
	userId?: string;
	image: string;
	cardId: string;
};

export type TNewCard = {
	Abilities: string;
	Artist: string;
	Body_Text: string;
	Card_Num: string;
	Card_Variants: string | null;
	Classifications: string;
	Color: string;
	Cost: number;
	Franchise: string | null;
	ID: string;
	Image: string;
	Inkable: boolean;
	Lore: number;
	Move_Cost: number | null;
	Name: string;
	Rarity: string;
	Set_ID: string;
	Set_Name: string;
	Set_Num: number;
	Strength: string;
	Type: string;
	Unique_ID: string;
	Willpower: number;
};

/// when adding new cards,
// change wave and uncomment
export const NewInventory = () => {
	const { lorcanaCards } = useContext(AuthContext);

	//Test Variables
	const [firstCard, setFirstCard] = useState<TNewCard>();
	const [testSmallBatch, setTestSmallBatch] = useState<TNewCard[]>(lorcanaCards.slice(0, 59));

	const allLorcanaCards = useMemo(() => lorcanaCards, [lorcanaCards]);

	return (
		<div className="inventory-page" style={{ display: "flex", flexWrap: "wrap" }}>
			<div className="3x3" style={{}}>
				<div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
					{allLorcanaCards && allLorcanaCards.map((card) => <NewInventoryCard card={card} key={card.ID} />)}
				</div>
			</div>
		</div>
	);
};
