import React, { useContext, useEffect, useState } from "react";
// import { supabase } from "../../../../supabaseClient";
import { AmiiboCard } from "./AmiiboCard";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { AmiiboFilter } from "./AmiiboFilter";

export const BrowsePage: React.FC<{}> = () => {
	const { supabase } = useContext(AuthContext);
	const [amiibos, setAmiibos] = useState<TAmiiboCard[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getAmiibos();
	}, []);

	const getAmiibos = async () => {
		let { data, error } = await supabase
			.from("amiibo")
			.select(
				" amiiboSeries :amiibo_series ,character, gameSeries: game_series , head, id, image, name,release_au,release_eu,release_jp,release_na,tail,type"
			)
			.eq("type", "Figure")
			.order("amiibo_series");
		if (data) {
			setAmiibos(data);
			// console.log("Amiibo Data", data);
			setIsLoading(false);
		} else {
			console.error("ERROR", error);
		}
	};

	return (
		<div className="amiibo-homepage">
			<h2 className="page-heading">Amiibo Buddy</h2>
			<AmiiboFilter />
			<div className="amiibo-grid">
				{!isLoading &&
					amiibos.map((amiibo, index) => (
						<AmiiboCard amiibo={amiibo} key={index} />
					))}
			</div>
		</div>
	);
};
