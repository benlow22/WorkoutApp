import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";
import "../../styles/index.css";
import { domains } from "../../utils/utils";

type TProps = {
	from: string;
};

export const LoginPage = () => {
	// when going to AuthPage, get session, set if logged in
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [previousDomain, setPreviousDomain] = useState<string>();
	const navigate = useNavigate();
	const location = useLocation();
	// if entered Auth Url => send back to that URL once Auth
	// if not from Auth URL (homepage) => then no state will be given
	const redirectLocation = location.state ? location.state.initialUrl : "/";
	// if there is no state = straight to login page = redirect to "/"']

	// useEffect(() => {
	// 	console.log("location login ", location);
	// }, []);

	useEffect(() => {
		if (!contextIsLoading && auth !== undefined) {
			if (location.pathname) {
				const splitPathName = location.pathname.split("/");
				console.log("split URL ", splitPathName);
				const subDomain =
					splitPathName[1] in domains
						? splitPathName[1]
						: "buddySystem";
				setPreviousDomain(subDomain);

				console.log("prev domain", subDomain);
			} else {
				setPreviousDomain(undefined);
			}

			setIsLoading(false);
		}
	}, [auth]);

	// if location = null = no location.state = went STRAIGHT to login page

	return !isLoading ? (
		auth ? (
			<Navigate
				to={redirectLocation}
				state={{ previousDomain: previousDomain }}
			/>
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
