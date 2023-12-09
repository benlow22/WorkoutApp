import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import lorcanaMickey from "../../../../../images/lorcanaMickey.avif";
import { getLorcanaCards } from "../../../../workoutBuddy/src/api/api";
import lorcanaData from "./../../public/lorcanaCards.json";
import { LorcanaCard } from "../../components/LorcanaCard";
import "./../../styles/index.css";
import { FloatButton, Tooltip, message } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { useRequest } from "../../../../../hooks/useRequest";
import { getAllLorcanaCardsAPI } from "../../api";
import { InventoryCardDisplay } from "../../components/InventoryCardDisplay";

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
	const [usersCards, setUsersCards] = useState<TCardRef[]>([]);
	const getAllUsersCards = async () => {
		let { data, error } = await supabase.from("lorcana_users_cards_and_quantity").select("cardNumber: card_number, isFoil: is_foil, wave, userId: user_id, quantity, ...card_id(*) ");
		if (data) {
			console.log(data);
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

	useEffect(() => {
		getAllUsersCards();
	}, []);
	return (
		<>
			<h1>cards</h1>
			{usersCards.map((card) => (
				<InventoryCardDisplay quantity={card.quantity} imageUrl={card.image} cardNumber={card.cardNumber} isFoil={card.isFoil} wave={card.wave} />
			))}
		</>
	);
};
