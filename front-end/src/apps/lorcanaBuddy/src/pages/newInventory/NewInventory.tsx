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
	abilities: string;
	artist: string;
	body_text: string;
	card_num: string;
	card_variants: string | null;
	classifications: string;
	color: string;
	cost: number;
	franchise: string | null;
	id: string;
	image: string;
	inkable: boolean;
	lore: number;
	move_cost: number | null;
	name: string;
	rarity: string;
	set_id: string;
	set_name: string;
	set_num: number;
	strength: number;
	type: string;
	unique_id: string;
	willpower: number;
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
					{allLorcanaCards && allLorcanaCards.map((card) => <NewInventoryCard card={card} key={card.id} />)}
				</div>
			</div>
		</div>
	);
};
