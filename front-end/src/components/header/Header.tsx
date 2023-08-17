import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, Location } from "react-router-dom";
import LogInButton from "./LogInButton";
import { useLocation } from "react-router-dom";
import { domainFromUrl } from "../../utils/utils";
import { TDomain, TDomains } from "../../api/types";
import { domains } from "../../utils/utils";
import { SpiningLoadingIcon } from "../loading/LoadingIcon";

export const Header: React.FC<{}> = () => {
	const { username, isLoggedIn, auth, contextIsLoading } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true); // wait for username to be fetched before rendering.
	const [displayUsername, setDisplayUsername] = useState<string>("");
	const location = useLocation();
	const splitUrl = location.pathname.split("/");
	const domain = splitUrl[1] in domains ? splitUrl[1] : "buddySystem";
	// const [subdomain, setSubdomain] = useState<string>(domain);
	const [domainObj, setDomainObj] = useState<TDomain>(); // wait for username to be fetched before rendering.
	const [fromLoginHeaderClass, setFromLoginHeaderClass] = useState<string>();
	const [previousDomain, setPreviousDomain] = useState<string | undefined>();
	const [currentDomain, setCurrentDomain] = useState<string>();
	const [headerTransition, setHeaderTransition] = useState<string>("/");
	// SET HEADING AFFECT FROM PREVIOUS URL = TAKE THE DOMAIN FROM IT, and you can compare
	// "poreviousDomain " + "-" + "current Domain" + " +  fade"
	useEffect(() => {
		setDomainObj(domains[domain]);
	}, []);

	// const getDomainFromPathName = (location: Location) => {
	// 	if (location.pathname.length > 0) {
	// 		const splitPathName = location.pathname.split("/");
	// 		const subDomain =
	// 			splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
	// 		return subDomain;
	// 	}
	// };

	useEffect(() => {
		console.log("Location header = ", location);
		const splitPathName = location.pathname.split("/");
		console.log("Location header = ", splitPathName);
		const subDomain =
			splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
		setCurrentDomain(subDomain);
		console.log("currentDomain", subDomain);
		if (location.state?.previousDomain) {
			const previousDomainnn = location.state.previousDomain;
			console.log("previousDomainnn", previousDomainnn);
			setPreviousDomain(previousDomainnn);
		} else {
			console.log("previousDomain", previousDomain);
		}
	}, [location, auth]);

	// useEffect(() => {
	// 	console.log("location by header", location);
	// 	if (contextIsLoading && location) {
	// 		if (location.state?.previousUrl) {
	// 			console.log(location.state.previousUrl);
	// 			const getPreviousDomain = getDomainFromPathName(
	// 				location.state.previousUrl
	// 			);
	// 			setPreviousDomain(getPreviousDomain);
	// 			console.log("getPreviousDomain", getPreviousDomain);
	// 		}
	// 		console.log("PREVIOUS DOMAIN :", previousDomain);
	// 		setCurrentDomain(domain);
	// 		console.log("DOMAIN          :", domain);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	// if (location.state) {
	// 	// 	if (location.state.fromLogin) {
	// 	// 		console.log("from login?", location.state);
	// 	// 		setFromLoginHeaderClass("from-login");
	// 	// 		console.log("afterAlter?", location.state);
	// 	// 	}
	// 	// 	if (location.state.previousUrl) {
	// 	// 		console.log("from login?", location.state);
	// 	// 		setFromLoginHeaderClass("from-login");
	// 	// 		console.log("afterAlter?", location.state);
	// 	// 	}
	// 	// }
	// 	setCurrentDomain(domain);
	// 	// if (domainObj) {
	// 	// 	if (splitUrl[1] !== domain) {
	// 	// 		console.log("NEW SUBDOMAIN", splitUrl[1], domain, location);
	// 	// 	}
	// 	// }

	// 	// console.log("test", `fade-${previousDomain}-to-${domain}`);

	// 	setDomainObj(domains[domain]);
	// }, []);

	useEffect(() => {
		// console.log("current location", location);
		// console.log("PREVIOUS Domain:", previousDomain);
		// console.log("CURRENT domain :", domain);
		// if (!previousDomain || previousDomain === currentDomain) {
		// 	setHeaderTransition(`${domain}`);
		// 	console.log("TEST           :", `${domain}`);
		// } else {
		// 	setHeaderTransition(`${previousDomain}-to-${domain}`);
		// 	console.log("TEST", `${previousDomain}-to-${domain}`);
		// }
		if (previousDomain === currentDomain || !previousDomain) {
			setHeaderTransition(`${currentDomain}-header`);
		} else {
			setHeaderTransition(`${previousDomain}-to-${currentDomain}-header`);
		}
	}, [currentDomain]);

	useEffect(() => {
		console.log("HEADER TRANSITION", headerTransition);
	}, [currentDomain]);

	// update everytime username changes; if username exists, put it on display, if not, default
	useEffect(() => {
		if (!contextIsLoading) {
			if (username) {
				setDisplayUsername(username);
				setIsLoading(false);
			}
			if (domain === "buddySystem" && !username) {
				setIsLoading(false);
			}
		}
		if (domainObj && auth === false) {
			if (domain === "buddySystem") {
				setIsLoading(false);
			}
		}
	}, [auth, contextIsLoading, domainObj, username]);
	// ${previousDomain}-previous-domain-header
	// ${domains[domain].class}-header
	// 		${headerTransition}
	// 		  ${fromLoginHeaderClass}

	return (
		<div className={`header ${headerTransition}`} key={domain}>
			<div className="content white-font">
				{!isLoading &&
					(auth ? (
						domainObj && (
							<>
								<Link
									to={`${domains[domain].path}`}
									key={domain}
								>
									{domain && (
										<h1 key={domain}>
											{domains[domain].name}
										</h1>
									)}
								</Link>
								<div className="account">
									<Link to="/createUsername">
										{!username
											? "Create Username"
											: displayUsername}
									</Link>
									<LogoutButton />
								</div>
							</>
						)
					) : (
						<>
							<Link to="/">
								<h1>{domainObj?.name}</h1>
							</Link>
							{!(location.pathname === "/login") && ( // login button appears if not authorized, and not on /login page.
								<Link to="/login">
									<LogInButton />
								</Link>
							)}
						</>
					))}
			</div>
		</div>
	);
};

