import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import domainsJSON from "../../data/domains.json";
import { domainsFromDomainsJSON } from "../../utils/utils";
import { TDomain, TPage } from "../../api/types";
import "../../styles/navbar.css";

export const Navbar = () => {
	const [pages, setPages] = useState<TPage[]>([]);
	const location = useLocation();
	const [domain, setDomain] = useState<TDomain>();
	const domains = domainsFromDomainsJSON(domainsJSON);

	useEffect(() => {
		const splitPathName = location.pathname.split("/");
		const curDomain =
			splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
		const currentDomain = curDomain;
		setPages(domains[currentDomain].pages);
		setDomain(domains[currentDomain]);
		console.log("domain info", domains[currentDomain]);
	}, [location]);

	return (
		<nav className="navbar">
			<ul className="nav-links">
				{domain
					? domain.pages.map((page) => (
							<li key={page.name}>
								{/* These links should have an activeClassName prop 
								now with react v6 active class name is within className =   
								className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""  } */}
								<NavLink
									to={
										domain.name === "Buddy System"
											? `/${page.path}`
											: `/${domain.path}/${page.path} `
									}
									key={page.name}
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
											? "active"
											: "nav-link"
									}
									state={{ previousDomain: domain.path }}
								>
									{page.name}
								</NavLink>
							</li>
					  ))
					: " "}
			</ul>
		</nav>
	);
};
