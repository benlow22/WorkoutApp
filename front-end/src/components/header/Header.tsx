import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import LogInButton from "./LogInButton";
import { useLocation } from "react-router-dom";

export const Header: React.FC<{}> = () => {
	const { username, isLoggedIn, auth, contextIsLoading } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true); // wait for username to be fetched before rendering.
	const [displayUsername, setDisplayUsername] = useState<string>("");
	const location = useLocation();

	// update everytime username changes; if username exists, put it on display, if not, default
	useEffect(() => {
		if (!contextIsLoading) {
			if (username) {
				setDisplayUsername(username);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		}
	}, [username, contextIsLoading]);

	if (!contextIsLoading) {
		return (
			<div className="header">
				<div className="content">
					{auth ? (
						<Link to="/workouts">
							<h1>Workout Buddy</h1>
						</Link>
					) : (
						<Link to="/">
							<h1>Workout Buddy</h1>
						</Link>
					)}
					{auth &&
						!isLoading && ( // if authorized render "upsert username" link
							<div className="account">
								<Link to="/createUsername">
									{!username
										? "Create Username"
										: displayUsername}
								</Link>
								<LogoutButton />
							</div>
						)}
					{!auth &&
						!isLoading &&
						!(location.pathname === "/login") && ( // login button appears if not authorized, and not on /login page.
							<Link to="/login">
								<LogInButton />
							</Link>
						)}
				</div>
			</div>
		);
	} else {
		return <div className="header"></div>;
	}
};
