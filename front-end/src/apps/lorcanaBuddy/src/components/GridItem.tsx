import { useEffect, useState } from "react";
import { TCardRef } from "../pages/inventory/Inventory";
import { TLorcanaCard } from "../types/lorcana.types";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { ICardAndUserInfo } from "./GridCardDisplay";
import { Space } from "antd";
import { supabase } from "../../../../supabase/supabaseClient";

type TProps = {
	card: TLorcanaCard;
	usersCards: TCardRef[];
};

type TGetFoilCardRef = {
	cardNumber: number;
	isFoil: boolean;
	wave: number;
	userId: string;
	quantity: number;
	cardId: string;
};
export const GridItem = ({ card, usersCards }: TProps) => {
	const [owned, setOwned] = useState<boolean>(false);
	const [cardsStats, setCardsStats] = useState<TCardRef[]>([]);
	const [foil, setFoil] = useState<TGetFoilCardRef>();
	const [nonFoil, setNonFoil] = useState<TGetFoilCardRef>();

	const checkForCardInfo = async () => {
		let { data: foilData, error } = await supabase.from("lorcana_users_cards_and_quantity").select("cardNumber: card_number, isFoil: is_foil, wave, userId: user_id, quantity, cardId: card_id").eq("card_id", card.id).eq("is_foil", true).single();

		if (foilData) {
			console.log("get foil", foilData, card.cardNumber);
			setFoil(foilData);
			setOwned(true);
			console.log("Foil gotten");
		}
		let { data: nonFoilData, error: nonFoilError } = await supabase.from("lorcana_users_cards_and_quantity").select("cardNumber: card_number, isFoil: is_foil, wave, userId: user_id, quantity, cardId: card_id").eq("card_id", card.id).eq("is_foil", false).gte("quantity", 0).single();
		if (nonFoilData) {
			console.log("get NONfoil", nonFoilData, card.cardNumber);
			setNonFoil(nonFoilData);
			setOwned(true);
		}

		// if (data) {
		// 	console.log("users cards", data);
		// 	// let usersCardCache = {};
		// 	// for (let i = 0; i < data.length; i++) {
		// 	// 	const cardId = data[i]["id"];
		// 	// 	usersCardCache[cardId][] = ;
		// 	// }
		// 	// @ts-expect-error does not get type for the join
		// 	setUsersCards(data);
		// } else {
		if (error) console.error(error);
		// }
	};
	useEffect(() => {
		checkForCardInfo();
	}, [usersCards]);

	useEffect(() => {
		console.log("OWWWN", owned);
		// if (cardsStats) {
		// 	setOwned(true);
		// 	const foilIndex = cardsStats.findIndex((stat) => stat.isFoil);
		// 	setFoil(cardsStats[foilIndex].quantity);
		// 	const nonFoilIndex = cardsStats.findIndex((stat) => stat.isFoil);
		// 	setNonFoil(cardsStats[nonFoilIndex].quantity);
		// }
	}, [nonFoil, foil]);

	return (
		<div className={`${owned ? "own-card" : "do-not-own"} grid-card-item`}>
			<SmallCardImageAboveInput imageUrl={card.wave === 1 ? card.imageUrl.replace("large", "small") : card.imageUrl} imageWidth="100px" opacity={cardsStats ? "1" : "0.2"} />
			<Space style={{ display: "flex", justifyContent: "space-between" }}>
				<p style={{ fontSize: "10px" }}>#{card.cardNumber}</p>
				<Space style={{ display: "flex", width: "70px", flexWrap: "wrap" }}>
					<p style={{ fontSize: "10px", width: "70px" }}> {nonFoil && nonFoil.quantity > -1 && `non-foil x${nonFoil.quantity}`}</p>
					<p style={{ fontSize: "10px", width: "70px" }}> {foil && foil.quantity > -1 && `foil x${foil.quantity}`}</p>
				</Space>
			</Space>
		</div>
	);
};
