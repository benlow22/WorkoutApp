import React, { useContext, useState } from "react";
import { Button } from "antd";
import { supabase } from "../../supabaseClient";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { domains } from "../../utils/utils";
// import { getSignOut } from "../../api/api";
const LogoutButton: React.FC<{}> = () => {
	const { setUsername, setIsLoggedIn, setUserId, user } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [previousDomain, setPreviousDomain] = useState<string>();

	const location = useLocation();
	const navigate = useNavigate();

	const handleSignout = async () => {
		try {
			setIsLoading(true);
			const previousDomain = location.pathname;
			console.log("logoutbutton prevdomain", previousDomain);
			const splitPathName = location.pathname.split("/");
			console.log("split URL ", splitPathName);
			const subDomain =
				splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
			setPreviousDomain(subDomain);
			// const res = await getSignOut();
			// console.log("what is the res ");
			navigate(location.pathname, {
				state: {
					isLoggedOutCompletely: true,
					previousDomain: subDomain,
				},
			});
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			} else {
				// navigate("/login", {
				// 	state: { previousDomain: previousDomain },
				// });
				setIsLoggedIn(false);
				return (
					<Navigate
						to={"/login"}
						state={{
							previousUrl: location.pathname,
							fromLogout: true,
						}}
					/>
				);
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
