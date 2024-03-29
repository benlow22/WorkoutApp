import React, { useEffect, useState } from "react";
import { Button, Space, Input } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { updateWorkoutName } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { changeNameToUrl } from "../../../../../utils/utils";
import { IWorkout } from "../../../../../api/types";

// export interface IWorkout {
// 	name: string;
// 	numberOfExercises?: number;
// }

// export interface IWorkouts {
// 	workouts: IWorkout[];
// }

export const EditWorkoutNameButton: React.FC<{
	workout: IWorkout;
}> = ({ workout }) => {
	const [oldWorkout, setOldWorkout] = useState<IWorkout>(workout);
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");
	const [newWorkoutUrl, setNewWorkoutUrl] = useState<string>("");
	const [editName, setEditName] = useState<boolean>(false); // is edit button clicked
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (newWorkoutUrl.length > 0) {
				const updatedWorkout: IWorkout = await updateWorkoutName(
					oldWorkout.url,
					newWorkoutUrl,
					newWorkoutName
				);
				if (updatedWorkout) {
					// returned updated workout
					console.log("updated workout data:", updatedWorkout);
					navigate(`/workoutBuddy/workouts/${updatedWorkout.url}`, {
						state: {
							id: updatedWorkout.id,
							name: updatedWorkout.name,
							url: updatedWorkout.url,
							last_performed: updatedWorkout.last_performed,
						},
					});
					setEditName(false);
					setNewWorkoutUrl("");
					setNewWorkoutName("");
					setOldWorkout(updatedWorkout);
				}
				//setOldWorkout(newWorkoutName);
			}
		} catch (error) {
			console.log("error updated workout name", error);
			setEditName(true);
		}
	};

	useEffect(() => {}, [oldWorkout]);

	return (
		<>
			{!editName ? ( // if edit button is not clicked, show name
				<h2>
					{oldWorkout.name}
					<EditTwoTone
						className="new-workout-edit-icon"
						onClick={() => setEditName(true)}
					/>
				</h2>
			) : (
				<Space.Compact>
					<Input
						onChange={(e) => {
							setNewWorkoutName(e.target.value),
								setNewWorkoutUrl(
									changeNameToUrl(e.target.value)
								);
						}}
						value={newWorkoutName}
						placeholder={oldWorkout.name}
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

{
	/* <div className="new-workout-data test">
						<p>Submitted New Workout Name: </p>
						<p>{newWorkoutName}</p>
						<br></br>
						<p>new workout url will be: </p>
						<p>{newWorkoutUrl}</p>
					</div> */
}
