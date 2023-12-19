// takes in all cards + user's cards

import { useEffect, useState } from "react";
import { ICardAndUserInfo } from "../GridCardDisplay";
import { Button, Checkbox, Radio } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { ClearOutlined, SettingOutlined } from "@ant-design/icons";

// returns a list of cards that are filtered
type TProps = {
	allCardsAndUsersCards: ICardAndUserInfo[] | undefined;
	setFilteredCards: (filteredCards: ICardAndUserInfo[] | undefined) => void;
};

export const CardFilterMenu = ({ allCardsAndUsersCards, setFilteredCards }: TProps) => {
	const [cardPossesionFilters, setCardPossessionFilters] = useState<number>();
	const [cardTypeFilters, setCardTypeFilters] = useState<CheckboxValueType[]>([]);
	const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);

	useEffect(() => {
		console.log("CARDTYPEFILTERS", cardTypeFilters);
		let filteredCards = allCardsAndUsersCards;
		switch (cardPossesionFilters) {
			case 1: // owned
				filteredCards = allCardsAndUsersCards?.filter((card) => card.foil || card.nonFoil);
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
		setFilteredCards(filteredCards);
	}, [cardPossesionFilters, cardTypeFilters]);

	//creates a check for an array of filters, check if a card passes any of the filters

	// enchanted, foil, non-foil.
	//[0],[0,1],[1],[1,2]
	const cardTypeFilterFn = (card: ICardAndUserInfo) => {
		if (cardTypeFilters.includes(1)) {
			if (card.foil && card.foil > 0) {
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
			let quantity = card.foil + card.nonFoil;
			if (quantity > 3) {
				return true;
			}
		}
		return false;
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
	];

	const handleClearFilters = () => {
		setCardTypeFilters([]);
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
			<Button type="primary" icon={<ClearOutlined />} onClick={handleClearFilters} />
			{showAdvancedSettings && (
				<>
					<h1>Advanced Settings</h1>
					<h1>Ink Color</h1>
					<h1>Set</h1>
					<h1>Type</h1>
					<h1>Classification</h1>
					<h1>Keyword</h1>
					<h1>Inkable</h1>
					<h1>Rarity</h1>
				</>
			)}
		</div>
	);
};
