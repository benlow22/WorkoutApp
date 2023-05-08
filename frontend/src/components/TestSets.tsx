// Renders list of Exercises

import { useState } from "react";

type Tprops = {
	set: number[];
	units: string;
	// ADD weight units: TUnits = lbs or kgs
};

// give [1,10,15]
export const TestSets = ({ set, units }: Tprops) => {
	const [setNumber, setSetNumber] = useState<number>(set[0]);
	const [numberOfReps, setNumberOfReps] = useState<number>(set[1]);
	const [weight, setWeight] = useState<number>(set[2]);

	return (
		<div className="set">
			<p>Set {setNumber}</p>
			<p># of Reps: {numberOfReps}</p>
			<p>
				weight: {weight} {units}
			</p>
		</div>
	);
};
