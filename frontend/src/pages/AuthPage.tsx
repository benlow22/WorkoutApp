import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthPage = () => {
	const { auth } = useContext(AuthContext);

	// when going to AuthPage, get session, set if logged in


	if (!auth) {
		return (
			<div className="auth-page">
				<p>Please Login Below</p>
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeSupa,
						variables: {
							default: {
								colors: {
									brand: "red",
									brandAccent: "darkred",
								},
							},
						},
					}}
				/>
			</div>
		);
	} else {
		return <Navigate to="/workouts" />;
	}
};
