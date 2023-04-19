import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { supabase } from "../supabaseClient";

export const Header: React.FC<{}> = () => {
	const { username, isLoggedIn, setUsername, userId } =
		useContext(AuthContext);
	const [isReady, setIsReady] = useState<boolean>(false);

	useEffect(() => {
		const getUsername = async () => {
			const { data, error } = await supabase.from('profiles').select('username').eq('id', userId);
			console.log('ASDF ASDF ', data)
			if (data && data.length > 0) {
				setUsername(data[0].username)
				setIsReady(true);
			}
		};
		getUsername();
	}, [isLoggedIn]);

	return (
		<div className="header">
			<Link to="/workouts">
				<h1>Workout Buddy</h1>
			</Link>
			<div className="account">
				{(isLoggedIn && isReady) && (
					<>
						<Link to="/createUsername">
							{!username ? "Create Username" : username}
						</Link>
						<LogoutButton />
					</>
				)}
			</div>
		</div>
	);
};