/*

1. once loading is false 
	2. render DOMAIN as header 
	3. set domain as helmet too 
		2. if auth, render log out <button></button>
		5. if NOT AUTH, render log in button, redirect to domain homepage. 

		*/

// return (
// 	<div className={`header ${domains[domain].class}-header`} key={domain}>
// 		<div className="content white-font">
// 			{!isLoading ? (
// 				auth ? (
// 					domainObj && (
// 						<>
// 							<Link
// 								to={`${domains[domain].path}`}
// 								key={domain}
// 							>
// 								{domain && (
// 									<h1 key={domain}>
// 										{domains[domain].name}
// 									</h1>
// 								)}
// 							</Link>
// 							<div className="account">
// 								<Link to="/createUsername">
// 									{!username
// 										? "Create Username"
// 										: displayUsername}
// 								</Link>
// 								<LogoutButton />
// 							</div>
// 						</>
// 					)
// 				) : (
// 					<>
// 						<Link to="/">
// 							<h1>{domain}</h1>
// 						</Link>
// 						{!(location.pathname === "/login") && ( // login button appears if not authorized, and not on /login page.
// 							<Link to="/login">
// 								<LogInButton />
// 							</Link>
// 						)}
// 					</>
// 				)
// 			) : (
// 				<Link to="/">{/* <h1>Workout Buddy</h1> */}</Link>
// 			)}
// 		</div>
// 	</div>
// );
// };
