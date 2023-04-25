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

    // when going to AuthPage, get session, set if logged in
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


    // if there is a session, get userId (sets it to provider), turn logged in to TRUE
	useEffect(() => {
		if (session) {
			getUserId();
			setIsLoggedIn(true);
		}
	}, [session]);

    // once user ID is set/changed, get username 
	useEffect(() => {
		if (userId) {
			getUsername();
		}
	}, [userId]);

    //once username is set or changed, check if id does not nexists, then set logged in to false 
    // logs user out if userID is gone, unnessary ??? 
	useEffect(() => {
		if (!userId) {
			setIsLoggedIn(false);
		}
	}, [username]);

    // once logged in and username is gotten, redirect to workouts 
    
	useEffect(() => {
		if (isLoggedIn) {
			navigate('/workouts')
		}
	}, [username]);




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
			console.error("Error getting User", error);
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
