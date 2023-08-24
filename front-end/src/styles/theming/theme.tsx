import { varFromDomainsJSON } from "../../utils/utils";
import domains from "../../data/domains.json";

const theme = varFromDomainsJSON(domains, "themes");

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
