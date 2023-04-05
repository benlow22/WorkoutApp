import React, { useContext } from "react";
import WorkoutButton from "./WorkoutButton";
import { Button } from "antd";
import { supabase } from "../src/supabaseClient";
// import {user} from './Login';
// interface IHeader {
// 	userName?: string;
// 	loggedIn: boolean;
// }
// import { user, username } from "./supabaseClient";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "./App";
import { Link } from "react-router-dom";

// const {
// 	data: { user },
// } = await supabase.auth.getUser();
// //export const data = await supabase.from('profiles').select('*').match('id', user.id);
// //const userID = await user.id;
// // const data = await supabase.from('profiles').select('*').match('id', userID);
// let {
// 	data: { username },
// 	error,
// } = await supabase
// 	.from("profiles")
// 	.select("username")
// 	.eq("id", user.id)
// 	.limit(1)
// 	.single();

export const Header: React.FC<{}> = () => {
	const { username } = useContext(AuthContext);
	// const user = supabase.auth.user();
	//console.log('username', data);
	return (
		<div className="header">
			<Link to="/">
				<h1>Workout Buddy</h1>
			</Link>
			<div className="account">
				{username && <p>{username}</p>}
				{username && <LogoutButton />}
			</div>
		</div>
	);
};
