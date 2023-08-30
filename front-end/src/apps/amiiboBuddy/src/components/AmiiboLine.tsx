import React, { useEffect, useState } from "react";
import { TAmiiboCard } from "../types/types";
import { Image } from "antd";

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
		<div className="amiibo-line">
			<div>
				<h3 className={`amiibo-name-line ${amiiboNameSize}`}>{name}</h3>
				<h5>{amiiboSeries}</h5>
			</div>
			<div className="amiibo-line-image-container">
				<Image
					src={image}
					alt={`${character} from ${amiiboSeries} amiibo`}
					className="amiibo-image-line"
				/>
			</div>
		</div>
	);
};
