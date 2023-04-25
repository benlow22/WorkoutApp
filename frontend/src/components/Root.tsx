import React, { useContext, useEffect } from "react";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { AuthPage } from "../pages/AuthPage";
import { WelcomePage } from "../pages/WelcomePage";

export default function Root() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
}
