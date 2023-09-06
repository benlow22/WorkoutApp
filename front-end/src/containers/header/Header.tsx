import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import LogInButton from "./LogInButton";
import { useLocation } from "react-router-dom";
import { TDomain } from "../../api/types";
import domainsJSON from "../../data/domains.json";
import { varFromDomainsJSON } from "../../utils/utils";
import { Navbar } from "../../components/navigation/Navbar";
import { HomeOutlined } from "@ant-design/icons";
import "./styles/theme.css";
import { changeTheme } from "../../styles/theming/theme";
import { Helmet } from "react-helmet";

export const Header: React.FC<{}> = () => {
	const { username, auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true); // wait for username to be fetched before rendering.
	const [displayUsername, setDisplayUsername] = useState<string>("");
	const location = useLocation();
	const splitUrl = location.pathname.split("/");
	const domains = varFromDomainsJSON(domainsJSON, "domains");
	const domain = splitUrl[1] in domains ? splitUrl[1] : "buddySystem";

	const [domainObj, setDomainObj] = useState<TDomain>(domains[domain]); // wait for username to be fetched before rendering.
	const [previousDomain, setPreviousDomain] = useState<string | undefined>();
	const [currentDomain, setCurrentDomain] = useState<string>(domain);
	const [headerTransition, setHeaderTransition] = useState<string>();

	useEffect(() => {
		// console.log("DOMAIN", domains[domain]);
		setDomainObj(domains[domain]);
	}, []);

	useEffect(() => {
		const domain = splitUrl[1] in domains ? splitUrl[1] : "buddySystem";
		setDomainObj(domains[domain]);
		let curDom = domain;
		let prevDom = undefined;
		let headerTransition = "";
		if (location.state?.previousDomain) {
			prevDom = location.state.previousDomain;
		}
		if (prevDom === curDom || !prevDom) {
			headerTransition = `${curDom}`;
			// console.log("headerTransition", headerTransition);
		} else {
			headerTransition = `${prevDom}-to-${curDom}`;
			console.log(headerTransition);
		}
		changeTheme(headerTransition);
		setCurrentDomain(curDom);
		setDomainObj(domains[domain]);
	}, [location, auth]);

	useEffect(() => {
		if (headerTransition) {
			changeTheme(headerTransition);
		}
	}, [domainObj]);
	// update everytime username changes; if username exists, put it on display, if not, default
	useEffect(() => {
		if (!contextIsLoading && auth) {
			if (username) {
				setDisplayUsername(username);
				setIsLoading(false);
			}
			if (domain === "buddySystem" && !username) {
				setIsLoading(false);
			}
		}
		if (domainObj && auth === false) {
			setIsLoading(false);
		}
		// console.log("header", location);
	}, [auth, contextIsLoading, domainObj, username]);

	return (
		<div className="header" key={domain}>
			<div className="site-banner white-font">
				{domainObj && (
					<>
						<Helmet>
							<link
								rel="icon"
								type="image/x-icon"
								href={`/${domainObj.logo}`}
							/>
							<title>{domains[domain].name}</title>
						</Helmet>
						<Link to={`/${domains[domain].path}`} key={domain}>
							{domain && (
								<h1 key={domain}>{domains[domain].name}</h1>
							)}
						</Link>
						<div className="account">
							{auth ? (
								<>
									<Link to="/createUsername">
										{!username
											? "Create Username"
											: displayUsername}
									</Link>
									<LogoutButton />
									<Link
										to={`/buddySystem`}
										className="home-button"
										state={{
											previousDomain: currentDomain,
										}}
									>
										<HomeOutlined />
									</Link>
								</>
							) : (
								<>
									{!(location.pathname === "/login") && ( // login button appears if not authorized, and not on /login page.
										<Link
											to={`/${domain}/login`}
											state={{
												previousPath: location.pathname,
											}}
										>
											<LogInButton />
										</Link>
									)}{" "}
									<Link
										to={`/buddySystem`}
										className="home-button"
										state={{
											previousDomain: currentDomain,
										}}
									>
										<HomeOutlined />
									</Link>
								</>
							)}
						</div>
					</>
				)}
			</div>
			<Navbar />
		</div>
	);
};
