const theme: {
	[domain: string]: {
		[cssVar: string]: string;
	};
} = {
	buddySystem: {
		"--domain-header": "rgb(69, 150, 86)",
		"--domain-primary-button": "rgb(81, 166, 99)",
		"--domain-primary-button-hover": "rgb(107, 185, 124)",
		"--domain-nav-links": "rgb(86, 164, 103)",
		"--domain-nav-links-active": "rgb(107, 185, 124)",
		"--previous-header": "rgb(69, 150, 86)", // use the same domain-header if not changing
		"--previous-nav-links": "rgb(86, 164, 103)",
		"--previous-primary-button": "rgb(81, 166, 99)",
	},
	workoutBuddy: {
		"--domain-header": "rgb(0, 110, 255)",
		"--domain-primary-button": "#1677ff",
		"--domain-primary-button-hover": "#4096ff",
		"--domain-nav-links": "rgb(44, 129, 239)",
		"--domain-nav-links-active": "rgb(75, 148, 245)",
		"--previous-header": "rgb(0, 110, 255)",
		"--previous-nav-links": "rgb(44, 129, 239)",
		"--previous-primary-button": "#1677ff",
	},
	amiiboBuddy: {
		"--domain-header": "rgb(148, 22, 22)",
		"--domain-primary-button": "#bc4b4b",
		"--domain-primary-button-hover": "#c76565",
		"--domain-nav-links": "rgb(156, 45, 45)",
		"--domain-nav-links-active": "rgb(182, 78, 78)",
		"--previous-header": "rgb(148, 22, 22)",
		"--previous-nav-links": "rgb(156, 45, 45)",
		"--previous-primary-button": "#bc4b4b",
	},
	lorcanaBuddy: {
		"--domain-header": " rgb(34, 40, 155)",
		"--domain-primary-button": "rgb(57, 63, 187)",
		"--domain-primary-button-hover": "rgb(80, 86, 196)",
		"--domain-nav-links": "rgb(49, 54, 141)",
		"--domain-nav-links-active": "rgb(82, 86, 152)",
		"--previous-header": " rgb(34, 40, 155)",
		"--previous-nav-links": "rgb(49, 54, 141)",
		"--previous-primary-button": "rgb(57, 63, 187)",
	},
	pokeBuddy: {
		"--domain-header": "rgb(230, 199, 0)",
		"--domain-primary-button": "rgb(204, 177, 0)",
		"--domain-primary-button-hover": "rgb(179, 155, 0)",
		"--domain-nav-links": "rgb(204, 177, 0)",
		"--domain-nav-links-active": "rgb(179, 155, 0)",
		"--previous-header": "rgb(230, 199, 0)",
		"--previous-nav-links": "rgb(204, 177, 0)",
		"--previous-primary-button": "rgb(204, 177, 0)",
	},
	"buddySystem-to-lorcanaBuddy": {
		"--domain-header": " rgb(34, 40, 155)",
		"--domain-primary-button": "rgb(57, 63, 187)",
		"--domain-primary-button-hover": "rgb(80, 86, 196)",
		"--domain-nav-links": "rgb(49, 54, 141)",
		"--domain-nav-links-active": "rgb(82, 86, 152)",
		"--previous-header": "rgb(69, 150, 86)",
		"--previous-nav-links": "rgb(86, 164, 103)",
		"--previous-primary-button": "rgb(81, 166, 99)",
	},
	"lorcanaBuddy-to-buddySystem": {
		"--domain-header": "rgb(69, 150, 86)",
		"--domain-primary-button": "rgb(81, 166, 99)",
		"--domain-primary-button-hover": "rgb(107, 185, 124)",
		"--domain-nav-links": "rgb(86, 164, 103)",
		"--domain-nav-links-active": "rgb(107, 185, 124)",
		"--previous-header": " rgb(34, 40, 155)",
		"--previous-nav-links": "rgb(49, 54, 141)",
		"--previous-primary-button": "rgb(57, 63, 187)",
	},
	"buddySystem-to-amiiboBuddy": {
		"--domain-header": "rgb(148, 22, 22)",
		"--domain-primary-button": "#bc4b4b",
		"--domain-primary-button-hover": "#c76565",
		"--domain-nav-links": "rgb(156, 45, 45)",
		"--domain-nav-links-active": "rgb(182, 78, 78)",
		"--previous-header": "rgb(69, 150, 86)",
		"--previous-nav-links": "rgb(86, 164, 103)",
		"--previous-primary-button": "rgb(81, 166, 99)",
	},
	"amiiboBuddy-to-buddySystem": {
		"--domain-header": "rgb(69, 150, 86)",
		"--domain-primary-button": "rgb(81, 166, 99)",
		"--domain-primary-button-hover": "rgb(107, 185, 124)",
		"--domain-nav-links": "rgb(86, 164, 103)",
		"--domain-nav-links-active": "rgb(182, 78, 78)",
		"--previous-header": "rgb(148, 22, 22)",
		"--previous-nav-links": "rgb(156, 45, 45)",
		"--previous-primary-button": "#bc4b4b",
	},
	"workoutBuddy-to-buddySystem": {
		"--domain-header": "rgb(69, 150, 86)",
		"--domain-primary-button": "rgb(81, 166, 99)",
		"--domain-primary-button-hover": "rgb(107, 185, 124)",
		"--domain-nav-links": "rgb(86, 164, 103)",
		"--domain-nav-links-active": "rgb(107, 185, 124)",
		"--previous-header": "rgb(0, 110, 255)",
		"--previous-nav-links": "rgb(44, 129, 239)",
		"--previous-primary-button": "#1677ff",
	},
	"buddySystem-to-workoutBuddy": {
		"--domain-header": "rgb(0, 110, 255)",
		"--domain-primary-button": "#1677ff",
		"--domain-primary-button-hover": "#4096ff",
		"--domain-nav-links": "rgb(44, 129, 239)",
		"--domain-nav-links-active": "rgb(75, 148, 245)",
		"--previous-header": "rgb(69, 150, 86)",
		"--previous-nav-links": "rgb(86, 164, 103)",
		"--previous-primary-button": "rgb(81, 166, 99)",
	},
	"pokeBuddy-to-buddySystem": {
		"--domain-header": "rgb(69, 150, 86)",
		"--domain-primary-button": "rgb(81, 166, 99)",
		"--domain-primary-button-hover": "rgb(107, 185, 124)",
		"--domain-nav-links": "rgb(86, 164, 103)",
		"--domain-nav-links-active": "rgb(107, 185, 124)",
		"--previous-header": "rgb(230, 199, 0)",
		"--previous-nav-links": "rgb(204, 177, 0)",
		"--previous-primary-button": "rgb(204, 177, 0)",
	},
	"buddySystem-to-pokeBuddy": {
		"--domain-header": "rgb(230, 199, 0)",
		"--domain-primary-button": "rgb(204, 177, 0)",
		"--domain-primary-button-hover": "rgb(179, 155, 0)",
		"--domain-nav-links": "rgb(204, 177, 0)",
		"--domain-nav-links-active": "rgb(179, 155, 0)",
		"--previous-header": "rgb(69, 150, 86)",
		"--previous-nav-links": "rgb(86, 164, 103)",
		"--previous-primary-button": "rgb(81, 166, 99)",
	},
};

