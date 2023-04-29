import React from "react";
import { Button } from "antd";
import { useParams } from "react-router";

const Exercise: React.FC<{}> = () => {
	const { exerciseName } = useParams();
	return (
		<Button type="primary" className="login-button">
			{exerciseName}
		</Button>
	);
};

export default Exercise;
