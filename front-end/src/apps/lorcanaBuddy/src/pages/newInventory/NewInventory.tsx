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
	const { lorcanaCards, supabase } = useContext(AuthContext);
	const [allCardsAndUserData, setAllCardsAndUserData] = useState<TNewCardAndUserData[]>();

	//Test Variables
	const [firstCard, setFirstCard] = useState<TNewCard>();
	const [testSmallBatch, setTestSmallBatch] = useState<TNewCard[]>(lorcanaCards.slice(0, 59));

	const allLorcanaCards = useMemo(() => lorcanaCards, [lorcanaCards]);

	const getAllCardsAndUsersCards = async () => {
		let { data, error } = await supabase
			// @ts-expect-error does not get type for the join
			.rpc("new_get_all_cards_plus_user_data")
			.select(
				"id ,abilities ,card_num ,card_variants ,franchise ,color ,inkable ,rarity ,type ,name ,classifications ,cost ,strength ,willpower  ,body_text ,set_name ,set_num ,unique_id ,artist ,image ,set_id , move_cost ,foil ,nonfoil ,user_id , lore"
			)
			//sort by set number than id to deal with puppies who have 4a,4b,4c...
			.order("set_num")
			.order("unique_id");
		if (data) {
			setAllCardsAndUserData(data);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllCardsAndUsersCards();
	}, []);

	return (
		<div className="inventory-page" style={{ display: "flex", flexWrap: "wrap", maxWidth: "1000px", margin: "auto" }}>
			<div className="3x3" style={{}}>
				<div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
					{allCardsAndUserData && allCardsAndUserData.map((card) => <NewInventoryCard card={card} key={card.id} />)}
				</div>
			</div>
		</div>
	);
};
