import React from "react";
import { Button } from "antd";
import { IWorkout } from "../data";

const WorkoutButton: React.FC<{ workout: IWorkout }> = ({ workout }) => (
	<Button type="primary" block className="workout-button">
		{workout.name}
	</Button>
);

export default WorkoutButton;
