import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import App from "../App";
import { IWorkout } from "../api/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";
import { ICardAndUserInfo } from "../apps/lorcanaBuddy/src/components/GridCardDisplay";
import { TNewCard, TNewCardAndUserData } from "../apps/lorcanaBuddy/src/pages/newInventory/NewInventory";

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
	lorcanaCards: TNewCard[];
	lorcanaCardImages: HTMLImageElement[];
	contextIsLoading: boolean;
	setUserId: (userId: string) => void;
	setUsername: (newName: string) => void;
	setInitialUrl: (url: string) => void;
	setIsLoggedIn: (loggedIn: boolean) => void;
	setWorkouts: (usersWorkouts: IWorkout[]) => void;
	allCardsAndUserData: TNewCardAndUserData[] | undefined;
	setAllCardsAndUserData: (usersCards: TNewCardAndUserData[]) => void;
	setLorcanaCardImages: (cards: HTMLImageElement[]) => void;
	setLorcanaCards: (cards: TNewCard[]) => void;
	refreshLorcanaCardImage: boolean;
	setRefreshLorcanaCardImage: (triggerRefresh: boolean) => void;
};

export interface ISession {
	user: { id: string; email: string; role: string };
	access_token: string;
	refresh_token: string;
	expires_at: number;
}

export const AuthContext = React.createContext<IAuthContext>({
	lorcanaCards: [],
	setLorcanaCards: () => {},
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
	lorcanaCardImages: [],
	allCardsAndUserData: [],
	setAllCardsAndUserData: () => {},
	refreshLorcanaCardImage: false,
	setLorcanaCardImages: () => {},
	setRefreshLorcanaCardImage: () => {},
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
	const [refreshLorcanaCardImage, setRefreshLorcanaCardImage] = useState<boolean>(false);
	const [lorcanaCards, setLorcanaCards] = useState<TNewCard[]>([]);
	const [lorcanaCardImages, setLorcanaCardImages] = useState<HTMLImageElement[]>([]);
	const [allCardsAndUserData, setAllCardsAndUserData] = useState<TNewCardAndUserData[]>();

	const getAllCards = async () => {
		let { data, error } = await supabase
			.from("new_cards_duplicate")
			.select(
				"abilities, artist, body_text, card_num, card_variants, classifications, color, cost, franchise, id, image, inkable, lore, move_cost, name, rarity, set_id, set_name, set_num, strength, type, unique_id, willpower"
			)
			.order("set_num")
			.order("card_num");
		if (data) {
			const sortedData = data.sort((a, b) => {
				return a.set_num - b.set_num || a.card_num - b.card_num;
			});

			setLorcanaCards(sortedData);
		} else {
			console.log("ERROR fetching cards :", error);
		}
	};

	const getAllCardsAndUsersCards = async () => {
		let { data, error } = await supabase
			// @ts-expect-error does not get type for the join
			.rpc("new_get_all_cards_plus_user_data")
			.select(
				"id ,abilities ,card_num ,card_variants ,franchise ,color ,inkable ,rarity ,type ,name ,classifications ,cost ,strength ,willpower  ,body_text ,set_name ,set_num ,unique_id ,artist ,image ,set_id , move_cost ,foil ,nonfoil ,user_id , lore"
			)
			//sort by set number than id to deal with puppies who have 4a,4b,4c...
			.order("set_num")
			.order("unique_id");
		if (data) {
			setAllCardsAndUserData(data);
		} else {
			console.error(error);
		}
	};
	useEffect(() => {
		getAllCards();
		getAllCardsAndUsersCards();
		if (lorcanaCardImages) {
			// console.log("allCardImages in PRovide", lorcanaCardImages);
		}
		// }, [lorcanaCardImages]);
	}, []);

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
				setIsLoggedIn(false);

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

	useEffect(() => {
		setIsLoading(true);
		const getUser = async () => {
			const { data } = await supabase.auth.getUser();
			const { user: currentUser } = data;
			setUser(currentUser ?? null);
			setIsLoading(false);
		};
		getUser();
		// onAuthStateChange code below
	}, []);

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
				setAllCardsAndUserData,
				allCardsAndUserData,
				refreshLorcanaCardImage,
				setRefreshLorcanaCardImage,
				lorcanaCardImages,
				setLorcanaCardImages,
				setLorcanaCards,
				lorcanaCards,
			}}
		>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
