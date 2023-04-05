import React, { useState } from "react";
import { Button, Space, Input } from "antd";
import { workouts } from "../data";
import { useLocation } from "react-router";
import { EditTwoTone } from "@ant-design/icons";

export interface IWorkout {
	name: string;
	numberOfExercises?: number;
}

export interface IWorkouts {
	workouts: IWorkout[];
}

let workouts2 = workouts;
const postNewWorkout = (name: string) => {
	console.log("POST WORKOUT", name);
	workouts2.push({ name: name });
};
// TO DO
// should i add workouts to Provider?

export const NewWorkoutPage = () => {
	const [workoutName, setWorkoutName] = useState<string>("");
	const [submittedWorkoutName, setSubmittedWorkoutName] =
		useState<string>("");
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const createWorkout = async () => {
				// also check if workout already exists
				let workoutExists = Object.values(workouts2).includes({
					name: workoutName,
				});
				if (!workoutExists) {
					const newWorkouts = await postNewWorkout(workoutName);
					setSubmittedWorkoutName(workoutName);
				} else {
					console.log("workout name taken");
				}
			};
			createWorkout();
			setWorkoutName("");
		} catch (error) {
			console.log(`error creating workout ${workoutName}`, error);
		}
		// try {
		// 	const { error } = await supabase
		// 		.from("profiles")
		// 		.update({ username: newUsername })
		// 		.eq("id", userid);
		// 	setUsername(newUsername);
		// 	setNewUsername("");
		// } catch (err) {
		// 	console.log("error updating username", err);
		// }
	};

	return (
		<>
			{!submittedWorkoutName ? (
				<Space.Compact>
					<Input
						defaultValue="Username"
						onChange={(e) => setWorkoutName(e.target.value)}
						value={workoutName}
						placeholder="New Workout Name"
						className="new-workout-input"
					/>
					<Button type="primary" onClick={handleSubmit}>
						Submit
					</Button>
				</Space.Compact>
			) : (
				<section className="new-workout-name">
					<h2>{submittedWorkoutName}</h2>
					<EditTwoTone className="new-workout-edit-icon"/>
				</section>
			)}

			<div className="new-workout-data test">
				<p>Submitted New Workout Name: {submittedWorkoutName}</p>
			</div>
		</>
	);
};
