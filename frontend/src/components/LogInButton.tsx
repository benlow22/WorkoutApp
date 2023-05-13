import React from "react";
import { Button } from "antd";

const LogInButton: React.FC<{}> = () => {
	return (
		<Button type="primary" className="login-button">
			Log In
		</Button>
	);
};

export default LogInButton;
