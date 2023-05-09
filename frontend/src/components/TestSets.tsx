// Renders list of Exercises

import {
	CheckCircleOutlined,
	EditOutlined,
	MinusOutlined,
	PlusOutlined,
	PoweroffOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

type Tprops = {
	set: number[];
	units: string;
	// ADD weight units: TUnits = lbs or kgs
};

// give [1,10,15]
export const TestSets = ({ set, units }: Tprops) => {
	const [setNumber, setSetNumber] = useState<number>(set[0]);
	const [numberOfReps, setNumberOfReps] = useState<number>(set[1]);
	const [weight, setWeight] = useState<number>(set[2]);
	const [disableSet, setDisableSet] = useState<boolean>(false);

	return (
		<div className="set">
			<div className="set-reps set-item">
				<p>
					{setNumber}. {numberOfReps} reps{" "}
				</p>
			</div>
			<div className="set-reps-buttons set-item">
				<Button
					disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => {}}
				/>
				<Button
					disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {}}
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
					onClick={() => {}}
				/>
				<Button
					disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {}}
				/>
			</div>
			{disableSet ? (
				<Button
					className="check-button set-item"
					size="small"
					ghost
					icon={<EditOutlined />}
					onClick={() => setDisableSet(false)}
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
		</div>
	);
};
