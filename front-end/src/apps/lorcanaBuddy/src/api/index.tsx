import { TError } from "../../../../api/types";
import { ISession } from "../../../../contexts/AuthProvider";
import { fetcher } from "../../../workoutBuddy/src/api/api";

// const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/api`;

export const getAllLorcanaCardsAPI = async (
	session: ISession
): Promise<{
	data: any | null;
	error: TError;
}> => {
	console.log("res12p");
	const response = await fetch(
		"http://localhost:8000/api/public/lorcana/cards"
	);
	// let [error, response] = await fetcher(`/public/lorcana/cards`, session);
	let data: any | null = null;
	let error: TError = null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		// alter data if need be
		console.log("resp", respJSON);
		data = respJSON;
	} else {
		console.log("resp", error);

		error = new Error(`Getting all cards from Supabase`, {
			cause: error,
		});
	}
	return {
		data,
		error,
	};
};
