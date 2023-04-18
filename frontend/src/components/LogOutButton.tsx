
import React from "react";
import { Button } from "antd";
import { supabase } from ".././supabaseClient";
import { user } from ".././supabaseClient";


const LogoutButton: React.FC<{}> = () => {
    const handleSignout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error while signing out', error);
        } 
    }
	return (
		<Button type="primary" className="logout-button" onClick={handleSignout} hidden={!user}>
			Logout
		</Button>
	);
};
export default LogoutButton;
