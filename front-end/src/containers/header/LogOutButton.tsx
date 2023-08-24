import React, { useContext, useState } from "react";
import { Button } from "antd";
// import { supabase } from "../../supabaseClient";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import domainsJSON from "./../../data/domains.json";
import { varFromDomainsJSON } from "../../utils/utils";
// import { getSignOut } from "../../api/api";
const LogoutButton: React.FC<{}> = () => {
	const { setUsername, setIsLoggedIn, setUserId, user, supabase } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const domains = varFromDomainsJSON(domainsJSON, "domains");
	const location = useLocation();
	const navigate = useNavigate();

	const handleSignout = async () => {
		try {
			setIsLoading(true);
			const splitPathName = location.pathname.split("/");
			const previousDomain =
				splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
			navigate(location.pathname, {
				state: {
					isLoggedOutCompletely: true,
					previousDomain: previousDomain,
				},
			});
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			}
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
