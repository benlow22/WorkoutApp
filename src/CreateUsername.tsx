import React, { useState, useEffect, useContext } from "react";
import { supabase } from "./supabaseClient";
import { UserOutlined } from "@ant-design/icons";
import { Input, Button, Space } from "antd";
import { AuthContext } from "./App";

export const CreateUsername: React.FC<{}> = () => {
	const [newUsername, setNewUsername] = useState<string>("");
	const [user, setUser] = useState<any | null>(null);
	const { userid, setUsername } = useContext(AuthContext);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log("new Username to set", newUsername);

		console.log("user info", user);
		try {
			const { error } = await supabase
				.from("profiles")
				.update({ username: newUsername })
				.eq("id", userid);
			setUsername(newUsername);
			setNewUsername("");
		} catch (err) {
			console.log("error updating username", err);
		}
	};

	return (
		<div>
			<Space.Compact>
				<Input
					defaultValue="Username"
					onChange={(e) => setNewUsername(e.target.value)}
					value={newUsername}
					placeholder="New Username"
				/>
				<Button type="primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Space.Compact>
		</div>
	);
};

// later make a edit username section 

export default CreateUsername;