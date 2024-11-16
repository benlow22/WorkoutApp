// takes in all cards + user's cards

import { ClearOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Radio } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TNewCard, TNewCardAndUserData } from "../../pages/newInventory/NewInventory";

// returns a list of cards that are filtered
type TProps = {
	allCardsAndUsersCards: TNewCardAndUserData[] | undefined;
	setFilteredCards: (filteredCards: TNewCardAndUserData[] | undefined) => void;
};

export const NewCardFilterMenu = ({ allCardsAndUsersCards, setFilteredCards }: TProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [inkFilter, setInkFilter] = useState<string[]>();
	const noUseStateInkfilter = searchParams.getAll("ink");
	const [form] = Form.useForm();

	const url = new URL(window.location.href);
	console.log("location", window.location.href);
	const [cardPossesionFilters, setCardPossessionFilters] = useState<number>();
	const [cardTypeFilters, setCardTypeFilters] = useState<CheckboxValueType[]>([]);
	const [cardInkFilters, setCardInkFilters] = useState<CheckboxValueType[]>([]);
	const [cardRarityFilters, setCardRarityFilters] = useState<CheckboxValueType[]>([]);
	const [cardSetFilters, setCardSetFilters] = useState<CheckboxValueType[]>([5]);
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

	const valuesToSearchParams = (searchParams: URLSearchParams, filter: CheckboxValueType[], filterName: string) => {
		if (filter) {
			for (let i = 0; i < filter.length; i++) {
				searchParams.append(filterName, filter[i].toString());
			}
		}
	};

	useEffect(() => {
		console.log("NO", noUseStateInkfilter);
		console.log("first search params", searchParams.toString());
		let newSearchParams = new URLSearchParams();
		valuesToSearchParams(newSearchParams, cardInkFilters, "ink");
		valuesToSearchParams(newSearchParams, cardTypeFilters, "type");

		// if (cardInkFilters) {
		// 	for (let i = 0; i < cardInkFilters.length; i++) {
		// 		newSearchParams.append("ink", cardInkFilters[i].toString());
		// 	}
		// }
		// console.log("searchParams", newSearchParams.toString());
		setSearchParams(newSearchParams);
	}, [cardInkFilters, cardPossesionFilters, cardRarityFilters, cardSetFilters, cardTypeFilters]);

	useEffect(() => {
		console.log("CARDTYPEFILTERS", cardTypeFilters);
		let filteredCards = allCardsAndUsersCards;
		switch (cardPossesionFilters) {
			case 1: // owned
				filteredCards = allCardsAndUsersCards?.filter((card) => card.foil || card.nonfoil);
				break;
			case 2: // not Owned
				filteredCards = allCardsAndUsersCards?.filter((card) => !card.foil && !card.nonfoil);
				break;
			default:
				break;
		}
		if (cardTypeFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardTypeFilterFn(card));
		}
		if (cardSetFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardSetFilterFn(card));
			console.log("filtered", filteredCards);
		}
		if (cardInkFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardInkFilterFn(card));
		}
		if (cardRarityFilters.length > 0) {
			filteredCards = filteredCards?.filter((card) => cardRarityFilterFn(card));
		}
		setFilteredCards(filteredCards);
		console.log("filtered", filteredCards);
	}, [cardPossesionFilters, cardTypeFilters, cardSetFilters, cardInkFilters, cardRarityFilters]);

	//creates a check for an array of filters, check if a card passes any of the filters

	const rare = ["Rare", "Super Rare"];
	// enchanted, foil, non-foil.
	//[0],[0,1],[1],[1,2]
	const cardTypeFilterFn = (card: TNewCardAndUserData) => {
		if (cardTypeFilters.includes(1)) {
			if (card.foil && card.foil > 0) {
				return true;
			}
		}
		if (cardTypeFilters.includes(2)) {
			if (card.nonfoil && card.nonfoil > 0) {
				return true;
			}
		}
		if (cardTypeFilters.includes(3)) {
			if (Number(card.card_num) > 204) {
				return true;
			}
		}
		if (cardTypeFilters.includes(4)) {
			let quantity = (card.foil ? card.foil : 0) + (card.nonfoil ? card.nonfoil : 0);
			if (quantity > 8) {
				return true;
			}
		}
		if (cardTypeFilters.includes(5)) {
			// if (!card.foil) {
			// 	return true;
			// }
			return card.nonfoil ? card.nonfoil > 4 : false;
		}
		if (cardTypeFilters.includes(6)) {
			if (Number(card.card_num) < 205) {
				let quantity = (card.foil ? 1 : 0) + (card.nonfoil ? card.nonfoil : 0);

				if (quantity > 4) {
					return true;
				}
			}
		}
		if (cardTypeFilters.includes(7)) {
			if (!card.foil) {
				return true;
			}
		}
		if (cardTypeFilters.includes(8)) {
			if (card.foil > 1) {
				return true;
			}
		}
		return false;
	};

	const cardSetFilterFn = (card: TNewCard) => {
		if (cardSetFilters.includes(card.set_num)) {
			return true;
		} else return false;
	};

	const cardInkFilterFn = (card: TNewCard) => cardInkFilters.includes(card.color);
	// const cardInkFilterFn = (card: TNewCard) => {
	// 	if (cardInkFilters.includes("amber")) {
	// 		if (card.color === "Amber") {
	// 			return true;
	// 		}
	// 	}
	// 	if (cardInkFilters.includes("amethyst")) {
	// 		if (card.color === "Amethyst") {
	// 			return true;
	// 		}
	// 	}
	// 	if (cardInkFilters.includes("emerald")) {
	// 		if (card.color === "Emerald") {
	// 			return true;
	// 		}
	// 	}
	// 	if (cardInkFilters.includes("ruby")) {
	// 		if (card.color === "Ruby") {
	// 			return true;
	// 		}
	// 	}
	// 	if (cardInkFilters.includes("sapphire")) {
	// 		if (card.color === "Sapphire") {
	// 			return true;
	// 		}
	// 	}
	// 	if (cardInkFilters.includes("steel")) {
	// 		if (card.color === "Steel") {
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// };

	const cardRarityFilterFn = (card: TNewCard) => {
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
		{ label: "more than 4 nonfoil", value: 5 },
		{ label: "more than 4", value: 6 },
		{ label: "missing foil", value: 7 },
		{ label: "more than 1 foil", value: 8 },
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
		{ label: "Ursula's Return", value: 4 },
		{ label: "Shimmering Skies", value: 5 },
		{ label: "Promo", value: 6 },
	];

	const cardInkFilterOptions = [
		{
			label: (
				<div
					className={(cardInkFilters.toString() === "Amber" || cardInkFilters.includes("Amber") ? "active " : "not-active ") + "amber-ink"}
				>
					<img src="/amber.svg" style={{ width: "50px", padding: "0px", position: "relative" }} />
				</div>
			),
			value: "Amber",
		},
		{
			label: (
				<div
					className={
						(cardInkFilters.toString() === "Amethyst" || cardInkFilters.includes("Amethyst") ? "active " : "not-active ") + "amethyst-ink"
					}
				>
					<img src="/amethyst.svg" style={{ width: "50px", padding: "0px", position: "relative" }} />
				</div>
			),
			value: "Amethyst",
		},
		{
			label: (
				<div
					className={
						(cardInkFilters.toString() === "Emerald" || cardInkFilters.includes("Emerald") ? "active " : "not-active ") + "emerald-ink"
					}
				>
					<img src="/emerald.svg" style={{ width: "50px", padding: "0px", position: "relative" }} />
				</div>
			),
			value: "Emerald",
		},
		{
			label: (
				<div className={(cardInkFilters.toString() === "Ruby" || cardInkFilters.includes("Ruby") ? "active " : "not-active ") + "ruby-ink"}>
					<img src="/ruby.svg" style={{ width: "50px", padding: "0px", position: "relative" }} />
				</div>
			),
			value: "Ruby",
		},
		{
			label: (
				<div
					className={
						(cardInkFilters.toString() === "Sapphire" || cardInkFilters.includes("Sapphire") ? "active " : "not-active ") + "sapphire-ink"
					}
				>
					<img src="/sapphire.svg" style={{ width: "50px", padding: "0px", position: "relative" }} />
				</div>
			),
			value: "Sapphire",
		},
		{
			label: (
				<div
					className={(cardInkFilters.toString() === "Steel" || cardInkFilters.includes("Steel") ? "active " : "not-active ") + "steel-ink"}
				>
					<img src="/steel.svg" style={{ width: "50px", padding: "0px", position: "relative" }} />
				</div>
			),
			value: "Steel",
		},
	];

	const handleClearFilters = () => {
		setCardTypeFilters([]);
		setCardSetFilters([]);
		setCardInkFilters([]);
		setCardPossessionFilters(0);
	};

	// const handleFormChange = (changedValues, allValues) => {
	// 	console.log("form Values:", allValues);
	// };

	return (
		<div className="card-filter-menu">
			{noUseStateInkfilter.map((ink) => (
				<p>{ink}----</p>
			))}
			<h3>Ink</h3>

			<Checkbox.Group
				options={cardInkFilterOptions}
				onChange={(values) => {
					setCardInkFilters(values);
				}}
				value={cardInkFilters}
				className="ink-checkbox"
			/>
			<h3>Possesion</h3>
			<Radio.Group
				options={cardPossesionFiltersOptions}
				onChange={(e) => setCardPossessionFilters(e.target.value)}
				value={cardPossesionFilters}
				defaultValue={0}
			/>
			<h3>card typey</h3>

			<Checkbox.Group options={cardTypeFilterOptions} onChange={(values) => setCardTypeFilters(values)} value={cardTypeFilters} />
			{/* <h4></h4> */}
			{/* <Button type="text" onClick={() => setShowAdvancedSettings(!showAdvancedSettings)} icon={<SettingOutlined />}>
				Advanced Settings
			</Button>
			<Button type="primary" icon={<ClearOutlined />} onClick={handleClearFilters} />
			{showAdvancedSettings && ( */}
			<>
				{/* <h3>Ink Color</h3>
				<Checkbox.Group
					options={cardInkFilterOptions}
					onChange={(values) => {
						setCardInkFilters(values);
					}}
					value={cardInkFilters}
				/> */}
				<h3>Set</h3>
				<Checkbox.Group options={cardSetFilterOptions} onChange={(values) => setCardSetFilters(values)} value={cardSetFilters} />

				<h3>Rarity</h3>
				<Checkbox.Group options={cardRarityFilterOptions} onChange={(values) => setCardRarityFilters(values)} value={cardRarityFilters} />
			</>
			{/* )} */}
		</div>
	);
};