export function changeTheme(domainName: string) {
	switch (domainName) {
		case "workoutBuddy":
			useTheme("workoutBuddy");
			localStorage.setItem("theme", "workoutBuddy");
			break;
		case "amiiboBuddy":
			useTheme("amiiboBuddy");
			localStorage.setItem("theme", "amiiboBuddy");

			break;
		case "lorcanaBuddy":
			useTheme("lorcanaBuddy");
			localStorage.setItem("theme", "lorcanaBuddy");
			break;
		case "buddySystem-to-lorcanaBuddy":
			useTheme("buddySystem-to-lorcanaBuddy");
			localStorage.setItem("theme", "buddySystem-to-lorcanaBuddy");
			break;
		case "lorcanaBuddy-to-buddySystem":
			useTheme("lorcanaBuddy-to-buddySystem");
			localStorage.setItem("theme", "lorcanaBuddy-to-buddySystem");
			break;
		case "buddySystem-to-amiiboBuddy":
			useTheme("buddySystem-to-amiiboBuddy");
			localStorage.setItem("theme", "buddySystem-to-amiiboBuddy");
			break;
		case "amiiboBuddy-to-buddySystem":
			useTheme("amiiboBuddy-to-buddySystem");
			localStorage.setItem("theme", "amiiboBuddy-to-buddySystem");
			break;
		case "workoutBuddy-to-buddySystem":
			useTheme("workoutBuddy-to-buddySystem");
			localStorage.setItem("theme", "workoutBuddy-to-buddySystem");
			break;
		case "buddySystem-to-workoutBuddy":
			useTheme("buddySystem-to-workoutBuddy");
			localStorage.setItem("theme", "buddySystem-to-workoutBuddy");
			break;
		case "pokeBuddy":
			useTheme("pokeBuddy");
			localStorage.setItem("theme", "pokeBuddy");
			break;
		case "pokeBuddy-to-buddySystem":
			useTheme("pokeBuddy-to-buddySystem");
			localStorage.setItem("theme", "pokeBuddy-to-buddySystem");
			break;
		case "buddySystem-to-pokeBuddy":
			useTheme("buddySystem-to-pokeBuddy");
			localStorage.setItem("theme", "buddySystem-to-pokeBuddy");
			break;
		// case "domain":
		// 	useTheme("domain");
		// 	localStorage.setItem("theme", "domain");
		// 	break;
		default:
			useTheme("buddySystem");
			localStorage.setItem("theme", "buddySystem");
	}
}

