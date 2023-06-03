// Renders list of Exercises

type Tprops = {
	exercises: { name: string }[];
};

export const Exercises = ({ exercises }: Tprops) => {
	// console.log("exercise", exercises);
	return (
		<div className="exercise-list">
			{exercises.length > 0 &&
				exercises.map((exercise, index) => (
					<h3 key={index}>{exercise.name}</h3>
				))}
		</div>
	);
};
