import React, { useEffect, useState } from "react";
import { TAmiiboCard } from "../types/types";
import { ImageCarousel } from "./ImageCarousel";
import fuecoco from "../../../../images/fuecoco.jpeg";
import { Image } from "antd";

type TProps = {
	amiibo: any;
	slideNumber: number;
};
export const CollectionCard = ({ amiibo, slideNumber }: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	useEffect(() => {
		console.log("slideNumbercard", slideNumber);
	}, [slideNumber]);
	useEffect(() => {
		if (amiibo.name.length < 15) {
			setAmiiboNameSize("");
		} else if (amiibo.name.length < 30) {
			setAmiiboNameSize("two-lines");
		} else {
			setAmiiboNameSize("three-lines");
		}
		console.log(
			"link ",
			`https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/${amiibo.user_id}/${amiibo.pack_id}/${amiibo.thumbnail_url}.png`
		);
		// https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/d79ccff2-0177-46e8-93a2-ea3353691d28/a4aa0b43-a63d-4e24-8759-414baed66310/rc-upload-1692885046622-2.png
		// https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/d79ccff2-0177-46e8-93a2-ea3353691d28/a4aa0b43-a63d-4e24-8759-414baed66310/rc-upload-1692885046622-2.png
	}, [amiibo.name]);

	return (
		<div className="amiibo-card">
			<h3 className={`amiibo-name ${amiiboNameSize}`}>{amiibo.name}</h3>
			<div className="amiibo-carousel-container">
				<ImageCarousel amiibo={amiibo} slideNumber={slideNumber} />
				{/* <img
					src={amiibo.image}
					alt={`${amiibo.character} from ${amiibo.amiiboSeries} amiibo`}
					className="amiibo-image"
				/> */}
				{/* <img
					src={`https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/${amiibo.user_id}/${amiibo.pack_id}/${amiibo.thumbnail_url}.png`}
					alt={`${amiibo.name} from ${amiibo.series} amiibo`}
					className="amiibo-image"
				/>
				<img
					src={amiibo.image}
					alt={`${amiibo.name} from ${amiibo.series} amiibo`}
					className="amiibo-image"
				/> */}
			</div>
			<h5>{amiibo.series}</h5>
		</div>
	);
};
