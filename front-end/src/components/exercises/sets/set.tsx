import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

type TProps = {
	set: string[];
	index: number;
	weightUnits: string;
	modifySets: (newSet: string[], i: number) => void;
	deleteSets: (i: number) => void;
};

export const Set = ({
	set,
	index,
	weightUnits,
	modifySets,
	deleteSets,
}: TProps) => {
	return (
		<div className="white-font exercise-set">
			<p>{index + 1}.</p>
			{set[0]} {weightUnits}
			<div className="set-reps-buttons set-item">
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => {
						modifySets([set[0] - 1, set[1]], index);
					}}
				/>
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					// onClick={() => {
					// 	setNumberOfReps((prev) => prev + 1);
					// }}
				/>
			</div>
			<p>x {set[1]} reps</p>
			<div className="weight-buttons set-item">
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					// onClick={() => {
					// 	updateSets([numberOfReps, weight - 2], index);
					// }}
				/>
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					// onClick={() => {
					// 	incrementWeight(index);
					// }}
				/>
			</div>
			{/* {disableSet ? (
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
			)} */}
			<Button
				icon={<DeleteOutlined />}
				className="delete-set-button"
				type="text"
				size="small"
				onClick={() => deleteSets(index)}
			/>
		</div>
	);
};
