import React, { useContext, useState } from "react";
import { Button } from "antd";
import { supabase } from ".././supabaseClient";
import { user } from ".././supabaseClient";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
const LogoutButton: React.FC<{}> = () => {
	const { setUsername, setIsLoggedIn, setUserId } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

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
			navigate("/");
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
