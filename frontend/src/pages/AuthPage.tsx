import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
	// if (isLoggedIn) {
	// 	return <Navigate to="/workouts" />;
	// }
    const navigate = useNavigate();

	const {
		userId,
		username,
		isLoggedIn,
		setIsLoggedIn,
		setUsername,
		setUserId,
	} = useContext(AuthContext);
	const [session, setSession] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
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

	useEffect(() => {
		if (session) {
			getUserId();
			setIsLoggedIn(true);
		}
	}, [session]);

	useEffect(() => {
		if (userId) {
			getUsername();
		}
	}, [userId]);

	useEffect(() => {
		if (!username) {
			setIsLoggedIn(false);
		}
	}, [username]);

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/workouts')
		}
	}, [isLoggedIn]);

	const getUserId = async () => {
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (user) {
				setUserId(user.id);
			}
		} catch (error) {
			console.error("Error while getting User", error);
		}
	};

	const getUsername = async () => {
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select("username")
				.eq("id", userId)
				.limit(1)
				.single();
			let username;
			if (data) {
				username = data.username;
			}
			username && setUsername(username);
			if (error) {
				console.log("ERROR getting userName: ", error);
			}
			setIsLoading(false);
		} catch (error) {
			console.error("Error while getting Username", error);
		}
	};

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
