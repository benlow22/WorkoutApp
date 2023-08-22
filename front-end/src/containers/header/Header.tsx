import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./LogOutButton";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import LogInButton from "./LogInButton";
import { useLocation } from "react-router-dom";
import { TDomain } from "../../api/types";
import { domains } from "../../utils/utils";
import { Navbar } from "../../components/navigation/Navbar";
import { HomeOutlined } from "@ant-design/icons";
import "./styles/theme.css";
import { changeTheme } from "../../styles/theming/theme";

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
	// const [headerTransition, setHeaderTransition] = useState<string>("/");
	const navigate = useNavigate();
	useEffect(() => {
		setDomainObj(domains[domain]);
	}, []);

	useEffect(() => {
		let curDom = "";
		let prevDom = undefined;
		let headerTransition = "";
		if (auth === false) {
			curDom = "buddySystem";
			if (location.state?.previousDomain) {
				prevDom = location.state.previousDomain;
			}
		} else {
			const splitPathName = location.pathname.split("/");
			const subDomain =
				splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
			curDom = subDomain;
			if (location.state?.previousDomain) {
				prevDom = location.state.previousDomain;
			}
		}
		if (prevDom === curDom || !prevDom) {
			headerTransition = `${curDom}`;
			// console.log(`${curDom}-header`);
		} else {
			headerTransition = `${prevDom}-to-${curDom}`;
			// setHeaderTransition(`${prevDom}-to-${curDom}-header`);
			// console.log(`${prevDom}-to-${curDom}-header`);
		}
		changeTheme(headerTransition);
		setCurrentDomain(curDom);
		setPreviousDomain(prevDom);
		setDomainObj(domains[curDom]);
	}, [location, auth]);

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

	return (
		<div className="header" key={domain}>
			<div className="site-banner white-font">
				{!isLoading &&
					(auth ? (
						domainObj && (
							<>
								<Link
									to={`/${domains[domain].path}`}
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
									<Link
										to={`/buddySystem`}
										className="home-button"
										state={{
											previousDomain: currentDomain,
										}}
									>
										<HomeOutlined />
									</Link>
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
			<Navbar />
		</div>
	);
};
