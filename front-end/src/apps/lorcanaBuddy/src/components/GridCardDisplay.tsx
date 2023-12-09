import { TLorcanaCard } from "../types/lorcana.types";

import { TCardRef } from "../pages/inventory/Inventory";
import { GridItem } from "./GridItem";
import { supabase } from "../../../../supabase/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";

export interface ICardAndUserInfo extends TLorcanaCard {
	isFoil: boolean;
	userId: string;
	quantity: number;
}

type TProps = {
	usersCards: TCardRef[];
};
export const GridCardDisplay = ({ usersCards }: TProps) => {
	const [allCardAndUserCardInfo, setAllCardAndUserCardInfo] = useState<ICardAndUserInfo[]>();
	const [allCards, setAllCards] = useState<TLorcanaCard[]>([]);
	const { userId, supabase } = useContext(AuthContext);
	// const getAllCardsAndUsers = async () => {
	// 	console.log("NEW");
	// 	let { data, error } = await supabase.from("lorcana_cards_with_users1").select("id, cardNumber: card_number, colour, inkable, rarity, type, name, classification, cost, strength, willpower, lore, abilities, bodyText:body_text, flavourText:flavour_text, setName:set_name, wave, artist, imageUrl: image,setId:set_id, isFoil: is_foil, userId: user_id, quantity)");
	// 	if (data) {
	// 		console.log("all cards &&&", data);
	// 		// @ts-expect-error does not get type for the join

	// 		setAllCardAndUserCardInfo(data);
	// 	} else {
	// 		console.error(error);
	// 	}
	// };

	const getAllCards = async () => {
		let { data, error } = await supabase.from("lorcana_cards").select("id, cardNumber: card_number, colour, inkable, rarity, type, name, classification, cost, strength, willpower, lore, abilities, bodyText:body_text, flavourText:flavour_text, setName:set_name, wave, artist, imageUrl: image,setId:set_id");
		if (data) {
			console.log("all cards &&&", data);
			setAllCards(data);
		} else {
			console.error(error);
		}
	};
	useEffect(() => {
		// getAllCardsAndUsers();

		getAllCards();
	}, []);
	return (
		<div className="grid-card-display">
			{allCards && allCards.map((card) => <GridItem card={card} usersCards={usersCards} />)}
			<h1>hi</h1>
		</div>
	);
};
