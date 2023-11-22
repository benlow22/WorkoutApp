import { Auth } from "@supabase/auth-ui-react";
// import { supabase } from "../../../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SpiningLoadingIcon } from "../../loading/LoadingIcon";
import "../../../styles/index.css";
import domainsJSON from "../../../data/domains.json";
import { varFromDomainsJSON } from "../../../utils/utils";

type TProps = {
	from: string;
};

export const LoginPage = () => {
	// when going to AuthPage, get session, set if logged in
	const { auth, contextIsLoading, supabase } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [previousDomain, setPreviousDomain] = useState<string>("buddySystem");
	const [currentDomain, setCurrentDomain] = useState<string>();
	const domains = varFromDomainsJSON(domainsJSON, "domains");
	const location = useLocation();
	// if entered Auth Url => send back to that URL once Auth
	// if not from Auth URL (homepage) => then no state will be given
	const redirectLocation = location.state
		? location.state.previousPath
		: previousDomain;
	// if there is no state = straight to login page = redirect to "/"']

	useEffect(() => {
		if (!contextIsLoading && auth !== undefined) {
			if (location.pathname) {
				const splitPathName = location.pathname.split("/");
				const subDomain =
					splitPathName[1] in domains
						? splitPathName[1]
						: "buddySystem";
				setCurrentDomain(subDomain);
				console.log("hi");
			} else {
				setCurrentDomain(undefined);
			}
			setIsLoading(false);
		}
		console.log("location", location);
	}, [auth]);
	// if location = null = no location.state = went STRAIGHT to login page

	return !isLoading ? (
		auth ? (
			<Navigate
				to={redirectLocation}
				state={{ previousDomain: currentDomain }}
			/>
		) : (
			<div className="auth-page white-font">
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
					providers={["google"]}
				/>
			</div>
		)
	) : (
		<SpiningLoadingIcon />
	);
};
