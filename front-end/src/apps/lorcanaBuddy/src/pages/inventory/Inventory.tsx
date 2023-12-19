import { Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { GridCardDisplay, ICardAndUserInfo } from "../../components/GridCardDisplay";
import { InventoryCardDisplay } from "../../components/InventoryCardDisplay";
import { TLorcanaCard } from "../../types/lorcana.types";
import "./../../styles/index.css";
import { CardFilterMenu } from "../../components/cardFilterMenu/CardFilterMenu";

export type TCardRef = {
	cardNumber: number;
	foil?: number;
	nonFoil?: number;
	wave: number;
	userId?: string;
	image: string;
	cardId: string;
};

export const Inventory = () => {
	const { auth, userId, session, supabase } = useContext(AuthContext);
	const [viewType, setViewType] = useState<string>("icons");
	const [allCardAndUserCardInfo, setAllCardAndUserCardInfo] = useState<ICardAndUserInfo[]>();
	const [filteredCards, setFilteredCards] = useState<ICardAndUserInfo[] | undefined>([]);
	// const [usersCards, setUsersCards] = useState<TCardRef[]>([]);
	const [cardQuantities, setCardQuantities] = useState<{ foil: number; nonfoil: number }>({
		foil: 0,
		nonfoil: 0,
	});
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
	};

	const viewTypeOptions = [
		{ value: "icons", label: "Icons" },
		{ value: "list", label: "List" },
		{ value: "grid", label: "Grid" },
		{ value: "card", label: "Card", disabled: true },
	];

	useEffect(() => {
		getAllCardsAndUsersCards();
		getQuantityOfCards();
	}, [userId]);

	// useEffect(() => {}, [, usersCards]);

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
			<CardFilterMenu
				allCardsAndUsersCards={allCardAndUserCardInfo}
				setFilteredCards={setFilteredCards}
			/>
			{viewType === "grid" && allCardAndUserCardInfo && (
				<GridCardDisplay allCardsAndUsersCards={filteredCards} />
			)}
			{viewType === "icons" &&
				filteredCards &&
				filteredCards.map((card) => (
					<InventoryCardDisplay
						nonFoil={card.nonFoil}
						image={card.imageUrl}
						cardNumber={card.cardNumber}
						foil={card.foil}
						wave={card.wave}
						key={card.id}
						cardId={card.id}
					/>
				))}
		</>
	);
};
