import React, { useContext } from "react";
import { Button } from "antd";
import { supabase } from ".././supabaseClient";
import { user } from ".././supabaseClient";
import { AuthContext } from "../contexts/AuthProvider";
import { useHistory } from "react-router-dom";
const LogoutButton: React.FC<{}> = () => {
	const { setIsLoading, setUsername, setIsLoggedIn, setUserId } =
		useContext(AuthContext);
	const history = useHistory();

	const handleSignout = async () => {
		try {
			setIsLoading(true);
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			}
			setUserId("");
			setUsername("");
			setIsLoggedIn(false);
			history.push("/");
			setIsLoading(false);
		} catch (error) {
			console.error("Error while signing out", error);
		}
	};
	return (
		<Button
			type="primary"
			className="logout-button"
			onClick={handleSignout}
			hidden={!user}
		>
			Logout
		</Button>
	);
};
export default LogoutButton;
