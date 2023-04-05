import React from "react";
import WorkoutButton from "./WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route } from "react-router-dom";
import { NewWorkoutPage } from "./NewWorkoutPage";
export interface IWorkout {
	name: string;
	numberOfExercises?: number;
}

export interface IWorkouts {
	workouts: IWorkout[];
}

export const WorkoutsPage = ({ workouts }: { workouts: IWorkout[] }) => {
	return (
		<>
			{workouts.map((workout) => (
				<Link to={`/${workout.name}`}>
					<WorkoutButton workout={workout} />
				</Link>
			))}
			<Link to={`/new-workout`}>
				<Button
					type="primary"
					block
					className="add-new-workout-button workout-button"
				>
					Add New Workout [+]
				</Button>
			</Link>

		</>
	);
};
