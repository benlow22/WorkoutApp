import React, { useState } from "react";

import { Button, Collapse } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";
import { Set } from "./sets/set";
import { CheckCircleOutlined } from "@ant-design/icons";
import { arrToNum } from "../../utils/utils";

type TProps = {
	exercise: TUsersExerciseData;
	index: number;
};

const ExercisesCollapseChild = ({ exercise, index }: TProps) => {
	const [weightsRepsTime, setWeightRepsTime] = useState<number[][]>(
		arrToNum(exercise.sets) // double checks that type is number
	);
	const [isDisabledArr, setIsDisabledArr] = useState<boolean[]>(
		new Array(weightsRepsTime.length).fill(true)
	);

	const handleModifySet = (newSet: number[], i: number) => {
		if (!newSet.some((element) => element < 0)) {
			const newExerciseSetData = new Array(...weightsRepsTime);
			newExerciseSetData[i] = newSet;
			setWeightRepsTime(newExerciseSetData);
		}
	};

	const handleDisableSet = (index: number) => {
		const newIsDisabledArr = new Array();
		isDisabledArr.forEach((element) => newIsDisabledArr.push(element));
		newIsDisabledArr[index] = !isDisabledArr[index];
		setIsDisabledArr(newIsDisabledArr);
	};
	return (
		<div
			className=""
			style={{
				border: "1px solid rgb(30, 59, 146)",
				backgroundColor: "#101010",
				borderRadius: "0px 0px 10px 10px",
				padding: "20px",
			}}
		>
			{weightsRepsTime.map((sets: number[], index: number) => (
				<div className="collapse-exercise-sets" key={index}>
					<Set
						set={sets}
						weightUnits={exercise.weightUnits}
						modifySets={handleModifySet}
						index={index}
						deleteSets={() => {}}
						isDisabled={isDisabledArr[index]}
					/>
					<Button
						style={{ color: "green" }}
						className="finish-exercise-button"
						onClick={() => {
							handleDisableSet(index);
						}}
					>
						<CheckCircleOutlined />
					</Button>
				</div>
			))}
		</div>
	);
};

export default ExercisesCollapseChild;
