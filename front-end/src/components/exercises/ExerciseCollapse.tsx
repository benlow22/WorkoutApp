import React from "react";
import type { CollapseProps } from "antd";

import { Button, Collapse } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";
import ExercisesCollapseChild from "./ExerciseCollapseChild";

type TProps = {
	exercises: TUsersExerciseData[];
};

const ExercisesCollapse = ({ exercises }: TProps) => {
	console.log("exer", exercises);
	const onChange = (key: string | string[]) => {
		console.log(key);
	};
	const items = exercises.map((exercise, index) => ({
		key: index + 1,
		label: exercise.name,
		children: <ExercisesCollapseChild exercise={exercise} index={index} />,
	}));
	console.log(items);
	return (
		<Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
		// <div className="exercise-collapse">
		// 	<div className="exercise-collapse-heading">
		// 		<h3 className="index">{index + 1}.</h3>
		// 		<h3>{exercise.name}</h3>
		// 		<h5 className="right-side expand-summary">0/3 *</h5>
		// 	</div>
		// 	<Button type="primary" className="login-button">
		// 		{exercise.name}
		// 	</Button>
		// </div>
	);
};

export default ExercisesCollapse;
