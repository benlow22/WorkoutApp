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
		let { data, error } = await supabase.from("lorcana_users_cards_and_quantity").select("cardNumber: card_number, isFoil: is_foil, wave, userId: user_id, quantity, ...card_id(*) ");
		if (data) {
			console.log(data);
			// @ts-expect-error does not get type for the join
			setUsersCards(data);
		} else {
			console.error(error);
		}
	};

	const getAllCards = async () => {
		let { data, error } = await supabase.from("lorcana_cards").select("id, cardNumber: card_number, colour, inkable, rarity, type, name, classification, cost, strength, willpower, lore, abilities, bodyText:body_text, flavourText:flavour_text, setName:set_name, wave, artist, imageUrl: image,setId:set_id ");
		if (data) {
			console.log("all cards", data);
			setAllCardsArr(data);
		} else {
			console.error(error);
		}
	};

	const viewTypeOptions = [
		{ value: "icons", label: "Icons" },
		{ value: "list", label: "List" },
		{ value: "grid", label: "Grid" },
		{ value: "card", label: "Card", disabled: true },
	];

	useEffect(() => {
		getAllUsersCards();
		getAllCards();
	}, []);

	useEffect(() => {}, [, usersCards]);

	return (
		<>
			<h1>cards</h1>
			{viewType === "grid" && <GridCardDisplay allCards={allCardArr} usersCards={usersCards} />}
			<Select defaultValue="icons" style={{ width: 120 }} onSelect={(value) => setViewType(value)} options={viewTypeOptions} />
			{viewType === "icons" && usersCards.map((card) => <InventoryCardDisplay quantity={card.quantity} imageUrl={card.image} cardNumber={card.cardNumber} isFoil={card.isFoil} wave={card.wave} />)}
		</>
	);
};
