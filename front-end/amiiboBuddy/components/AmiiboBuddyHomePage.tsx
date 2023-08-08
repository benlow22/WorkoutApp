import React, { useContext, useEffect, useState } from "react";
import { SpiningLoadingIcon } from "../../src/components/loading/LoadingIcon";

export const AmiiboBuddyHomePage: React.FC<{}> = () => {
	// const { workouts, setWorkouts, userId, session } = useContext(AuthContext);

	// useEffect(() => {
	// 	// once logged in, make API call //session wil always be true here, if sstatement to bypass error
	// 	if (session) {
	// 		getAllUsersWorkoutsRequest(session);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	// set workouts from response
	// 	if (getAllUsersWorkoutsResponse) {
	// 		console.log(getAllUsersWorkoutsResponse);
	// 		setWorkouts(getAllUsersWorkoutsResponse);
	// 	}
	// }, [getAllUsersWorkoutsResponse]);

	// if (!getAllUsersWorkoutsLoading) {
	return (
		<div className="amiibo-homepage">
			<h2 className="page-heading">AmiiboBuddy</h2>
		</div>
	);
	// } else {
	// 	return <SpiningLoadingIcon />;
	// }
};
