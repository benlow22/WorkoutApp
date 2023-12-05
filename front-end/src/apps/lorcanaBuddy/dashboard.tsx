import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import lorcanaData from "./src/public/updatedLorcanaCards.json";

export const LorcanaBuddyDashboard = () => {
	const [allLorcanaCards, setAllLorcanaCards] = useState([]);
	const [cardCache, setCardCache] = useState({});

	const getLorcanaCards = async () => {
		const cards = lorcanaData;
		// make lorcana type
		// convert lorcana type

		const cache = {};
		// 	const concatData = cards.map((card) => {
		// 		const concatName = `${card.} - ${amiibo.amiiboSeries} (${amiibo.type})`;
		// 		amiiboCache[concatName] = amiibo;

		// 		return {
		// 			value: concatName,
		// 			label: (
		// 				<div
		// 					style={{
		// 						display: "flex",
		// 						alignItems: "center",
		// 					}}
		// 				>
		// 					<img
		// 						src={amiibo.image}
		// 						style={{ width: "40px", paddingRight: "10px" }}
		// 					/>
		// 					{amiibo.name} - {amiibo.amiiboSeries}
		// 				</div>
		// 			),
		// 			children: amiibo,
		// 		};
		// 	});
		// 	if (concatData) {
		// 		setOptions(concatData);
		// 		setCache(amiiboCache);
		// 		setIsLoading(false);
		// 	}
		// } else {
		// 	console.error("ERROR", error);
	};

	return (
		<div className="page-heading">
			<h2>Lorcana Buddy</h2>
			{/* <Outlet /> */}
			<h4>
				Here you can browse through all of the available lorcana cards
				and catalog which ones you have, want, or like.
			</h4>
			<h4>
				Once logged in you will be able to save your data for quick
				reference.
			</h4>
		</div>
	);
};
