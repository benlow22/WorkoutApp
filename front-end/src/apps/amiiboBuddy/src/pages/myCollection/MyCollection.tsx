import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import fuecoco from "../../../../../images/fuecoco.jpeg";
import { AmiiboCard } from "../../components/AmiiboCard";
import { CollectionCard } from "../../components/CollectionCard";
import { ImageCarousel } from "../../components/ImageCarousel";

export const MyCollection = () => {
	const { auth, username, supabase } = useContext(AuthContext);
	const [myAmiibos, setMyAmiibos] = useState<any>([]);
	const [ready, setReady] = useState<any>(false);
	const [slideNumber, setSlideNumber] = useState<number>(1);
	// create type for amiibo with image.
	const getAmiibos = async () => {
		let { data, error } = await supabase
			.from("users_amiibos")
			.select(
				"*, ...amiibo(image, name, series: amiibo_series), ...ab_pack_id_image_paths(photoPaths: photo_paths)"
			);

		// const { data: photos, error: photoE } = await supabase.storage
		// 	.from("upload-amiibo-images")
		// 	.list("folder", {
		// 		limit: 100,
		// 		offset: 0,
		// 		sortBy: { column: "name", order: "asc" },
		// 	});
		if (data) {
			setMyAmiibos(data);
			console.log("my amiibo raw data", data);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getAmiibos();
	}, []);
	useEffect(() => {
		console.log("MY", myAmiibos);
		setReady(true);
	}, [myAmiibos]);
	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			<div className="page-heading"></div>
			<h2>Amiibo Buddy My Collection</h2>

			{ready && (
				<div className="my-collection-grid">
					{myAmiibos.map((amiibo: any, index: number) => (
						<CollectionCard
							amiibo={amiibo}
							key={index}
							slideNumber={slideNumber}
						/>
						// <ImageCarousel
						// amiiboImage={amiibo.image}
						// photoPaths={amiibo.photoPaths}
						// goToSlideNumber={slideNumber}
						// />
						// <></>
					))}
				</div>
			)}
			<img src={fuecoco} style={{ maxWidth: "400px" }} alt="fuecoco" />
			<h5>Coming soon...</h5>
		</>
	);
};
// https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/d79ccff2-0177-46e8-93a2-ea3353691d28/09980c46-6f44-4c1d-91ee-dcf1c35e0418/bfe51824-1aa0-489c-8a0e-0dd45da875df.png
