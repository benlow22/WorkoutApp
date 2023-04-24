import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Input } from "antd";
import { workouts, IWorkoutNameUrl } from "../data";
import { useLocation } from "react-router";
import { EditTwoTone } from "@ant-design/icons";
import { getWorkouts, updateWorkoutName } from "../api/api";
import { AuthContext } from "../contexts/AuthProvider";
import { useHistory } from "react-router-dom";
import { changeNameToUrl, buttonClickTrue } from "../utils/utils";

export interface IWorkout {
	name: string;
	numberOfExercises?: number;
}

export interface IWorkouts {
	workouts: IWorkout[];
}

export const EditWorkoutNameButton: React.FC<{
	oldWorkout: IWorkoutNameUrl;
}> = ({ oldWorkout }) => {
	const [oldWorkoutName, setOldWorkoutName] = useState<string>(
		oldWorkout.name
	);
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");
	// const [submittedWorkoutName, setSubmittedWorkoutName] =
	// 	useState<string>("");
	const [newWorkoutUrl, setNewWorkoutUrl] = useState<string>("");
	const [editName, setEditName] = useState<boolean>(false); // is edit button clicked
	const history = useHistory();


	// whenever oldWorkout, one being diosplayed, pre-edit, is entered, 
	useEffect(() => {
		setOldWorkoutName(oldWorkout.name);
	}, [oldWorkoutName]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (newWorkoutUrl.length > 0) {
				const workoutNameUpdated = await updateWorkoutName(
					oldWorkout.url,
					newWorkoutUrl,
					newWorkoutName
				);
				if (workoutNameUpdated) {
					// returned updated workout
					console.log("updated workout data:", workoutNameUpdated);
					history.push(`/workouts/${workoutNameUpdated.url}`);
				}
				setNewWorkoutUrl("");
				setNewWorkoutName("");
				setOldWorkoutName(newWorkoutName); 
				setEditName(false);
			}
		} catch (error) {
			console.log("error updated workout name", error);
			setEditName(true);
		}
	};

	return (
		<>
			{!editName ? (
				<h1>
					{oldWorkoutName}
					<EditTwoTone
						className="new-workout-edit-icon"
						onClick={() => setEditName(buttonClickTrue)}
					/>
				</h1>
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
						placeholder={oldWorkoutName}
						className="new-workout-input"
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
