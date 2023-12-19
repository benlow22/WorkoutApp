// takes in all cards + user's cards

import { useEffect, useState } from "react";
import { ICardAndUserInfo } from "../GridCardDisplay";
import { Button, Checkbox, Radio } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { ClearOutlined } from "@ant-design/icons";

// returns a list of cards that are filtered
type TProps = {
	allCardsAndUsersCards: ICardAndUserInfo[] | undefined;
	setFilteredCards: (filteredCards: ICardAndUserInfo[] | undefined) => void;
};

export const CardFilterMenu = ({ allCardsAndUsersCards, setFilteredCards }: TProps) => {
	const [showOnlySettings, setShowOnlySettings] = useState<number>();
	const [cardPossesionFilters, setCardPossessionFilters] = useState<number>();

	useEffect(() => {
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
		setFilteredCards(filteredCards);
	}, [cardPossesionFilters]);

	// filteredCards = allCardsAndUsersCards?.filter((card) => card.foil && card.foil > 0);
	const cardPossesionFiltersOptions = [
		{ label: "All", value: 0 },
		{ label: "Owned", value: 1 },
		{ label: "Not Owned", value: 2 },
	];

	// const cardTypeFilterOptions = [
	// 	{ label: "Foil", value: 1 },
	// 	{ label: "Non Foil", value: 2 },
	// 	{ label: "Enchanted", value: 3 },
	// ];

	const handleClearFilters = () => {
		// setShowOnlySettings([]);
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
			{/* <h4>Show Only</h4>

			<Checkbox.Group
				options={cardTypeFilterOptions}
				onChange={(values) => setShowOnlySettings(values)}
				value={showOnlySettings}
			/>
			<h4></h4> */}

			<Button type="primary" icon={<ClearOutlined />} onClick={handleClearFilters} />
		</div>
	);
};
