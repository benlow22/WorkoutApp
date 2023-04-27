import React, { useContext, useState } from "react";
import { Button, Space, Input } from "antd";

import { getWorkouts, postNewWorkout } from "../api/api";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toCamelCase } from "../utils/utils"

export const NewWorkoutPage = () => {
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");
	const [workoutUrl, setWorkoutUrl] = useState<string>("");
	const { userId } = useContext(AuthContext);

	const changeNameToUrl = (workoutName: string) => {
		let newUrl = toCamelCase(workoutName);
		setWorkoutUrl(newUrl);
	};

	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (workoutUrl.length > 0) {
				// must have workout url
				console.log("user IDD", userId);
				const newWorkoutAddedUrl = await postNewWorkout(
					workoutUrl,
					newWorkoutName,
					userId
				);

				if (newWorkoutAddedUrl) {
					navigate(`/workouts/${newWorkoutAddedUrl}`);
				}
			}
			return true;
		} catch (error) {
			console.log("error inserting new workout", error);
			setNewWorkoutName("");
			setWorkoutUrl("");
		}
	};

	return (
		<>
			<h2>New Workout Name</h2>
			<Space.Compact>
				<Input
					defaultValue="Username"
					onChange={(e) => {
						setNewWorkoutName(e.target.value),
							changeNameToUrl(e.target.value);
					}}
					maxLength={30}
					value={newWorkoutName}
					placeholder="New Workout Name"
					className="new-workout-input"
				/>
				<Button type="primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Space.Compact>

			<div className="new-workout-data test">
				<p>Submitted New Workout Name: </p>
				<p>{newWorkoutName}</p>
				<br></br>
				<p>new workout url will be: </p>
				<p>{workoutUrl}</p>
			</div>
		</>
	);
};
