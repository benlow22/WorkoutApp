import React from "react";
import { Button } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";

type TProps = {
	exercise: TUsersExerciseData;
	index: number;
};

const ExerciseAccordion = ({ exercise, index }: TProps) => {
	return (
		<div className="exercise-accordion">
			<div className="exercise-accordion-heading">
				<h3 className="index">{index + 1}.</h3>
				<h3>{exercise.name}</h3>
				<h5 className="right-side expand-summary">0/3 *</h5>
			</div>
			<Button type="primary" className="login-button">
				{exercise.name}
			</Button>
		</div>
	);
};

export default ExerciseAccordion;
