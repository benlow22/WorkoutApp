import React, { useContext, useEffect } from "react";
import { Header } from "./Header";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { LoginPage } from "../pages/LoginPage";
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
