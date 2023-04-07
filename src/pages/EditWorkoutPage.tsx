import { useParams } from "react-router-dom";
import { workoutRoutine } from "../data";

export const EditWorkoutPage = () => {
    let {name} = useParams();
    console.log('workout name from params', name)
    const workout = workoutRoutine.find(workout => {
        return workout.url === name
    })

    return (
        <div>
            {workout && <h1>{workout.name}</h1>}
            {workout?.exercises.map((exercise) => 
                <h3>Exercise: {exercise.name}</h3>  
            )}
        </div>
    )
};