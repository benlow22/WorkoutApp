import { useEffect, useState } from "react";
import { TSets } from "../data";
import { supabase } from "../supabaseClient";
import { TestSets } from "./TestSets";
import { Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

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
	const [sets, setSets] = useState<any[]>([]);
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
				setIsLoading(false);
			}
		};
		fetchSets();
	}, []);

	const handleIncrementWeight = (index: number) => {
		let oldSets = [...sets];
		oldSets[index][1] += 1;
		setSets(oldSets);
	}

	const handleDecrementWeight = () => {
		
	}
	const handleUpdate = (newSet: number[], index: number) => {
		let oldSets = [...sets];
		oldSets[index] = newSet;
		setSets(oldSets);
	};

	const handleAddSet = () => {
		const lastSet = sets[sets.length - 1];
		console.log("last set", lastSet);
		setSets((prev: number[][]) => [...prev, [lastSet[0], lastSet[1]]]);
	};

	const handleRemoveSet = (index: number) => {
		const oldSets = [...sets];
		oldSets.splice(index, 1);
		setSets(oldSets);
	};

	return (
		<div className="exercise-set-list">
			<h2>{exerciseData?.exercises?.name}</h2>
			{sets.map((set: number[], index: number) => (
				<TestSets
					set={set}
					units={exerciseData.units}
					index={index}
					updateSets={handleUpdate}
					removeSet={handleRemoveSet}
					incrementWeight={handleIncrementWeight}
				/>
			))}
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={handleAddSet}
				className="add-set-button"
			>
				Add Set
			</Button>
		</div>
	);
};
