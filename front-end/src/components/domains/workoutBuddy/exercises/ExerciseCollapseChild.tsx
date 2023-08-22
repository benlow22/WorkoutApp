import React, { useEffect, useState } from "react";

import { Button, Collapse } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../../../api/types";
import { Set } from "./Set";
import { CheckCircleOutlined } from "@ant-design/icons";
import { arrToNum } from "../../../../utils/utils";

type TProps = {
	exercise: TUsersExerciseData;
	index: number;
	handleUpdateCompletedSets: (value: number, index: number) => void;
};

const ExercisesCollapseChild = ({
	exercise,
	index,
	handleUpdateCompletedSets,
}: TProps) => {
	const [weightsRepsTime, setWeightRepsTime] = useState<number[][]>(
		arrToNum(exercise.sets) // double checks that type is number
	);
	const initialArr = new Array(weightsRepsTime.length).fill(true);
	initialArr[0] = false;
	const [isGhostArr, setIsGhostArr] = useState<boolean[]>(initialArr);
	const [isGhostCompletedButtonArr, setIsGhosCompletedButtonArr] =
		useState<boolean[]>(initialArr);

	const [isCompletedSetsArr, setIsCompletedSetsArr] = useState<boolean[]>(
		new Array(weightsRepsTime.length).fill(false)
	);
	const [completedSets, setCompletedSets] = useState<number>(0);
	const handleModifySet = (newSet: number[], i: number) => {
		if (!newSet.some((element) => element < 0)) {
			const newExerciseSetData = new Array(...weightsRepsTime);
			newExerciseSetData[i] = newSet;
			setWeightRepsTime(newExerciseSetData);
		}
	};

	const handleGhostSet = (indexes: number[]) => {
		const newIsGhostArr = new Array(...isGhostArr);
		for (let i = 0; i < indexes.length; i++) {
			if (isGhostArr[indexes[i]])
				newIsGhostArr[indexes[i]] = !isGhostArr[indexes[i]];
		}
		setIsGhostArr(newIsGhostArr);
	};

	useEffect(() => {
		handleUpdateCompletedSets(completedSets, index);
	}, [completedSets]);

	const handleCompleteSet = (index: number) => {
		setCompletedSets(completedSets + 1);

		const newIsCompletedSetsArr = new Array();
		isCompletedSetsArr.forEach((element) =>
			newIsCompletedSetsArr.push(element)
		);
		newIsCompletedSetsArr[index] = true;
		setIsCompletedSetsArr(newIsCompletedSetsArr);

		const newIsGhostArr = new Array();
		isGhostArr.forEach((element) => newIsGhostArr.push(element));
		console.log("ghostARR", newIsCompletedSetsArr);
		newIsGhostArr[index] = true;
		const nextToComplete = newIsCompletedSetsArr.findIndex(
			(element) => element === false
		);
		console.log("ELE", nextToComplete);

		const newIsGhostCompleteButtonArr = new Array();
		isGhostCompletedButtonArr.forEach((element) =>
			newIsGhostCompleteButtonArr.push(element)
		);
		newIsGhostCompleteButtonArr[index] = false;
		if (nextToComplete > 0) {
			newIsGhostArr[nextToComplete] = false;
			newIsGhostCompleteButtonArr[nextToComplete] = false;
		}

		setIsGhostArr(newIsGhostArr);
		setIsGhosCompletedButtonArr(newIsGhostCompleteButtonArr);
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
				<div className={`collapse-exercise-sets`} key={index}>
					<Set
						set={sets}
						weightUnits={exercise.weightUnits}
						modifySets={handleModifySet}
						index={index}
						deleteSets={() => {}}
						isGhost={isGhostArr[index]}
					/>
					<Button
						className={`${
							isCompletedSetsArr[index] ? "completed" : ""
						} finish-exercise-button ${
							isGhostCompletedButtonArr[index] ? "ghosted" : ""
						}`}
						onClick={() => {
							handleCompleteSet(index);
						}}
						ghost={isGhostCompletedButtonArr[index]}
					>
						<CheckCircleOutlined />
					</Button>
				</div>
			))}
		</div>
	);
};

export default ExercisesCollapseChild;
