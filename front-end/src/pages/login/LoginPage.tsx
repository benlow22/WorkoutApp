import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";
import "../../styles/index.css";

export const LoginPage = () => {
	// when going to AuthPage, get session, set if logged in
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	console.log("initial Login page");

	useEffect(() => {
		if (!contextIsLoading && auth !== undefined) {
			setIsLoading(false);
		}
	}, [auth]);

	return !isLoading ? (
		auth ? (
			<Navigate to="/workouts" />
		) : (
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
		)
	) : (
		<SpiningLoadingIcon />
	);
};
