import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { NewInventoryCard } from "../../components/NewInventoryCard";

export type TCardRef = {
	cardNumber: number;
	foil?: number;
	nonFoil?: number;
	wave: number;
	userId?: string;
	image: string;
	cardId: string;
};

export type TNewCard = {
	Abilities: string;
	Artist: string;
	Body_Text: string;
	Card_Num: string;
	Card_Variants: string | null;
	Classifications: string;
	Color: string;
	Cost: number;
	Franchise: string | null;
	ID: string;
	Image: string;
	Inkable: boolean;
	Lore: number;
	Move_Cost: number | null;
	Name: string;
	Rarity: string;
	Set_ID: string;
	Set_Name: string;
	Set_Num: number;
	Strength: string;
	Type: string;
	Unique_ID: string;
	Willpower: number;
};

export const NewInventory = () => {
	const { auth, userId, session, supabase, usersLorcanaCards, lorcanaCardImages } = useContext(AuthContext);
	const [allCards, setAllCards] = useState<TNewCard[] | null>();
	const [allCardImages, setAllCardImages] = useState<string[] | null>();

	//Test Variables
	const [firstCard, setFirstCard] = useState<TNewCard>();
	const [testSmallBatch, setTestSmallBatch] = useState<TNewCard[]>();

	const preloadImage = (url: string) => {
		var img = new Image();
		img.src = url;
	};

	const getAllCards = async () => {
		let { data, error } = await supabase
			.from("new_cards")
			.select(
				"Abilities, Artist,Body_Text, Card_Num, Card_Variants, Classifications, Color, Cost, Franchise, ID, Image, Inkable, Lore, Move_Cost, Name, Rarity, Set_ID, Set_Name, Set_Num, Strength, Type, Unique_ID, Willpower"
			)
			.order("Set_Num")
			.order("Card_Num", { ascending: true });
		if (data) {
			const sortedData = data.sort((a, b) => {
				return a.Set_Num - b.Set_Num || a.Card_Num - b.Card_Num;
			});
			setAllCards(sortedData);
			setFirstCard(sortedData[0]);
			// const cardImages = data.map((card) => {
			// 	preloadImage(card.Image);
			// 	return card.Image;
			// });
			// setAllCardImages(cardImages);
			setTestSmallBatch(sortedData.slice(0, 50));
			// console.log("get all cards", cardImages);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllCards();
	}, []);

	return <div className="inventory-page">{firstCard && testSmallBatch?.map((card) => <NewInventoryCard card={card} />)}</div>;
};
