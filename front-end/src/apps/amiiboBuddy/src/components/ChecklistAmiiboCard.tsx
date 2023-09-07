import React, { useEffect, useState } from "react";
import { TAmiiboCard } from "../types/types";
import { Button } from "antd";

type TProps = {
	amiibo: TAmiiboCard;
};
export const ChecklistAmiiboCard = ({
	amiibo: { name, image, character, amiiboSeries },
}: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");

	const [checkedStatus, setCheckedStatus] = useState("");
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
		<Button className={`amiibo-card-checklist ${checkedStatus}`}>
			<h3 className={`amiibo-name ${amiiboNameSize}`}>{name}</h3>
			<div className="amiibo-image-container">
				<img
					src={image}
					alt={`${character} from ${amiiboSeries} amiibo`}
					className="amiibo-image"
				/>
			</div>
			<h5>{amiiboSeries}</h5>
		</Button>
	);
};
