import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import LogInButton from "./LogInButton";
import { useLocation } from "react-router-dom";
import { domainFromUrl } from "../../utils/utils";
import { TDomains } from "../../api/types";
import { domains } from "../../utils/utils";

export const Header: React.FC<{}> = () => {
	const { username, isLoggedIn, auth, contextIsLoading } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true); // wait for username to be fetched before rendering.
	const [displayUsername, setDisplayUsername] = useState<string>("");
	const location = useLocation();
	const splitUrl = location.pathname.split("/");
	const domain = splitUrl[1] in domains ? splitUrl[1] : "buddySystem";
	// update everytime username changes; if username exists, put it on display, if not, default
	useEffect(() => {
		if (!contextIsLoading) {
			if (username) {
				setDisplayUsername(username);
				setIsLoading(false);
				console.log("LOCATION", domain);
			}
		}
	}, [auth]);

	useEffect(() => {
		if (domain) console.log("domain", domain);
	}, [domain]);

	return (
		<div className={`header ${domains[domain].class}-header`} key={domain}>
			<div className="content white-font">
				{!isLoading ? (
					auth ? (
						domain && (
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
								<h1>{domain}</h1>
							</Link>
							{!(location.pathname === "/login") && ( // login button appears if not authorized, and not on /login page.
								<Link to="/login">
									<LogInButton />
								</Link>
							)}
						</>
					)
				) : (
					<Link to="/">{/* <h1>Workout Buddy</h1> */}</Link>
				)}
			</div>
		</div>
	);
};
