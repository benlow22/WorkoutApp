import React, { useContext, useEffect, useState } from "react";
import { SpiningLoadingIcon } from "../../src/components/loading/LoadingIcon";
import { amiiboFetchApi } from "../api/api";
import { supabase } from "../../src/supabaseClient";
import { AmiiboCard } from "../components/AmiiboCard";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";

export const AmiiboBuddyHomePage: React.FC<{}> = () => {
	// const { workouts, setWorkouts, userId, session } = useContext(AuthContext);
	const [userId, setUserId] = useState("");
	const [amiibos, setAmiibos] = useState<TAmiiboCard[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getAmiibos();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			// console.log("amiiiii", amiibos);
		}
	}, [isLoading]);

	// useEffect(() => {
	// 	// set workouts from response
	// 	if (getAllUsersWorkoutsResponse) {
	// 		console.log(getAllUsersWorkoutsResponse);
	// 		setWorkouts(getAllUsersWorkoutsResponse);
	// 	}
	// }, [getAllUsersWorkoutsResponse]);

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

	// const response = amiiboFetchApi();
	// if (!getAllUsersWorkoutsLoading) {
	return (
		<div className="amiibo-homepage">
			<h2 className="page-heading">Amiibo Buddy</h2>
			<div className="amiibo-grid">
				{!isLoading &&
					amiibos.map((amiibo, index) => (
						<AmiiboCard amiibo={amiibo} key={index} />
					))}
			</div>
		</div>
	);
	// } else {
	// 	return <SpiningLoadingIcon />;
	// }
};
