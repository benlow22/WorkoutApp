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

export type TNewCardAndUserData = TNewCard & {
	foil: number;
	nonfoil: number;
	user_id: string;
};
/// when adding new cards,
// change wave and uncomment
export const NewInventory = () => {
	const { supabase, userId, auth, allCardsAndUserData } = useContext(AuthContext);
	const [cardQuantities, setCardQuantities] = useState<{
		foil: number;
		nonfoil: number;
	}>({
		foil: 0,
		nonfoil: 0,
	});

	const getQuantityOfCards = async () => {
		let { data, error } = await supabase
			// @ts-expect-error does not get type for the join
			.rpc("new_get_card_quantities")
			.eq("user_id", userId)
			.single();
		if (data) {
			// console.log("quantity", data);
			setCardQuantities(data);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		if (auth) {
			getQuantityOfCards();
		}
	}, [auth]);

	return (
		<div className="inventory-page" style={{ display: "flex", flexWrap: "wrap", maxWidth: "1000px", margin: "auto" }}>
			<div className="3x3" style={{}}>
				<h3>Total Cards : {cardQuantities.foil + cardQuantities.nonfoil}</h3>
				<h4>Foil Cards : {cardQuantities.foil}</h4>
				<h4>Nonfoil Cards : {cardQuantities.nonfoil}</h4>
				<div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
					{allCardsAndUserData && allCardsAndUserData.map((card) => <NewInventoryCard card={card} key={card.id} />)}
				</div>
			</div>
		</div>
	);
};
