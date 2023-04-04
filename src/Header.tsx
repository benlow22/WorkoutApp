import React from "react";
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

const {
	data: { user },
} = await supabase.auth.getUser();
//export const data = await supabase.from('profiles').select('*').match('id', user.id);
//const userID = await user.id;
// const data = await supabase.from('profiles').select('*').match('id', userID);
let {
	data: { username },
	error,
} = await supabase
	.from("profiles")
	.select("username")
	.eq("full_name", "Benjamin Low")
	.limit(1)
	.single();

export const Header: React.FC<{}> = () => {
	// const user = supabase.auth.user();
	const newMemberMessage = "Hello";
	console.log("user", username);

	//console.log('username', data);
	return (
		<div className="header">
			<h1>Workout Buddy </h1>
			<div className="account">
				{user && <p>{username}</p>}
				{user && <LogoutButton />}
			</div>
		</div>
	);
};
