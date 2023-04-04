import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "./supabaseClient";

export default function App() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	if (!session) {
		return (
			<Auth supabaseClient={supabase} />
		);
	} else {
		return <div>Logged in!</div>;
	}
}
