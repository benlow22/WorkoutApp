import React, { useEffect, useState } from "react";
import { TAmiiboCard } from "../types/types";
import { Button } from "antd";

type TProps = {
	amiibo: TAmiiboCard;
	isChecked: boolean;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ChecklistAmiiboCard = ({
	amiibo: { name, image, character, amiiboSeries },
	isChecked,
	setIsChecked,
}: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const [checkedStatus, setCheckedStatus] = useState(isChecked);

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
		<Button
			className={`amiibo-card-checklist ${
				checkedStatus ? "checked" : "unchecked"
			}`}
			onClick={() => setCheckedStatus(!checkedStatus)}
		>
			<h3 className={`amiibo-name ${amiiboNameSize}`}>{name}</h3>
			<div className="amiibo-image-container">
				<img
					src={image}
					alt={`${character} from ${amiiboSeries} amiibo`}
					className="amiibo-image"
				/>
				<img
					src="/checkmark.png"
					className="checkmark"
					hidden={!checkedStatus}
				/>
			</div>
			<h5>{amiiboSeries}</h5>
		</Button>
	);
};
