import { useParams } from "react-router-dom";
import { workouts } from "../data";

export const EditWorkoutPage = () => {
    let {name} = useParams();
    console.log('workout name from params', name)

    const workout = workouts.find(workout => {
        return workout.url === name
    })

    return (
        <div>
            {workout && <h1>{workout.name}</h1>}
        </div>
    )
};