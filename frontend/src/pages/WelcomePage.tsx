import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export const WelcomePage = () => {
	const { isLoggedIn } = useContext(AuthContext);

	if (!isLoggedIn) {
		return <h1>Welcome to the WORKOUT APP</h1>;
	} else {
        return <h1> </h1>
    }
};
