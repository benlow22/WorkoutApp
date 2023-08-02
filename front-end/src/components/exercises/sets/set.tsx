import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber } from "antd";
import { useState } from "react";

type TProps = {
	set: number[];
	index: number;
	weightUnits?: string;
	modifySets: (newSet: number[], i: number) => void;
	deleteSets: (i: number) => void;
	isDisabled?: boolean;
	isGhost: boolean;
};

export const Set = ({
	set,
	index,
	weightUnits,
	modifySets,
	deleteSets,
	isDisabled,
	isGhost,
}: TProps) => {
	const [isInputWeight, setIsInputWeight] = useState<boolean>(false);

	const handleInputWeightOnEnter = (e: any) => {
		const value = Number(e.target.value);
		if (value > 0 && typeof value === "number")
			modifySets([value, set[1]], index);
		setIsInputWeight(false);
	};

	return (
		<div className={`${isGhost ? "ghosted " : ""} white-font exercise-set`}>
			<p className="set-index">{index + 1}.</p>
			{!isInputWeight ? (
				<Button
					type="link"
					className="set-weight"
					onClick={() => setIsInputWeight(!isInputWeight)}
					disabled={isDisabled}
				>
					{set[0]} {weightUnits}
				</Button>
			) : (
				<div className="weight-input">
					<Input
						size="small"
						className="weight-input-box"
						defaultValue={set[0]}
						onPressEnter={handleInputWeightOnEnter}
						disabled={isDisabled}
					/>
					<p>{weightUnits}</p>
				</div>
			)}
			<div className="set-reps-buttons set-item">
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => {
						modifySets([set[0] - 0.5, set[1]], index);
					}}
					disabled={isDisabled}
					ghost={isGhost}
				/>
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						modifySets([set[0] + 0.5, set[1]], index);
					}}
					disabled={isDisabled}
					ghost={isGhost}
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
					disabled={isDisabled}
					ghost={isGhost}
				/>
				<Button
					// disabled={disableSet}
					size="small"
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						modifySets([set[0], set[1] + 1], index);
					}}
					disabled={isDisabled}
					ghost={isGhost}
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
				disabled={isDisabled}
			/>
		</div>
	);
};
