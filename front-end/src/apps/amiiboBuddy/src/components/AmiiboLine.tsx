import React, { useEffect, useState } from "react";
import { TAmiiboCard } from "../types/types";

type TProps = {
	amiibo: TAmiiboCard;
};
export const AmiiboLine = ({
	amiibo: { name, image, character, amiiboSeries },
}: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");

	useEffect(() => {
		if (name.length < 15) {
			setAmiiboNameSize("");
		} else if (name.length < 30) {
			setAmiiboNameSize("two-lines");
		} else {
			setAmiiboNameSize("three-lines");
		}
	}, [name]);

	return (
		<div className="amiibo-card">
			<h3 className={`amiibo-name ${amiiboNameSize}`}>{name}</h3>
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