function useTheme(themeChoice: string) {
	document.documentElement.style.setProperty(
		"--domain-header",
		theme[themeChoice]["--domain-header"]
	);
	document.documentElement.style.setProperty(
		"--domain-primary-button",
		theme[themeChoice]["--domain-primary-button"]
	);
	document.documentElement.style.setProperty(
		"--domain-primary-button-hover",
		theme[themeChoice]["--domain-primary-button-hover"]
	);
	document.documentElement.style.setProperty(
		"--domain-nav-links",
		theme[themeChoice]["--domain-nav-links"]
	);
	document.documentElement.style.setProperty(
		"--domain-nav-links-active",
		theme[themeChoice]["--domain-nav-links-active"]
	);
	document.documentElement.style.setProperty(
		"--previous-header",
		theme[themeChoice]["--previous-header"]
	);
	document.documentElement.style.setProperty(
		"--previous-nav-links",
		theme[themeChoice]["--previous-nav-links"]
	);
	document.documentElement.style.setProperty(
		"--previous-primary-button",
		theme[themeChoice]["--previous-primary-button"]
	);
	// document.documentElement.style.setProperty(
	// 	"property",
	// 	theme[themeChoice]["property"]
	// );
}

const preferredTheme = localStorage.getItem("theme");
switch (preferredTheme) {
	case "workoutBuddy":
		useTheme("workoutBuddy");
		break;
	case "amiiboBuddy":
		useTheme("amiiboBuddy");
		break;
	case "lorcanaBuddy":
		useTheme("lorcanaBuddy");
		break;
	case "buddySystem-to-lorcanaBuddy":
		useTheme("buddySystem-to-lorcanaBuddy");
		break;
	case "lorcanaBuddy-to-buddySystem":
		useTheme("lorcanaBuddy-to-buddySystem");
		break;
	case "buddySystem-to-amiiboBuddy":
		useTheme("buddySystem-to-amiiboBuddy");
		break;
	case "amiiboBuddy-to-buddySystem":
		useTheme("amiiboBuddy-to-buddySystem");
		break;
	case "workoutBuddy-to-buddySystem":
		useTheme("workoutBuddy-to-buddySystem");
		break;
	case "buddySystem-to-workoutBuddy":
		useTheme("buddySystem-to-workoutBuddy");
		break;
	case "pokeBuddy":
		useTheme("pokeBuddy");
		break;
	case "pokeBuddy-to-buddySystem":
		useTheme("pokeBuddy-to-buddySystem");
		break;
	case "buddySystem-to-pokeBuddy":
		useTheme("buddySystem-to-pokeBuddy");
		break;
	// case "newCase":
	// 	useTheme("newCase");
	// 	break;
	default:
		useTheme("buddySystem");
}
