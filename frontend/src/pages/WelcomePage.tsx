import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

export const WelcomePage = () => {
	const { isLoggedIn } = useContext(AuthContext);

	if (!isLoggedIn) {
		return <h1>Welcome to the WORKOUT APP</h1>;
	} else {
		return <Navigate to={"workouts"} replace />;
	}
};
