import React, { useState } from "react";
import type { CollapseProps } from "antd";

import { Button, Collapse } from "antd";
import { useParams } from "react-router";
import { TUsersExerciseData } from "../../api/types";
import ExercisesCollapseChild from "./ExerciseCollapseChild";
import ExercisesCollapseHeader from "./ExerciseCollapseHeader";
import { FormOutlined, SettingOutlined } from "@ant-design/icons";

type TProps = {
	exercises: TUsersExerciseData[];
};

const ExercisesCollapse = ({ exercises }: TProps) => {
	// console.log("exer", exercises);
	const [completedSetsArr, setCompletedSetsArr] = useState<number[]>(
		new Array(exercises.length).fill("0")
	);

	const handleUpdateCompletedSets = (value: number, index: number) => {
		const newCompletedSetsArr = new Array();
		completedSetsArr.forEach((element) =>
			newCompletedSetsArr.push(element)
		);
		if (value < exercises[index].sets.length + 1) {
			newCompletedSetsArr[index] = value;
			setCompletedSetsArr(newCompletedSetsArr);
		}
	};
	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	const genExtra = (index: number) => (
		<FormOutlined
			className="collapse-form-outlined"
			onClick={(event) => {
				// If you don't want click extra trigger collapse, you can prevent this:
				// event.stopPropagation();
				// but i want to make sure it is open and then editable
			}}
		/>
	);
	const items = exercises.map((exercise, index) => ({
		key: index + 1,
		label: (
			<div className="exercise-collapse-heading">
				<h3 className="index">{index + 1}.</h3>
				<h3>{exercise.name}</h3>
				<h4
					className="right-side expand-summary"
					// style={{ fontWeight: "normal" }}
				>
					{completedSetsArr[index] ?? "0"}/{exercise.sets.length}
				</h4>
			</div>
		),
		// <ExercisesCollapseHeader exercise={exercise} index={index} />,
		children: (
			<ExercisesCollapseChild
				exercise={exercise}
				index={index}
				handleUpdateCompletedSets={handleUpdateCompletedSets}
			/>
		),
		extra: genExtra(index),
		style: {
			marginBottom: "15px",
			border: "2px solid rgb(30, 59, 146)",
			borderRadius: 15,
			backgroundColor: "rgb(30, 59, 146)",
			// color: "white",
		},
	}));
	// console.log("items", items);

	return (
		<Collapse
			items={items}
			onChange={onChange}
			className="
		exercise-collapse"
			style={{
				alignItems: "center",
				border: "none",
				padding: "0px",
			}}
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
