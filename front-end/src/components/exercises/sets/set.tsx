import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

type TProps = {
	set: number[];
	index: number;
	weightUnits?: string;
	modifySets: (newSet: number[], i: number) => void;
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
			<p className="set-index">{index + 1}.</p>
			<p className="set-weight">
				{set[0]} {weightUnits}
			</p>
			<div className="set-reps-buttons set-item">
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => {
						modifySets([set[0] - 0.5, set[1]], index);
					}}
				/>
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						modifySets([set[0] + 0.5, set[1]], index);
					}}
				/>
			</div>
			<p className="set-reps">x {set[1]} reps</p>
			<div className="weight-buttons set-item">
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => {
						modifySets([set[0], set[1] - 1], index);
					}}
				/>
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						modifySets([set[0], set[1] + 1], index);
					}}
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
