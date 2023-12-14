import { Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { GridCardDisplay } from "../../components/GridCardDisplay";
import { InventoryCardDisplay } from "../../components/InventoryCardDisplay";
import { TLorcanaCard } from "../../types/lorcana.types";
import "./../../styles/index.css";

export type TCardRef = {
	cardNumber: number;
	foil: number;
	nonFoil: number;
	wave: number;
	userId?: string;
	image: string;
	cardId: string;
};

export const Inventory = () => {
	const { auth, userId, session, supabase } = useContext(AuthContext);
	const [viewType, setViewType] = useState<string>("icons");
	const [usersCards, setUsersCards] = useState<TCardRef[]>([]);
	const [allCardArr, setAllCardsArr] = useState<TLorcanaCard[]>([]);
	const [cardQuantities, setCardQuantities] = useState<{ foil: number; nonfoil: number }>({
		foil: 0,
		nonfoil: 0,
	});
	const getAllUsersCards = async () => {
		let { data, error } = await supabase
			.from("lorcana_get_users_cards_with_foil_count")
			.select(
				"nonFoil: nonfoil , foil, wave, userId: user_id, ...card_id(*, cardNumber: card_number) "
			)
			.eq("user_id", userId);
		console.log("userID", userId);
		if (data) {
			console.log("users cards", data);
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

	const getQuantityOfCards = async () => {
		let { data, error } = await supabase
			// @ts-expect-error does not get type for the join
			.rpc("get_card_quantities")
			.single();
		if (data) {
			console.log("quantity", data);
			setCardQuantities(data);
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
		getQuantityOfCards();
	}, [userId]);

	useEffect(() => {}, [, usersCards]);

	return (
		<>
			<h1>cards</h1>
			<h3>total foils: {cardQuantities.foil}</h3>
			<h3>total non-foild: {cardQuantities.nonfoil} </h3>
			<h3>
				total cards:
				{cardQuantities.foil + cardQuantities.nonfoil}
			</h3>
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
						nonFoil={card.nonFoil}
						image={card.image}
						cardNumber={card.cardNumber}
						foil={card.foil}
						wave={card.wave}
						key={card.cardId}
						cardId={card.cardId}
					/>
				))}
		</>
	);
};
