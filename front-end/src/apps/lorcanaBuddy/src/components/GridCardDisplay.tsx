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

	useEffect(() => {
		getAllCardsAndUsersCards();
	}, []);

	return (
		<div className="grid-card-display">
			{allCardAndUserCardInfo &&
				allCardAndUserCardInfo.map((card) => (
					<GridItem card={card} key={`gridItem-${card.id}`} />
				))}
			<h1>hi</h1>
		</div>
	);
};
