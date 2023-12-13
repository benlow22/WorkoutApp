import { TLorcanaCard } from "../types/lorcana.types";

import { TCardRef } from "../pages/inventory/Inventory";
import { GridItem } from "./GridItem";
import { supabase } from "../../../../supabase/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";

export interface ICardAndUserInfo extends TLorcanaCard {
	foil: number;
	nonFoil: number;
}

type TProps = {
	usersCards: TCardRef[];
};
export const GridCardDisplay = ({ usersCards }: TProps) => {
	const [allCardAndUserCardInfo, setAllCardAndUserCardInfo] = useState<ICardAndUserInfo[]>();
	const [allCards, setAllCards] = useState<TLorcanaCard[]>([]);
	const { userId, supabase } = useContext(AuthContext);
	const getAllCardsAndUsersCards = async () => {
		let { data, error } = await supabase
			// @ts-expect-error does not get type for the join
			.rpc("get_all_cards_plus_user_data")
			.select(
				"id, abilities, cardNumber: card_number , colour , inkable , rarity , type , name , classification , cost , strength, willpower , lore , bodyText: body_text , flavourText: flavour_text , setName: set_name , wave , artist , imageUrl: image ,setId: set_id ,foil , nonFoil: nonfoil "
			)
			.order("wave")
			.order("card_number");

		if (data) {
			console.log("get all cards", data);
			setAllCardAndUserCardInfo(data);
		} else {
			console.error(error);
		}
	};

	// const getAllCards = async () => {
	// 	let { data, error } = await supabase
	// 		.from("lorcana_cards")
	// 		.select(
	// 			"id, cardNumber: card_number, colour, inkable, rarity, type, name, classification, cost, strength, willpower, lore, abilities, bodyText:body_text, flavourText:flavour_text, setName:set_name, wave, artist, imageUrl: image,setId:set_id"
	// 		);
	// 	console.log("all cards &1212121");
	// 	if (data) {
	// 		console.log("all cards &&&", data);
	// 		setAllCards(data);
	// 	} else {
	// 		console.error(error);
	// 	}
	// };
	useEffect(() => {
		getAllCardsAndUsersCards();

		// getAllCards();
	}, []);
	return (
		<div className="grid-card-display">
			{allCardAndUserCardInfo &&
				allCardAndUserCardInfo.map((card) => <GridItem card={card} />)}
			<h1>hi</h1>
		</div>
	);
};
