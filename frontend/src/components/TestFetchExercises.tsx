import { useEffect, useState } from "react";
import { TSets } from "../data";
import { supabase } from "../supabaseClient";
import { TestSets } from "./TestSets";

type TProps = {
	exercise: TSets;
};

type TSet = {
	setnumber: number;
	numberOfReps: number;
	weight: number;
};

type TExerciseId = {
	exerciseId: string;
};
//CHANGE exerciseID to Exercise + id + name
// takes exercise ID and returns sets
export const TestFetchExercise = ({ exerciseId }: TExerciseId) => {
	const [sets, setSets] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [exerciseData, setExerciseData] = useState<any>([]);

	useEffect(() => {
		const fetchSets = async () => {
			let { data: users_exercises, error } = await supabase
				.from("users_exercises")
				.select("*, exercises(name)")
				.eq("exercise_id", exerciseId);
			console.log("setDATA:", users_exercises);
			if (users_exercises) {
				setSets(users_exercises[0].sets);
				setExerciseData(users_exercises[0]);
			}
		};
		fetchSets();
	}, []);

	return (
		<div className="set-list">
            <h2>{exerciseData?.exercises?.name}</h2>
			{sets.map((set: number[]) => (
				<TestSets set={set} units={exerciseData.units} />
			))}
			{/* <h2>{exercise.name}</h2> */}
			{/* {exercises.length > 0 &&
				exercises.map((exercise) => <h3>{exercise.name}</h3>)} */}
		</div>
	);
};
