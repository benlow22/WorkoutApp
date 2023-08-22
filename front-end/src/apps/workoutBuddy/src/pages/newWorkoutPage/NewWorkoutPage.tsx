import { useContext, useState } from "react";
import { Button, Space, Input } from "antd";

import { postNewWorkout } from "../../api/api";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { changeNameToUrl } from "../../../../../utils/utils";

export const NewWorkoutPage = () => {
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");
	const [newWorkoutUrl, setNewWorkoutUrl] = useState<string>("");
	const { workouts, userId } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (newWorkoutUrl.length > 0) {
				const newWorkoutAdded = await postNewWorkout(
					newWorkoutUrl,
					newWorkoutName,
					userId
				);
				if (newWorkoutAdded) {
					navigate(`/workouts/${newWorkoutAdded.url}`, {
						state: {
							id: newWorkoutAdded.id,
							name: newWorkoutAdded.name,
							url: newWorkoutAdded.url,
							last_performed: newWorkoutAdded.last_performed,
						},
					});
				}
			}
			return true;
		} catch (error) {
			console.error("error inserting new workout", error);
		}
	};

	return (
		<>
			<h2 className="page-heading">New Workout Name</h2>
			<Space.Compact>
				<Input
					defaultValue="Username"
					onChange={(e) => {
						setNewWorkoutName(e.target.value),
							setNewWorkoutUrl(changeNameToUrl(e.target.value));
					}}
					maxLength={30}
					value={newWorkoutName}
					placeholder="New Workout Name"
					className="new-workout-input"
					onPressEnter={handleSubmit}
				/>
				<Button type="primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Space.Compact>
			{/* // can delete */}
			<div className="new-workout-data test">
				<p>Submitted New Workout Name: </p>
				<p>{newWorkoutName}</p>
				<br></br>
				<p>new workout url will be: </p>
				<p>{newWorkoutUrl}</p>
			</div>
		</>
	);
};
