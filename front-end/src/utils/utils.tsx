// export const toCamelCase = (phrase: string): string => {
// 	let newStr = "";
// 	let ch1 = phrase[0];
// 	if ((ch1 >= "a" && ch1 <= "z") || (ch1 >= "A" && ch1 <= "Z")) {
// 		newStr = ch1.toLowerCase();
// 	}
import { v4 as uuidv4 } from "uuid";

import { INewExerciseInput, TDomains } from "../api/types";
import { useLocation } from "react-router-dom";

// 	const capitalizeChAfterSpace = (ch: string) => {
// 		if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
// 			if (ch === ch.toUpperCase()) {
// 				newStr += ch;
// 			} else {
// 				newStr += ch.toUpperCase();
// 			}
// 		} else if (ch >= "0" && ch <= "9") {
// 			newStr += ch;
// 		}
// 	};

// 	for (let i = 1; i < phrase.length; i++) {
// 		const ch = phrase[i];
// 		if (phrase[i - 1] == " ") {
// 			const capitalizeCh = capitalizeChAfterSpace(ch);
// 		} else if ((ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9")) {
// 			newStr += ch;
// 		} else if (ch >= "A" && ch <= "Z") {
// 			newStr += ch.toLowerCase();
// 		}
// 	}
// 	return newStr;
// };

// export const changeNameToUrl = (workoutName: string) => {
// 	let newUrl = toCamelCase(workoutName);
// 	return newUrl;
// };

// used for onClick to turn boolean setter TRUE     ie. turn isEditing or isLoading TRUE when clicked
export const buttonClickTrue = () => {
	return true;
};

// ToKebabCase
export const toKebabCase = (phrase: string): string => {
	let newStr = "";
	for (let i = 0; i < phrase.length; i++) {
		const ch = phrase[i];
		if (phrase[i] == " ") {
			newStr += "-";
		} else if ((ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9")) {
			newStr += ch;
		} else if (ch >= "A" && ch <= "Z") {
			newStr += ch.toLowerCase();
		}
	}
	return newStr;
};

export const changeNameToUrl = (workoutName: string) => {
	let newUrl = toKebabCase(workoutName);
	return newUrl;
};

export const shortenUrl = (s: string): string => {
	const removeProtocol = s.split("//");
	const url = removeProtocol[1];
	let shortenedUrl: string = url;
	if (shortenedUrl.length > 40) {
		shortenedUrl = url.slice(0, 39).concat("...");
	}
	return shortenedUrl;
};

export const isValidUrl = (urlString: string) => {
	var urlPattern = new RegExp(
		"^(https?:\\/\\/)?" + // validate protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // validate fragment locator
	return !!urlPattern.test(urlString);
};

export const transformExercisePost = (
	input: any,
	userId: string
): INewExerciseInput => {
	const defaultSets = new Array(input.sets).fill([
		input.defaultWeight,
		input.reps,
	]);
	const transformedInput = { defaultSets: defaultSets, ...input };
	delete transformedInput.reps;
	delete transformedInput.sets;
	delete transformedInput.defaultWeight;

	// {
	// 	description: input.description,
	// 	equipment: ["2", "6"],
	// 	fitnessElement: ["Strength Training"],
	// 	links: [
	// 		"https://www.muscleandstrength.com/exercises/incline-bench-press.html",
	// 	],
	// 	muscleGroup: ["Chest", "Arms"],
	// 	muscles: ["Pectoralis Major"],
	// 	name: "Incline Barbell Bench Press",
	// 	notes: input.notes,
	// 	public: input.public,
	// 	time: input.time,
	// 	id: uuidv4(),
	// 	createdBy: userId,
	// 	defaultSets: defaultSets,
	// 	defaultWeightUnits: input.weightUnits,
	// 	defaultTimeUnits: input.timeUnits,
	// };

	return transformedInput;
};

//[['15','5'],['25','10']]

// get Domain from URL
export const domainFromUrl = () => {
	const location = useLocation();
	const splitUrl = location.pathname.split("/");
	if (splitUrl[1] in domains) {
		console.log("its in ", splitUrl[1] in domains);
		return splitUrl[1];
	} else {
		return "buddySystem";
	}
};

export const domains: TDomains = {
	workoutBuddy: {
		name: "Workout Buddy",
		path: "workoutBuddy",
		class: "workout-buddy",
		pages: [
			{ name: "workouts", path: "workouts" },
			{ name: "exercises", path: "exercises" },
			{ name: "explore", path: "explore" },
			{ name: "tips", path: "tips" },
		],
	},
	amiiboBuddy: {
		name: "Amiibo Buddy",
		path: "amiiboBuddy",
		class: "amiibo-buddy",
		pages: [
			{ name: "Browse", path: "browse" },
			{ name: "My Collection", path: "myCollection" },
			{ name: "Wishlist", path: "wishlist" },
			{ name: "Returns", path: "returns" },
			{ name: "Add Amiibo", path: "addAmiibo" },
		],
	},
	buddySystem: {
		name: "Buddy System",
		path: "buddySystem",
		class: "buddy-system",
		pages: [
			{ name: "Workout Buddy", path: "workoutBuddy" },
			{ name: "AmiiboBuddy", path: "amiiboBuddy" },
			{ name: "PokeBuddy", path: "pokeBuddy" },
		],
	},
};
// create new array from old Array
export const newArrForState = () => {};

export const arrToNum = (arr: string[][] | number[][]) => {
	const newArr = arr.map((sets) => sets.map((element) => Number(element)));
	return newArr;
};
