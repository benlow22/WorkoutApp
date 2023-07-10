import React, { useContext, useState } from "react";
import { Button } from "antd";
import { supabase } from "../../supabaseClient";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
// import { getSignOut } from "../../api/api";
const LogoutButton: React.FC<{}> = () => {
	const { setUsername, setIsLoggedIn, setUserId, user } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSignout = async () => {
		try {
			setIsLoading(true);
			// const res = await getSignOut();
			console.log("what is the res ");
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			} else {
				setIsLoggedIn(false);
			}
			// const expires = new Date(0).toUTCString();
			// document.cookie = `my_access_token=; path=/; max-age=${expires}; SameSite=Lax; secure`;
			// document.cookie = `my_refresh_token=; path=/; max-age=${expires}; SameSite=Lax; secure`;
			// // document.cookie = `my_user_id=; path=/; max-age=${expires}; SameSite=Lax; secure `;
			// setUserId("");
			// setUsername("");
			// setIsLoggedIn(false);
			// navigate("/");
			// setIsLoading(false);
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
