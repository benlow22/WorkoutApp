import React, {useState} from "react";
import { Button, Space, Input } from "antd";

export interface IWorkout {
	name: string;
	numberOfExercises?: number;
}

export interface IWorkouts {
	workouts: IWorkout[];
}

export const NewWorkoutPage = () => {
    const [workoutName, setWorkoutName] = useState<string>("");
    const handleSubmit = async (e: any) => {
		e.preventDefault();
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
		</>
	);
};
