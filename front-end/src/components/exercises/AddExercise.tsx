import { Button } from "antd";
import { useEffect, useState } from "react";
import { SearchExercises } from "../SearchExercises";
import { NewExerciseInput } from "../../pages/NewExercisePage";

export const AddExercise = () => {
	const [isShowAddExerciseButton, setIsShowAddExerciseButton] =
		useState<boolean>(true);
	const [isShowSearchExerciseBar, setIsShowSearchExerciseBar] =
		useState<boolean>(false);
	isShowSearchExerciseBar;
	const [exerciseName, setExerciseName] = useState<string>("");
	const [isNewExercise, setIsNewExercise] = useState<boolean>(true);

	useEffect(() => {
		if (exerciseName) {
			setIsShowSearchExerciseBar(false);
			setIsShowAddExerciseButton(false);
		}
	}, [exerciseName]);

	return (
		/* add exercise button 
            - if clicked searchbar shows up
        exercise searched 
            - if new 
                = new exercise component 
            - if old
                = old exercise component 
        */
		<div className="add-exercise-container">
			{isShowAddExerciseButton && (
				<Button
					type="primary"
					onClick={() => (
						setIsShowAddExerciseButton(false),
						setIsShowSearchExerciseBar(true)
					)}
					className="add-exercise-button"
				>
					Add Exercise
				</Button>
			)}
			{isShowSearchExerciseBar && (
				<SearchExercises
					setExerciseName={setExerciseName}
					setIsNewExercise={setIsNewExercise}
					isNewExercise={isNewExercise}
				/>
			)}
			{isNewExercise && exerciseName && (
				<NewExerciseInput
					exerciseName={exerciseName}
					setExerciseName={setExerciseName}
				/>
			)}
			{
				!isNewExercise && exerciseName
				// <ExerciseInput />			)
			}
		</div>
	);
};
