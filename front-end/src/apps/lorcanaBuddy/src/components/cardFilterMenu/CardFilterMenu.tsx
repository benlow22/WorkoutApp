// takes in all cards + user's cards

import { useEffect, useState } from "react";
import { ICardAndUserInfo } from "../GridCardDisplay";
import { Button, Checkbox, Radio } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { ClearOutlined, SettingOutlined } from "@ant-design/icons";
import { Rarity } from "../../types/lorcana.types";
import axios from "axios";


// returns a list of cards that are filtered
type TProps = {
	allCardsAndUsersCards: ICardAndUserInfo[] | undefined;
	setFilteredCards: (filteredCards: ICardAndUserInfo[] | undefined) => void;
};

export const CardFilterMenu = ({ allCardsAndUsersCards, setFilteredCards }: TProps) => {
	const [cardPossesionFilters, setCardPossessionFilters] = useState<number>();
	const [cardTypeFilters, setCardTypeFilters] = useState<CheckboxValueType[]>([]);
	const [cardInkFilters, setCardInkFilters] = useState<CheckboxValueType[]>([]);
	const [cardRarityFilters, setCardRarityFilters] = useState<CheckboxValueType[]>([]);
	const [cardSetFilters, setCardSetFilters] = useState<CheckboxValueType[]>([]);
	const [showRARE, setShowRARE] = useState<boolean>(false);

	const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
	const callIt = async (url: any) => {
		const data = await axios.get(url);
		if (data) {
			return Promise.resolve(data);
		} else {
			return Promise.reject();
		}
	};
	const apiCall = async () => {
		console.log("double Clicky");
		let url =
			"https://lorcana-api.com/images/goofy/knight_for_a_day/goofy-knight_for_a_day-large.png";
		await callIt(url).then((data: any) => {
			console.log("got data", data);
		});
	};
	useEffect(() => {
		console.log("CARDTYPEFILTERS", cardTypeFilters);
		let filteredCards = allCardsAndUsersCards;
		switch (cardPossesionFilters) {
			case 1: // owned
				filteredCards = allCardsAndUsersCards?.filter(
					(card) => card.foil || card.nonFoil
				);
				break;
			case 2: // not Owned
				filteredCards = allCardsAndUsersCards?.filter(
					(card) => !card.foil && !card.nonFoil
				);
				break;
			default:
				break;
		}
		if (cardTypeFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardTypeFilterFn(card));
		}
		if (cardSetFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardSetFilterFn(card));
		}
		if (cardInkFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardInkFilterFn(card));
		}
		if (cardRarityFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardRarityFilterFn(card));
		}
		setFilteredCards(filteredCards);
	}, [
		cardPossesionFilters,
		cardTypeFilters,
		cardSetFilters,
		cardInkFilters,
		cardRarityFilters,
	]);


	//creates a check for an array of filters, check if a card passes any of the filters

	const rare = ["Rare", "Super Rare"];
	// enchanted, foil, non-foil.
	//[0],[0,1],[1],[1,2]
	const cardTypeFilterFn = (card: ICardAndUserInfo) => {
		if (cardTypeFilters.includes(1)) {
			if (card.foil && card.foil > 1) {
				return true;
			}
		}
		if (cardTypeFilters.includes(2)) {
			if (card.nonFoil && card.nonFoil > 0) {
				return true;
			}
		}
		if (cardTypeFilters.includes(3)) {
			if (card.cardNumber > 204) {
				return true;
			}
		}
		if (cardTypeFilters.includes(4)) {
			let quantity =
				(card.foil ? card.foil : 0) + (card.nonFoil ? card.nonFoil : 0);
			if (quantity < 4) {
				return true;
			}
		}
		if (cardTypeFilters.includes(5)) {
			if (!card.foil) {
				return true;
			}
		}
		if (cardTypeFilters.includes(6)) {
			if (card.cardNumber < 205) {
				let quantity = (card.foil ? card.foil : 0) + (card.nonFoil ? card.nonFoil : 0);
				if (quantity > 3) {
					return rare.includes(card.rarity);
				}
			}
		}
		return false;
	};

	const cardSetFilterFn = (card: ICardAndUserInfo) => {
		if (cardSetFilters.includes(card.wave)) {
			return true;
		} else return false;
	};

	const cardInkFilterFn = (card: ICardAndUserInfo) => {
		if (cardInkFilters.includes(0)) {
			if (card.colour === "Amber") {
				return true;
			}
		}
		if (cardInkFilters.includes(1)) {
			if (card.colour === "Amethyst") {
				return true;
			}
		}
		if (cardInkFilters.includes(2)) {
			if (card.colour === "Emerald") {
				return true;
			}
		}
		if (cardInkFilters.includes(3)) {
			if (card.colour === "Ruby") {
				return true;
			}
		}
		if (cardInkFilters.includes(4)) {
			if (card.colour === "Sapphire") {
				return true;
			}
		}
		if (cardInkFilters.includes(5)) {
			if (card.colour === "Steel") {
				return true;
			}
		}
		return false;
	};

	const cardRarityFilterFn = (card: ICardAndUserInfo) => {
		if (cardRarityFilters.includes(card.rarity)) {
			return true;
		}

	};
	const cardPossesionFiltersOptions = [
		{ label: "All", value: 0 },
		{ label: "Owned", value: 1 },
		{ label: "Not Owned", value: 2 },
	];

	const cardTypeFilterOptions = [
		{ label: "All", value: 0 },
		{ label: "Foil", value: 1 },
		{ label: "Non Foil", value: 2 },
		{ label: "Enchanted", value: 3 },
		{ label: "more than 8", value: 4 },
		{ label: "missing foil", value: 5 },
		{ label: "rare", value: 6 },
	];

	const cardRarityFilterOptions = [
		{ label: "Common", value: "Common" },
		{ label: "Uncommon", value: "Uncommon" },
		{ label: "Rare", value: "Rare" },
		{ label: "Super Rare", value: "Super Rare" },
		{ label: "Legendary", value: "Legendary" },
		{ label: "Enchanted", value: "Enchanted" },
	];
	const cardSetFilterOptions = [
		{ label: "All", value: 0 },
		{ label: "The First Chapter", value: 1 },
		{ label: "Rise of the Floodborn", value: 2 },
		{ label: "Into The Inklands", value: 3 },
		{ label: "Promo", value: 4 },
	];
	const cardInkFilterOptions = [
		{ label: "Amber", value: 0 },
		{ label: "Amethyst", value: 1 },
		{ label: "Emerald", value: 2 },
		{ label: "Ruby", value: 3 },
		{ label: "Saphire", value: 4 },
		{ label: "Steel", value: 5 },
	];

	const handleClearFilters = () => {
		setCardTypeFilters([]);
		setCardSetFilters([]);
		setCardInkFilters([]);
		setCardPossessionFilters(0);
	};

	return (
		<div className="card-filter-menu">
			<h4>Filter</h4>
			<h4>Sort By</h4>
			<h4>Possesion</h4>
			<Radio.Group
				options={cardPossesionFiltersOptions}
				onChange={(e) => setCardPossessionFilters(e.target.value)}
				value={cardPossesionFilters}
				defaultValue={0}
			/>
			<h4>card typey</h4>

			<Checkbox.Group
				options={cardTypeFilterOptions}
				onChange={(values) => setCardTypeFilters(values)}
				value={cardTypeFilters}
			/>
			<h4></h4>
			<Button
				type="text"
				onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
				icon={<SettingOutlined />}
			>
				Advanced Settings
			</Button>
			<Button
				type="primary"
				icon={<ClearOutlined />}
				onClick={handleClearFilters}
			/>
			{showAdvancedSettings && (
				<>
					<h1>Advanced Settings</h1>
					<h1>Ink Color</h1>
					<Checkbox.Group
						options={cardInkFilterOptions}
						onChange={(values) => setCardInkFilters(values)}
						value={cardInkFilters}
					/>
					<h1>Set</h1>
					<Checkbox.Group
						options={cardSetFilterOptions}
						onChange={(values) => setCardSetFilters(values)}
						value={cardSetFilters}
					/>
					<h1>Type</h1>
					<h1>Classification</h1>
					<h1>Keyword</h1>
					<h1>Inkable</h1>
					<h1>Rarity</h1>
					<h1>Set</h1>
					<Checkbox.Group
						options={cardRarityFilterOptions}
						onChange={(values) => setCardRarityFilters(values)}
						value={cardRarityFilters}
					/>
					<Button onClick={() => apiCall()}>CLICKY</Button>

				</>
			)}
		</div>
	);
};
