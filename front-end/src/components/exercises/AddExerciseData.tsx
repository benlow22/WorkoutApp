import { useState } from "react";
import { Set } from "./sets/set";

const testData = {
	name: "Preacher Curls",
	defaultSets: [
		["25", "10"],
		["30", "10"],
		["35", "10"],
	],
	defaultWeightUnits: "lbs",
	defaultTime: null,
	defaultTimeUnits: null,
};
export const AddExerciseData = ({ exercise }: any) => {
	const [weightAndRepsArr, setWeightAndRepsArr] = useState<string[][]>(
		exercise.defaultSets
	);
	// get exercise data
	//
	return (
		<div className="add-exercise-data-box">
			<h3 className="add-exercise-data-exercise-name">{exercise.name}</h3>
			{weightAndRepsArr.map((set: string[], index: number) => (
				<Set
					set={set}
					index={index}
					weightUnits={exercise.defaultWeightUnits}
					setWeightAndReps={setWeightAndRepsArr}
				/>
			))}
		</div>
	);
};
