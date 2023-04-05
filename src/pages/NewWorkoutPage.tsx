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

const toCamelCase = (phrase: string): string => {
	let newStr = "";
	let ch1 = phrase[0];
	if ((ch1 >= "a" && ch1 <= "z") || (ch1 >= "A" && ch1 <= "Z")) {
		newStr = ch1.toLowerCase();
		console.log("ch1", newStr);
	}
	console.log("ch1 outside", newStr);

	const capitalizeChAfterSpace = (ch: string) => {
		if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
			if (ch === ch.toUpperCase()) {
				newStr += ch;
			} else {
				newStr += ch.toUpperCase();
			}
		} else if (ch >= "0" && ch <= "9") {
			newStr += ch;
		}
	};

	for (let i = 1; i < phrase.length; i++) {
		const ch = phrase[i];
		console.log("phrase[i]", phrase[i]);
		if (phrase[i - 1] == " ") {
			const capitalizeCh = capitalizeChAfterSpace(ch);
		} else if ((ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9")) {
			newStr += ch;
		} else if (ch >= "A" && ch <= "Z") {
			newStr += ch.toLowerCase();
		}
	}
	return newStr;
};

const postNewWorkout = (name: string) => {
	console.log("POST WORKOUT", name);
	workouts2.push({ name: name, url: toCamelCase(name) });
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
					url: toCamelCase(workoutName),
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

	const handleEditName = () => {
		setWorkoutName(submittedWorkoutName);
		setSubmittedWorkoutName("");
	};

	return (
		<>
			{/* {!submittedWorkoutName ? ( */}
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
			{/* ) : (
				<section className="new-workout-name">
					<h2>{submittedWorkoutName}</h2>
					<EditTwoTone
						className="new-workout-edit-icon"
						onClick={handleEditName}
					/>
				</section>
			)} */}

			<div className="new-workout-data test">
				<p>
					Submitted New Workout Name: {submittedWorkoutName},
					{toCamelCase(submittedWorkoutName)}
				</p>
			</div>
		</>
	);
};
