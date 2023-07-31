import React from "react";

import { Button, Collapse } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";

type TProps = {
	exercise: TUsersExerciseData;
	index: number;
};

const ExercisesCollapseChild = ({ exercise, index }: TProps) => {
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
			<h3 className="index">{index + 1}.</h3>
			<h3>{exercise.name}</h3>
			<h5 className="right-side expand-summary">0/3 *</h5>
			<Button type="primary" className="login-button">
				{exercise.name}
			</Button>
		</div>
	);
};

export default ExercisesCollapseChild;
