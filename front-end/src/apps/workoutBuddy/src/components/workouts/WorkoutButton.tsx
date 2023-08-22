import React from "react";
import { Button } from "antd";
import { IWorkout } from "../../../api/types";

const WorkoutButton: React.FC<{ workout: IWorkout }> = ({ workout }) => (
	<Button type="primary" block className="workout-button capitalize">
		{workout.name}
	</Button>
);

export default WorkoutButton;
