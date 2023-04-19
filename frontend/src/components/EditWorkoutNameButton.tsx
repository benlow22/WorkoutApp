import React, { useContext, useState } from "react";
import { Button, Space, Input } from "antd";
import { workouts } from "../data";
import { useLocation } from "react-router";
import { EditTwoTone } from "@ant-design/icons";
import { getWorkouts, updateWorkoutName } from "../api/api";
import { AuthContext } from "../App";
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

export const EditWorkoutNameButton = (
	oldWorkoutName: string,
	oldUrl: string
) => {
	const [workoutName, setWorkoutName] = useState<string>(oldWorkoutName);
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");
	const [submittedWorkoutName, setSubmittedWorkoutName] =
		useState<string>("");
	const [oldWorkoutUrl, setOldWorkoutUrl] = useState<string>(oldUrl);
	const [newWorkoutUrl, setNewWorkoutUrl] = useState<string>("");
	const [editName, setEditName] = useState<boolean>(false);
	const { userId } = useContext(AuthContext);

	const changeNameToUrl = (workoutName: string) => {
		let newUrl = toCamelCase(workoutName);
		setNewWorkoutUrl(newUrl);
	};

	const history = useHistory();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (oldWorkoutUrl.length > 0) {
				const workoutNameUpdated = await updateWorkoutName(
					oldWorkoutUrl,
					newWorkoutUrl,
					newWorkoutName
				);
				if (workoutNameUpdated) {
					console.log("updated workout data:", workoutNameUpdated);
					// history.push(`/workouts/${newWorkoutAddedUrl}`);
				}
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
					{workoutName}
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
