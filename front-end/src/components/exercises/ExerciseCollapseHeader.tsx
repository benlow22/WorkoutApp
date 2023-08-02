import { Button } from "antd";
import { TUsersExerciseData } from "../../api/types";

type TProps = {
	exercise: TUsersExerciseData;
	index: number;
};

const ExercisesCollapseHeader = ({ exercise, index }: TProps) => {
	return (
		<div className="exercise-collapse-heading">
			<h3 className="index">{index + 1}.</h3>
			<h3>{exercise.name}</h3>
			<h5 className="right-side expand-summary">0/3 *</h5>
		</div>
	);
};

export default ExercisesCollapseHeader;
