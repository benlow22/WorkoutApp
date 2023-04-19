import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Input } from "antd";
import { workouts, IWorkoutNameUrl } from "../data";
import { useLocation } from "react-router";
import { EditTwoTone } from "@ant-design/icons";
import { getWorkouts, updateWorkoutName } from "../api/api";
import { AuthContext } from "../contexts/AuthProvider";
import { useHistory } from "react-router-dom";

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

export const EditWorkoutNameButton: React.FC<{
	oldWorkout: IWorkoutNameUrl;
}> = ({ oldWorkout }) => {
	const [workoutName, setWorkoutName] = useState<string>(oldWorkout.name);
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");
	const [submittedWorkoutName, setSubmittedWorkoutName] =
		useState<string>("");
	const [oldWorkoutUrl, setOldWorkoutUrl] = useState<string>(oldWorkout.url);
	const [newWorkoutUrl, setNewWorkoutUrl] = useState<string>("");
	const [editName, setEditName] = useState<boolean>(false);
	const { userId } = useContext(AuthContext);

	const changeNameToUrl = (workoutName: string) => {
		let newUrl = toCamelCase(workoutName);
		setNewWorkoutUrl(newUrl);
	};

	useEffect(() => {
		console.log("update OG name");
		setWorkoutName(oldWorkout.name);
	}, [workoutName]);

	const history = useHistory();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (newWorkoutUrl.length > 0) {
				const workoutNameUpdated = await updateWorkoutName(
					oldWorkoutUrl,
					newWorkoutUrl,
					newWorkoutName
				);
				if (workoutNameUpdated) {
					console.log("updated workout data:", workoutNameUpdated);
					history.push(`/workouts/${workoutNameUpdated.url}`);
				}
				setNewWorkoutUrl("");
				setNewWorkoutName("");
				setEditName(false);
				setWorkoutName(newWorkoutName);
			}
		} catch (error) {
			console.log("error updated workout name", error);
			setEditName(true);
		}
	};

	const revealEditName = () => {
		setEditName(true);
	};

	return (
		<>
			{!editName ? (
				<h1>
					{oldWorkout.name}
					<EditTwoTone
						className="new-workout-edit-icon"
						onClick={revealEditName}
					/>
				</h1>
			) : (
				<Space.Compact>
					<Input
						onChange={(e) => {
							setNewWorkoutName(e.target.value),
								changeNameToUrl(e.target.value);
						}}
						value={newWorkoutName}
						placeholder={workoutName}
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
