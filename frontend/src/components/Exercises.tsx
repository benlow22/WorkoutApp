// Renders list of Exercises

type Tprops = {
	exercises: { name: string }[];
};

export const Exercises = ({ exercises }: Tprops) => {
	console.log("exercise", exercises);
	return (
		<div className="exercise-list">
			{exercises.length > 0 && exercises.map((exercise) => (
				<h3>{exercise.name}</h3>
			))}
			
		</div>
	);
};
