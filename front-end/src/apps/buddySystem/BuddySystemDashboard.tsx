import { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import domainsJSON from "../../data/domains.json";
import { varFromDomainsJSON } from "../../utils/utils";
import { AppSummary } from "./src/components/AppSummary";
import summaryData from "./summaryData.json";
import "./src/styles/style.css";

export const BuddySystemDashboard = () => {
	console.log(summaryData.apps, "DATA");
	const domains = varFromDomainsJSON(domainsJSON, "domains");
	const [summaryApps, setSummaryApps] = useState(summaryData.apps);
	return (
		<div className="page-heading">
			{/* <h2>Buddy System Dashboard</h2> */}
			<h2>Welcome To the Buddy System</h2>
			<p>
				Here is a compilation of some of the personal projects I am
				working on.{" "}
			</p>
			<p>
				They are mostly for personal use. When I come across a problem
				and need an app to make things easier, I'll make it
			</p>

			<div className="summary-blurbs">
				{summaryApps &&
					summaryApps.map((app) => (
						<AppSummary
							appName={app.appName}
							color={app.color}
							description={app.description}
							imagePath={app.imagePath}
						></AppSummary>
					))}
			</div>
			<Outlet />
		</div>
	);
};
