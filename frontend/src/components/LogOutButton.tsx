import React, { useContext } from "react";
import { Button } from "antd";
import { supabase } from ".././supabaseClient";
import { user } from ".././supabaseClient";
import { AuthContext } from "../contexts/AuthProvider";

const LogoutButton: React.FC<{}> = () => {
	const { setIsLoading, setUsername } = useContext(AuthContext);

	const handleSignout = async () => {
		try {
			setIsLoading(true);
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			}

			setUsername("");
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
