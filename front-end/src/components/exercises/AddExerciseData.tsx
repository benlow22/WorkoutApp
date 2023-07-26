import { useEffect, useState } from "react";
import { Set } from "./sets/set";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { INewExerciseInput } from "../../api/types";

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

export const AddExerciseData = (exercise: INewExerciseInput) => {
	const [weightAndRepsArr, setWeightAndRepsArr] = useState<string[][]>(
		exercise.defaultSets
	);

	useEffect(() => {
		//GET personal set DATA
	}, []);
	// get exercise data
	//
	const handleAddSet = () => {
		const newSet = weightAndRepsArr[weightAndRepsArr.length - 1];
		const newWeightAndRepsArr = new Array(...weightAndRepsArr);
		newWeightAndRepsArr.push(newSet);
		setWeightAndRepsArr(newWeightAndRepsArr);
	};

	const handleDeleteSet = (i: number) => {
		const newSets = weightAndRepsArr.filter((set, index) => index !== i);
		const newWeightAndRepsArr = Array(...newSets);
		if (newSets.length >= 1) {
			setWeightAndRepsArr(newSets);
		} else {
			alert(
				"cannot have 0 sets, if you want to delete the exercise, click the remove exercise Button"
			);
		}
	};

	const handleModifySet = (newSet: string[], i: number) => {
		const newExerciseSetData = new Array(...weightAndRepsArr);
		newExerciseSetData[i] = newSet;
		console.log("newSETTT", newExerciseSetData);
		setWeightAndRepsArr(newExerciseSetData);
	};

	return (
		<div className="add-exercise-data-box">
			<h3 className="add-exercise-data-exercise-name">{exercise.name}</h3>
			{weightAndRepsArr &&
				weightAndRepsArr.map((set: string[], index: number) => (
					<Set
						set={set}
						index={index}
						weightUnits={exercise.defaultWeightUnits}
						modifySets={handleModifySet}
						deleteSets={handleDeleteSet}
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
