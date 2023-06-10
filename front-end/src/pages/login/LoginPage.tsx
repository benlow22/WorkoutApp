import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";

export const LoginPage = () => {
	// when going to AuthPage, get session, set if logged in
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (contextIsLoading) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [contextIsLoading, auth]);

	if (isLoading) {
		return <SpiningLoadingIcon />;
	}

	if (auth && !isLoading) {
		return <Navigate to="/workouts" />;
	}

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
};
