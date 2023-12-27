import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import lorcanaMickey from "../../../../../images/lorcanaMickey.avif";
import { GridCardDisplay, ICardAndUserInfo } from "../../components/GridCardDisplay";
import { supabase } from "../../../../../supabase/supabaseClient";

export const MyCollection = () => {
	const { auth, username, usersLorcanaCards } = useContext(AuthContext);
	const [filteredCards, setFilteredCards] = useState<ICardAndUserInfo[] | undefined>();
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
			setFilteredCards(data);
		} else {
			console.error(error);
		}
	};
	useEffect(() => {
		getAllCardsAndUsersCards();
	}, []);
	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			{filteredCards && (
				<div className="page-heading">
					<h2>My Collection</h2>
					<GridCardDisplay allCardsAndUsersCards={usersLorcanaCards} />
				</div>
			)}
		</>
	);
};
