import React, { useState } from "react";

import { Button, Collapse } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";
import { Set } from "./sets/set";
import { CheckCircleOutlined } from "@ant-design/icons";

type TProps = {
	exercise: TUsersExerciseData;
	index: number;
};

const ExercisesCollapseChild = ({ exercise, index }: TProps) => {
	const [weightsRepsTime, setWeightRepsTime] = useState<number[][]>(
		exercise.sets
	);
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
				<div className="collapse-exercise-sets">
					<Set
						set={sets}
						weightUnits={exercise.weight_units}
						modifySets={() => {}}
						index={index}
						key={index}
						deleteSets={() => {}}
					/>
					<Button
						style={{ color: "green" }}
						className="confirm-exercise"
					>
						<CheckCircleOutlined />
					</Button>
				</div>
			))}
		</div>
	);
};

export default ExercisesCollapseChild;
