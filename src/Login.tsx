import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "./supabaseClient";
import { WorkoutsPage } from "./Workouts";
import { workouts } from "./data";
import { Header } from "./Header";
export const { data: { user } } = await supabase.auth.getUser()

export default function App() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		console.log('session', session)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	if (!session) {
		return (
			<div>
				<Header />
				<h1>Welcome to Workout Buddy</h1>
				<p>Please Login Below</p>
				<Auth supabaseClient={supabase} />
			</div>
		);
	} else {
		return (
			<div>
				<Header />
				<WorkoutsPage workouts={workouts} />
			</div>
		);
	}
}
