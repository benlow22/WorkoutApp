import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

type TProps = {
	name: string;
	image: string;
	character: string;
	amiiboSeries: string;
	setLocationName: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ComponentName = ({
	name,
	image,
	character,
	amiiboSeries,
	setLocationName,
}: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const { workouts, setWorkouts, userId, session, supabase } =
		useContext(AuthContext);

	useEffect(() => {
		if (name.length < 15) {
			setAmiiboNameSize("");
		} else if (name.length < 30) {
			setAmiiboNameSize("two-lines");
		} else {
			setAmiiboNameSize("three-lines");
		}
		setTimeout(() => {
			if (workouts) {
			}
		}, 2000);
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
