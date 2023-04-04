import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "./supabaseClient";
import { WorkoutsPage } from "./Workouts";
import { workouts } from "./data";
import { Header } from "./Header";
import {CreateUsername} from './CreateUsername';

export const {
	data: { user },
} = await supabase.auth.getUser();

import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function App() {
	const [session, setSession] = useState<any | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		// console.log("session:", session);
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
				<p>Please Login Below</p>
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeSupa,
						variables: {
							default: {
								colors: {
									brand: "red",
									brandAccent: "darkred",
								},
							},
						},
					}}
				/>
			</div>
		);
	} else {
		return (
			<div>
				<CreateUsername />
				<WorkoutsPage workouts={workouts} />
			</div>
		);
	}
}
