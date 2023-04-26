import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthPage = () => {
	const [session, setSession] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);


	// when going to AuthPage, get session, set if logged in
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			console.log('session data', session)
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		setIsLoading(false);
		return () => subscription.unsubscribe();
	}, []);

	if (!session) {
		return (
			<div className="auth-page">
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
		return <Navigate to="/workouts" />;
	}
};
