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

/// when adding new cards,
// change wave and uncomment
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
			.order("Card_Num");
		if (data) {
			//PUPPIES
			// let wave3 = data.filter((card) => card.Set_Num === 3);
			// const sortedData = wave3.sort((a, b) => {
			// 	return a.Card_Num - b.Card_Num;
			// });
			// const notPuppies = wave3.filter((card) => {
			// 	if (card.ID !== "3-4a" && card.ID !== "3-4b" && card.ID !== "3-4c" && card.ID !== "3-4d" && card.ID !== "3-4e") {
			// 		return card;
			// 	}
			// });
			// const puppies = wave3.filter((card) => {
			// 	if (card.ID === "3-4a" || card.ID === "3-4b" || card.ID === "3-4c" || card.ID === "3-4d" || card.ID === "3-4e") {
			// 		return card;
			// 	}
			// });
			// const sortedNonPup = notPuppies.sort((a, b) => (Number(a.Card_Num) < Number(b.Card_Num) ? -1 : 1));
			// // let wave3 = sortedData.filter((card) => card.Set_Num === 3);
			// sortedNonPup.splice(3, 1, ...puppies);
			// setAllCards(sortedNonPup);

			//NONPUPPIES
			// let wave = data.filter((card) => card.Set_Num === 1);
			// const sortedData = wave.sort((a, b) => {
			// 	return a.Card_Num - b.Card_Num;
			// });
			// setAllCards(sortedData);

			//Green and Red
			let wave = data.filter((card) => card.Set_Num === 2 && card.Card_Num > 136);
			const sortedData = wave.sort((a, b) => {
				return a.Card_Num - b.Card_Num;
			});
			setAllCards(sortedData);

			console.log(
				"PUPPIES FOUND : ",
				sortedData.map((card) => card.Card_Num)
			);
			// setAllCards(sortedData.filter((card) => card.Set_Num === 3 && card.Card_Num === "7"));
			// setFirstCard(sortedData[0]);
			// const cardImages = data.map((card) => {
			// 	preloadImage(card.Image);
			// 	return card.Image;
			// });
			// setAllCardImages(cardImages);
			// setTestSmallBatch(sortedData.slice(0, 50));
			// console.log("get all cards", cardImages);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllCards();
	}, []);

	// Page 1
	const batch1 = allCards?.slice(0, 9);
	const batch2 = allCards?.slice(9, 18);
	const batch3 = allCards?.slice(34, 43);
	const batch4 = allCards?.slice(43, 52);
	// // #wave 3 puppies

	// const batch2 = allCards?.slice(9, 18);
	// const batch3 = allCards?.slice(38, 47);
	// const batch4 = allCards?.slice(47, 56);

	// //page 2
	// const batch1 = allCards?.slice(18, 27);
	// const batch2 = allCards?.slice(27, 34);
	// const batch3 = allCards?.slice(52, 61);
	// const batch4 = allCards?.slice(61, 68);
	// #wave 3 puppies
	// const batch1 = allCards?.slice(18, 27);
	// const batch2 = allCards?.slice(27, 35);
	// const batch3 = allCards?.slice(56, 65);
	// const batch4 = allCards?.slice(65, 69);

	// wave 3 no locations
	// const batch1 = allCards?.slice(18, 27);
	// const batch2 = allCards?.slice(27, 34);
	// const batch3 = allCards?.slice(52, 61);
	// const batch4 = allCards?.slice(61, 68);

	return (
		<div className="inventory-page" style={{ backgroundColor: "white", display: "flex", flexWrap: "wrap", marginLeft: "20px", width: "700px" }}>
			<div className="3x3" style={{ width: "320px", borderRight: "1px solid black" }}>
				<div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
					{batch1 && batch1?.map((card) => <NewInventoryCard card={card} key={card.ID} />)}
				</div>
			</div>
			<div className="3x3" style={{ width: "320px", borderRight: "1px solid black" }}>
				<div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
					{batch2 && batch2?.map((card) => <NewInventoryCard card={card} key={card.ID} />)}
				</div>
			</div>
			<p style={{ width: "100%", borderRight: "none" }}></p>
			<div className="3x3" style={{ width: "320px", borderRight: "1px solid black" }}>
				<div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
					{batch3 && batch3?.map((card) => <NewInventoryCard card={card} key={card.ID} />)}
				</div>
			</div>
			<div className="3x3" style={{ width: "320px", borderRight: "1px solid black", marginBottom: "5px" }}>
				<div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
					{batch4 && batch4?.map((card) => <NewInventoryCard card={card} key={card.ID} />)}
				</div>
			</div>
		</div>
	);
};
