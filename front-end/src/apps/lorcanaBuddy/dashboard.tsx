import { Outlet } from "react-router-dom";
import React from "react";

export const LorcanaBuddyDashboard = () => {
	return (
		<div className="page-heading">
			<h2>Lorcana Buddy</h2>
			{/* <Outlet /> */}
			<h4>
				Here you can browse through all of the available lorcana cards
				and catalog which ones you have, want, or like.
			</h4>
			<h4>
				Once logged in you will be able to save your data for quick
				reference.
			</h4>
		</div>
	);
};
