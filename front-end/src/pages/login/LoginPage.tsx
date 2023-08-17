import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";
import "../../styles/index.css";

type TProps = {
	from: string;
};

export const LoginPage = () => {
	// when going to AuthPage, get session, set if logged in
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	console.log("initial Login page");
	const location = useLocation();

	// if entered Auth Url => send back to that URL once Auth
	// if not from Auth URL (homepage) => then no state will be given
	const redirectLocation = location.state
		? location.state.from.pathname
		: "/";

	useEffect(() => {
		if (!contextIsLoading && auth !== undefined) {
			setIsLoading(false);
		}
		console.log("redirectLocation", redirectLocation);
	}, [auth]);

	return !isLoading ? (
		auth ? (
			<Navigate to={redirectLocation} state={{ fromLogin: true }} />
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
