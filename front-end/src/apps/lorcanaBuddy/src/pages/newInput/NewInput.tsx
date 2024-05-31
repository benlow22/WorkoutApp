import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { NewInventoryCard } from "../../components/NewInventoryCard";
import { TNewCard } from "../newInventory/NewInventory";
import { Select } from "antd";
import { NewCardsInputByWave } from "../../components/NewCardsInputByWave";

export const NewInput = () => {
	const { auth, userId, session, supabase, usersLorcanaCards, lorcanaCardImages } = useContext(AuthContext);
	const [allCards, setAllCards] = useState<TNewCard[] | null>();
	const [allCardImages, setAllCardImages] = useState<string[] | null>();
	const [waveFilter, setWaveFilter] = useState<number>(0);
	const filteredByWaveCards = useMemo(
		() =>
			allCards?.filter((card) => {
				card.Set_Num === waveFilter;
			}),
		[waveFilter]
	);
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
			let wave = data.filter((card) => card.Set_Num === 2);
			const sortedData = wave.sort((a, b) => {
				return a.Card_Num - b.Card_Num;
			});
			setAllCards(sortedData);
			setTestSmallBatch(sortedData.slice(0, 50));
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllCards();
	}, []);
	return (
		<div className="input-page" style={{}}>
			<h3>Select Wave:</h3>
			<Select
				placeholder="Select Wave"
				style={{ width: 220 }}
				onChange={(value: number) => {
					setWaveFilter(value);
				}}
				options={[
					{ value: 1, label: "1. The First Chapter" },
					{ value: 2, label: "2. Rise of the Floodborn" },
					{ value: 3, label: "3. Into the Inklands" },
					{ value: 4, label: "4. Ursula's Return" },
				]}
			/>
			<div className="" style={{}}>
				{waveFilter > 0 && <NewCardsInputByWave wave={waveFilter} />}
			</div>
		</div>
	);
};
