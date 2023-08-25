import { useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";

type TProps = {
	amiibo: any;
	slideNumber: number;
};
export const CollectionCard = ({ amiibo, slideNumber }: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");

	useEffect(() => {
		if (amiibo.name.length < 15) {
			setAmiiboNameSize("");
		} else if (amiibo.name.length < 30) {
			setAmiiboNameSize("two-lines");
		} else {
			setAmiiboNameSize("three-lines");
		}
	}, [amiibo.name]);

	return (
		<div className="amiibo-card">
			<h3 className={`amiibo-name ${amiiboNameSize}`}>{amiibo.name}</h3>
			<div className="amiibo-carousel-container">
				<ImageCarousel amiibo={amiibo} slideNumber={slideNumber} />
			</div>
			<h5>{amiibo.series}</h5>
		</div>
	);
};
