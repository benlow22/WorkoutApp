import { Form } from "antd";
import { useEffect, useState } from "react";
import { TLorcanaCard } from "../../types/lorcana.types";
import { supabase } from "../../../../../supabase/supabaseClient";

export const AddItems = () => {
	// store all the cards as state
	const [allCards, setAllCards] = useState<TLorcanaCard[]>([]);

	// get all cards from supabase
	const getCards = async () => {
		let { data, error } = await supabase
			.from("lorcana_cards")
			.select(
				"id, cardNumber: card_number, colour, inkable, rarity, type, name, classification, cost, strength, willpower, lore, abilities, bodyText:body_text, flavourText:flavour_text, setName:set_name, set, artist, imageUrl: image,setId:set_id "
			);
		if (data) {
			console.log(data);
			setAllCards(data);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getCards();
	}, []);

	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
};
