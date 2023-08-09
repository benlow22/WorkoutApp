import React from "react";
import { TAmiiboCard } from "../types/types";

export const AmiiboCard = ({
	name,
	image,
	character,
	amiiboSeries,
}: TAmiiboCard) => {
	return (
		<div className="amiibo-card">
			<h3>{name}</h3>
			<img src={image} alt={`${character} from ${amiiboSeries} amiibo`} />
			<h5>{amiiboSeries}</h5>
		</div>
	);
};
