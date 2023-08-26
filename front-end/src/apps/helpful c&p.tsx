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

	// 	To get data from a table using then() and catch() statements, you can use the select() function provided by the Supabase client libraries. Here's an example of how to use select() with then() and catch():

	// supabase
	//   .from('table_name')
	//   .select('*')
	//   .then(response => {
	//     console.log(response.data)
	//   })
	//   .catch(error => {
	//     console.error(error)
	//   })

	// //   To get data from a table using then() and catch() statements, you can use the select() function provided by the Supabase client libraries. Here's an example of how to use select() with then() and catch():

	// supabase
	//   .from('table_name')
	//   .select('*')
	//   .then(response => {
	//     console.log(response.data)
	//   })
	//   .catch(error => {
	//     console.error(error)
	//   })

	// In this example, we're using the from() function to specify the name of the table we want to fetch data from, and then using the select() function to select all columns (*). We're then using then() to handle the successful response, and catch() to handle any errors.

	// If there's no error, we're logging the resulting data to the console. If there's an error, we're logging it to the console.

	// You can also use select() to fetch specific columns from a table. Here's an example:

	// supabase
	//   .from('table_name')
	//   .select('column1, column2')
	//   .then(response => {
	//     console.log(response.data)
	//   })
	//   .catch(error => {
	//     console.error(error)
	//   })

	// In this example, we're using the select() function to select only column1 and column2 from the table.

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
