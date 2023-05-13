// Renders list of Exercises

import {
	CheckCircleOutlined,
	DeleteOutlined,
	EditOutlined,
	MinusOutlined,
	PlusOutlined,
	PoweroffOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";

type Tprops = {
	set: number[];
	units: string;
	index: number;
	updateSets: (newset: number[], index: number) => void;
	removeSet: (index: number) => void;
	// ADD weight units: TUnits = lbs or kgs
};

// give [1,10,15]
export const TestSets = ({
	set,
	units,
	index,
	updateSets,
	removeSet,
}: Tprops) => {
	// const [setNumber, setSetNumber] = useState<number>(set[0]); using index now as set number +1
	const [numberOfReps, setNumberOfReps] = useState<number>(set[0]);
	const [weight, setWeight] = useState<number>(set[1]);
	const [disableSet, setDisableSet] = useState<boolean>(false);

	useEffect(() => {
		updateSets([numberOfReps, weight], index);
	}, [numberOfReps, weight]);

	useEffect(() => {
		if (set) {
			setNumberOfReps(set[0]);
			setWeight(set[1]);
		}
	}, [set]);

	return (
		<div className="set">
			<div className="set-reps set-item">
				<p>
					{index + 1}. {numberOfReps} reps
				</p>
			</div>
			<div className="set-reps-buttons set-item">
				<Button
					disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => {
						setNumberOfReps((prev) => prev - 1);
					}}
				/>
				<Button
					disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						setNumberOfReps((prev) => prev + 1);
					}}
				/>
			</div>
			<div className="set-weight-and-units set-item">
				<p>
					x {weight} {units}{" "}
				</p>
			</div>
			<div className="weight-buttons set-item">
				<Button
					disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => {
						setWeight((prev) => prev - 0.5);
					}}
				/>
				<Button
					disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						setWeight((prev) => prev + 0.5);
					}}
				/>
			</div>
			{disableSet ? (
				<Button
					className="check-button set-item"
					size="small"
					ghost
					icon={<EditOutlined />}
					onClick={() => {
						setDisableSet(false);
					}}
				/>
			) : (
				<Button
					className="edit-set-button set-item"
					size="small"
					type="primary"
					icon={<CheckCircleOutlined />}
					onClick={() => setDisableSet(true)}
				/>
			)}
			<Button
				icon={<DeleteOutlined />}
				className="delete-set-button"
				type="text"
				size="small"
				onClick={() => removeSet(index)}
			/>
		</div>
	);
};
