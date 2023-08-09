import React from "react";
import { TAmiiboCard } from "../types/types";

type TProps = {
	amiibo: TAmiiboCard;
};
export const AmiiboCard = ({
	amiibo: { name, image, character, amiiboSeries },
}: TProps) => {
	console.log("amiibo Card render??");
	return (
		<div className="amiibo-card">
			<h3 className="amiibo-name">{name}</h3>
			<div className="amiibo-image-container">
				<img
					src={image}
					alt={`${character} from ${amiiboSeries} amiibo`}
					className="amiibo-image"
				/>
			</div>
			<h5>{amiiboSeries}</h5>
		</div>
	);
};
