// export const toCamelCase = (phrase: string): string => {
// 	let newStr = "";
// 	let ch1 = phrase[0];
// 	if ((ch1 >= "a" && ch1 <= "z") || (ch1 >= "A" && ch1 <= "Z")) {
// 		newStr = ch1.toLowerCase();
// 	}

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
