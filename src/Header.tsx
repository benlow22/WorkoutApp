import React from "react";
import WorkoutButton from "./WorkoutButton";
import { Button } from "antd";
// import supabase from '../src/supabaseClient';
// import {user} from './Login';
// interface IHeader {
// 	userName?: string;
// 	loggedIn: boolean;
// }
import { user } from "./supabaseClient";
import LogoutButton from "./LogOutButton";

export const Header:React.FC<{}> = () => {
	// const user = supabase.auth.user();
	const newMemberMessage = "Hello";
	console.log('user', user);
	
	return (
		<div className="header">
			<h1>Workout Buddy </h1>
			{user && <LogoutButton />}
		</div>
	);
	
};
