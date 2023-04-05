import { useParams } from "react-router"

export const EditWorkoutPage = () => {
    let {workout} = useParams();
    return (
        <h1>workout</h1>
    )
}