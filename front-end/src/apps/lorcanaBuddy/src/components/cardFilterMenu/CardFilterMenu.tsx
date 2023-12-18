// takes in all cards + user's cards

import { ICardAndUserInfo } from "../GridCardDisplay";

// returns a list of cards that are filtered
type TProps = {
	allCardsAndUsersCards: ICardAndUserInfo[];
	setFilteredCards: (filteredCards: ICardAndUserInfo[]) => void;
};

export const CardFilterMenu = ({ allCardsAndUsersCards, setFilteredCards }: TProps) => {
	return (
		<div className="card-filter-menu">
			<h4>Filter</h4>
			<h4>Sort By</h4>
			<h4>Show Only</h4>
			<h4></h4>
		</div>
	);
};
