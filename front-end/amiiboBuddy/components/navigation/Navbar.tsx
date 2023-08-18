import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { domains } from "../../../src/utils/utils";
import { TPage } from "../../../src/api/types";

export const Navbar = () => {
	const [pages, setPages] = useState<TPage[]>([]);
	const location = useLocation();

	useEffect(() => {
		const splitPathName = location.pathname.split("/");
		const curDomain =
			splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
		const currentDomain = curDomain;
		setPages(domains[currentDomain].pages);
		console.log(
			"list of pages to render in nav bar",
			domains[currentDomain].pages
		);
	}, [location]);

	return (
		<nav>
			<ul className="nav-links">
				{pages
					? pages.map((page) => (
							<li key={page.name}>
								{/* These links should have an activeClassName prop 
								now with react v6 active class name is within className =   
								className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""  } */}
								<NavLink
									to={`/${page.path}`}
									key={page.name}
									className="nav-link"
								>
									{page.name}s
								</NavLink>{" "}
							</li>
					  ))
					: "Loading..."}
				``
			</ul>
		</nav>
	);
};
