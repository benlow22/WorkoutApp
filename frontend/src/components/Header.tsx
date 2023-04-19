import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { supabase } from "../supabaseClient";

export const Header: React.FC<{}> = () => {
	const { username, isLoggedIn, setUsername, userId } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [displayUsername, setDisplayUsername] = useState<string>("");



	// update everytime username changes; if username exists, put it on display, if not, default 
	useEffect(() => {
		if (username.length > 0) {
			setDisplayUsername(username);
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
	}, [username]);

	return (
		<div className="header">
			<Link to="/workouts">
				<h1>Workout Buddy</h1>
			</Link>
			<div className="account">
				{isLoggedIn && !isLoading && (
					<>
						<Link to="/createUsername">
							{!displayUsername
								? "Create Username"
								: displayUsername}
						</Link>
						<LogoutButton />
					</>
				)}
			</div>
		</div>
	);
};
