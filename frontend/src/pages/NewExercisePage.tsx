import React from "react";
import { Button } from "antd";
import { useParams } from "react-router";

const NewExercise: React.FC<{}> = () => {
	const { exerciseName } = useParams();
	console.log("eercise name:", exerciseName);

	return (
		<Button type="primary" className="login-button">
			{exerciseName}
		</Button>
	);
};

export default NewExercise;
