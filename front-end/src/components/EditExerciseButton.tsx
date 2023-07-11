import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Input } from "antd";
import { useLocation } from "react-router";
import { EditTwoTone } from "@ant-design/icons";
import { updateWorkoutName } from "../api/api";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { changeNameToUrl, buttonClickTrue } from "../utils/utils";
import { IWorkout } from "../api/types";

export const EditExerciseButton: React.FC<{
	exercise: string;
}> = ({ exercise }) => {
	const [oldText, setOldText] = useState<string>(exercise);
	const [newText, setNewText] = useState<string>("");
	const [editName, setEditName] = useState<boolean>(false); // is edit button clicked
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (newWorkoutUrl.length > 0) {
				const updatedWorkout: IWorkout = await updateWorkoutName(
					oldText.url,
					newWorkoutUrl,
					newText
				);
				if (updatedWorkout) {
					// returned updated workout
					console.log("updated workout data:", updatedWorkout);
					navigate(`/workouts/${updatedWorkout.url}`, {
						state: {
							id: updatedWorkout.id,
							name: updatedWorkout.name,
							url: updatedWorkout.url,
							last_performed: updatedWorkout.last_performed,
						},
					});
					setEditName(false);
					setNewWorkoutUrl("");
					setNewText("");
					setOldText(updatedWorkout);
				}
				//setOldWorkout(newWorkoutName);
			}
		} catch (error) {
			console.log("error updated workout name", error);
			setEditName(true);
		}
	};

	return (
		<>
			{!editName ? ( // if edit button is not clicked, show name
				<h1>
					{oldText}
					<EditTwoTone
						className="new-workout-edit-icon"
						onClick={() => setEditName(true)}
					/>
				</h1>
			) : (
				<Space.Compact>
					<Input
						onChange={(e) => {
							setNewText(e.target.value),
								setNewWorkoutUrl(
									changeNameToUrl(e.target.value)
								);
						}}
						value={newText}
						placeholder={oldText.name}
						className="new-workout-input"
						onPressEnter={handleSubmit}
					/>
					<Button type="primary" onClick={handleSubmit}>
						Submit
					</Button>
				</Space.Compact>
			)}
		</>
	);
};
