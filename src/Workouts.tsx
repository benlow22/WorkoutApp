import React from "react";
import WorkoutButton from "./WorkoutButton";

export interface IWorkout {
	name: string;
	numberOfExercises?: number;
}

export interface IWorkouts {
	workouts: IWorkout[];
}

export const WorkoutsPage = ({ workouts }: { workouts: IWorkout[] }) => {
	return (
		<div>
			{workouts.map((workout) => (
				<WorkoutButton workout={workout} />
			))}
		</div>
	);
};
