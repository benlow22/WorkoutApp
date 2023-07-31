import React from "react";
import type { CollapseProps } from "antd";

import { Button, Collapse } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";
import ExercisesCollapseChild from "./ExerciseCollapseChild";
import ExercisesCollapseHeader from "./ExerciseCollapseHeader";
import { SettingOutlined } from "@ant-design/icons";

type TProps = {
	exercises: TUsersExerciseData[];
};

const ExercisesCollapse = ({ exercises }: TProps) => {
	console.log("exer", exercises);
	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	const genExtra = () => (
		<SettingOutlined
			onClick={(event) => {
				// If you don't want click extra trigger collapse, you can prevent this:
				event.stopPropagation();
			}}
		/>
	);
	const items = exercises.map((exercise, index) => ({
		key: index + 1,
		label: (
			<>
				<h3>
					{index + 1}. {exercise.name}
				</h3>
			</>
		),
		// <ExercisesCollapseHeader exercise={exercise} index={index} />,
		children: <ExercisesCollapseChild exercise={exercise} index={index} />,
		extra: genExtra(),
	}));
	console.log("items", items);

	return (
		<Collapse
			items={items}
			onChange={onChange}
			className="
		exercise-collapse"
			style={{ alignItems: "center" }}
		/>
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
