import React, { useContext, useState } from "react";
import { Button, Space, Input } from "antd";

import { getWorkouts, postNewWorkout } from "../api/api";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export interface IWorkout {
	name: string;
	numberOfExercises?: number;
}

export interface IWorkouts {
	workouts: IWorkout[];
}

const toCamelCase = (phrase: string): string => {
	let newStr = "";
	let ch1 = phrase[0];
	if ((ch1 >= "a" && ch1 <= "z") || (ch1 >= "A" && ch1 <= "Z")) {
		newStr = ch1.toLowerCase();
	}

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

// const postNewWorkout = (name: string) => {
// 	workouts2.push({ name: name, url: toCamelCase(name) });
// };
// TO DO
// should i add workouts to Provider?

export const NewWorkoutPage = () => {
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");
	const [submittedWorkoutName, setSubmittedWorkoutName] =
		useState<string>("");
	const [workoutUrl, setWorkoutUrl] = useState<string>("");
	const { userId } = useContext(AuthContext);

	const changeNameToUrl = (workoutName: string) => {
		let newUrl = toCamelCase(workoutName);
		setWorkoutUrl(newUrl);
	};

	const navigate = useNavigate();

	// const handleSubmit = async (e: any) => {
	// 	e.preventDefault();
	// 	try {

	// 		const createWorkout = async () => {
	// 			// also check if workout already exists
	// 			let workoutExists = Object.values(workouts2).includes({
	// 				name: workoutName,
	// 				url: toCamelCase(workoutName),
	// 			});
	// 			if (!workoutExists) {
	// 				const newWorkouts = await postNewWorkout(workoutName);
	// 				setSubmittedWorkoutName(workoutName);
	// 			} else {
	// 				console.log("workout name taken");
	// 			}
	// 		};
	// 		createWorkout();
	// 		setWorkoutName("");
	// 	} catch (error) {
	// 		console.log(`error creating workout ${workoutName}`, error);
	// 	}
	// };

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

	const handleEditName = () => {
		setNewWorkoutName(submittedWorkoutName);
		setSubmittedWorkoutName("");
	};

	return (
		<>
			{/* {!submittedWorkoutName ? ( */}
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
				<p>Submitted New Workout Name: </p>
				<p>{newWorkoutName}</p>
				<br></br>
				<p>new workout url will be: </p>
				<p>{workoutUrl}</p>
			</div>
		</>
	);
};
