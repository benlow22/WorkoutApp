import { useState } from "react";
import { Set } from "./sets/set";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
	const handleAddSet = () => {
		const newSet = weightAndRepsArr[weightAndRepsArr.length - 1];
		const newWeightAndRepsArr = new Array(...weightAndRepsArr);
		newWeightAndRepsArr.push(newSet);
		setWeightAndRepsArr(newWeightAndRepsArr);
	};

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
			<div className="confirmation-buttons">
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleAddSet}
					className="add-set-button"
				>
					Add Set
				</Button>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					// onClick={handleAddSet}
					className="add-set-button"
					style={{ backgroundColor: "Green" }}
				>
					Confirm Exercise
				</Button>
			</div>
		</div>
	);
};
