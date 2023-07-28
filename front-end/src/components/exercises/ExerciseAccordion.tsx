import React from "react";
import { Button } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";

type TProps = {
	exercise: TUsersExerciseData;
	index: number;
};

const ExerciseAccordion = ({ exercise }: TProps) => {
	return (
		<Button type="primary" className="login-button">
			{exercise.name}
		</Button>
	);
};

export default ExerciseAccordion;
