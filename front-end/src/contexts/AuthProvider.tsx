import React, { FC, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import App from "../App";
import { IWorkout } from "../api/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";
import { ICardAndUserInfo } from "../apps/lorcanaBuddy/src/components/GridCardDisplay";

type IAuthContext = {
	supabase: SupabaseClient<Database>;
	session: ISession | null;
	auth: boolean | undefined;
	user: any;
	userId: string;
	username: string;
	initialUrl: string;
	isLoggedIn: boolean;
	workouts: IWorkout[];
	contextIsLoading: boolean;
	setUserId: (userId: string) => void;
	setUsername: (newName: string) => void;
	setInitialUrl: (url: string) => void;
	setIsLoggedIn: (loggedIn: boolean) => void;
	setWorkouts: (usersWorkouts: IWorkout[]) => void;
	usersLorcanaCards: ICardAndUserInfo[];
	setUsersLorcanaCards: (usersCards: ICardAndUserInfo[]) => void;
};

export interface ISession {
	user: { id: string; email: string; role: string };
	access_token: string;
	refresh_token: string;
	expires_at: number;
}

export const AuthContext = React.createContext<IAuthContext>({
	userId: "",
	username: "",
	isLoggedIn: false,
	workouts: [],
	session: null,
	initialUrl: "",
	setIsLoggedIn: () => {},
	setUsername: () => {},
	setWorkouts: () => {},
	setUserId: () => {},
	user: null,
	auth: undefined,
	contextIsLoading: true,
	setInitialUrl: () => {},
	supabase: supabase,
	usersLorcanaCards: [],
	setUsersLorcanaCards: () => {},
});

type IChildren = {
	children: React.ReactNode;
};

const AuthProvider: React.FC<IChildren> = ({ children }) => {
	const [userId, setUserId] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);
	const [session, setSession] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<any>(null);
	const [auth, setAuth] = useState<boolean | undefined>(undefined);
	const [initialUrl, setInitialUrl] = useState<string>("");

	const [usersLorcanaCards, setUsersLorcanaCards] = useState<ICardAndUserInfo[]>([]);

	const getAllCardsAndUsersCards = async () => {
		let { data, error } = await supabase
			// @ts-expect-error does not get type for the join
			.rpc("get_all_cards_plus_user_data")
			.select(
				"id, abilities, cardNumber: card_number , colour , inkable , rarity , type , name , classification , cost , strength, willpower , lore , bodyText: body_text , flavourText: flavour_text , setName: set_name , wave , artist , imageUrl: image ,setId: set_id ,foil , nonFoil: nonfoil "
			)
			.order("wave")
			.order("card_number");
		if (data) {
			console.log("get all cards", data);
			setUsersLorcanaCards(data);
		} else {
			console.error(error);
		}
	};
	// when going to APP, get session, set if logged in
	useEffect(() => {
		const getSessionData = async () => {
			supabase.auth.refreshSession().then(({ data: { session } }) => {
				if (session) {
					setSession(session);
					setAuth(true);
					setUserId(session.user.id);
					setUsername(session.user.user_metadata.username);
					setIsLoggedIn(true); // late can be removed and replaced with auth
					setUser(session.user);
					getAllCardsAndUsersCards();
				} else {
					setAuth(false);
				}
				// setIsLoading(false); remove because next useEffect should also alway run atleast
				setIsLoading(false);

				return;
			});
		};
		getSessionData();
	}, []);

	// changes Context and cookies when logged in changes
	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event == "PASSWORD_RECOVERY") {
				setAuth(false);
			} else if (event === "SIGNED_IN") {
				// everytime there is a sign in event, context states will be triggered
				if (session) {
					const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
					document.cookie = `my_access_token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=None; Secure`;
					document.cookie = `my_refresh_token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=None; Secure `;
					document.cookie = `my_user_id=${session.user.id}; path=/; max-age=${maxAge}; SameSite=None; Secure`;
					setSession(session);
					console.log("Auth Provider : init AuthContext"); // log whenever auth changes and is called
					setAuth(true);
					setUserId(session.user.id);
					setUsername(session.user.user_metadata.username);
					// setIsLoggedIn(true); // later can be removed and replaced with auth
					setUser(session.user);
				}
			} else if (event === "SIGNED_OUT") {
				console.log("Auth Provider:  signed OUT");
				setUserId("");
				setUsername("");
				setWorkouts([]);
				setSession(null);
				setAuth(false);
				setUser(null);
				// setIsLoggedIn(false);
				setUsersLorcanaCards([]);

				// remove cookies, when signed out
				const expires = new Date(0).toUTCString();
				document.cookie = `my_access_token=; path=/; max-age=${expires}; SameSite=Lax; secure`;
				document.cookie = `my_refresh_token=; path=/; max-age=${expires}; SameSite=Lax; secure`;
				document.cookie = `my_user_id=; path=/; max-age=${expires}; SameSite=Lax; secure `;
			}
		});
		setIsLoading(false);
		return () => {
			data.subscription.unsubscribe();
		};
	}, [isLoggedIn, username]);

	// // when signing out, end session, if error, do not reset context.
	// useEffect(() => {
	// 	try {
	// 		const { error } = await supabase.auth.signOut();
	// 	} catch (err) {}

	// 	setIsLoading(true);
	// 	const getUser = async () => {
	// 		const { data } = await supabase.auth.getUser();
	// 		const { user: currentUser } = data;
	// 		setUser(currentUser ?? null);
	// 		setIsLoading(false);
	// 	};
	// 	getUser();
	// 	// onAuthStateChange code below
	// }, []);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	const getUser = async () => {
	// 		const { data } = await supabase.auth.getUser();
	// 		const { user: currentUser } = data;
	// 		setUser(currentUser ?? null);
	// 		setIsLoading(false);
	// 	};
	// 	getUser();
	// 	// onAuthStateChange code below
	// }, []);

	return (
		<AuthContext.Provider
			value={{
				userId,
				username,
				isLoggedIn,
				workouts,
				session,
				initialUrl,
				setIsLoggedIn,
				setUsername,
				setWorkouts,
				setUserId,
				user,
				auth,
				contextIsLoading: isLoading,
				setInitialUrl,
				supabase,
				setUsersLorcanaCards,
				usersLorcanaCards,
			}}
		>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
