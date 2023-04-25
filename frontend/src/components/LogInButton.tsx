import React, { useContext, useState } from "react";
import { Button } from "antd";
import { supabase } from ".././supabaseClient";
import { user } from ".././supabaseClient";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";




const LogInButton: React.FC<{}> = () => {
	return (
		<Button
			type="primary"
			className="login-button"
		>
			Log In
		</Button>
	);
};
export default LogInButton;
