import { Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { GridCardDisplay } from "../../components/GridCardDisplay";
import { InventoryCardDisplay } from "../../components/InventoryCardDisplay";
import { TLorcanaCard } from "../../types/lorcana.types";
import "./../../styles/index.css";

export type TCardRef = {
	cardNumber: number;
	isFoil: boolean;
	wave: number;
	userId: string;
	quantity: number;
	image: string;
};

export const Inventory = () => {
	const { auth, userId, session, supabase } = useContext(AuthContext);
	const [viewType, setViewType] = useState<string>("icons");
	const [usersCards, setUsersCards] = useState<TCardRef[]>([]);
	const [allCardArr, setAllCardsArr] = useState<TLorcanaCard[]>([]);

	const getAllUsersCards = async () => {
		let { data, error } = await supabase
			.from("lorcana_get_users_cards_with_foil_count")
			.select("nonfoil, foil, wave, userId: user_id, ...card_id(*) ")
			.eq("user_id", userId);
		console.log("userID", userId);
		if (data) {
			console.log("users cards", data);
			// let usersCardCache = {};
			// for (let i = 0; i < data.length; i++) {
			// 	const cardId = data[i]["id"];
			// 	usersCardCache[cardId][] = ;
			// }

			// @ts-expect-error does not get type for the join
			setUsersCards(data);
		} else {
			console.error(error);
		}
		// let { data, error } = await supabase.from("lorcana_user_cards").select("cardNumber: card_number, isFoil: is_foil, wave, userId: user_id", { count: "exact" });
		// if (data) {
		// 	console.log(data);
		// 	setUsersCards(data);
		// } else {
		// 	console.error(error);
		// }
	};

	const viewTypeOptions = [
		{ value: "icons", label: "Icons" },
		{ value: "list", label: "List" },
		{ value: "grid", label: "Grid" },
		{ value: "card", label: "Card", disabled: true },
	];

	useEffect(() => {
		getAllUsersCards();
	}, []);

	useEffect(() => {}, [, usersCards]);

	return (
		<>
			<h1>cards</h1>
			<Select
				defaultValue="icons"
				style={{ width: 120 }}
				onSelect={(value) => setViewType(value)}
				options={viewTypeOptions}
			/>
			{viewType === "grid" && <GridCardDisplay usersCards={usersCards} />}
			{viewType === "icons" &&
				usersCards.map((card) => (
					<InventoryCardDisplay
						quantity={card.quantity}
						imageUrl={card.image}
						cardNumber={card.cardNumber}
						isFoil={card.isFoil}
						wave={card.wave}
					/>
				))}
		</>
	);
};
