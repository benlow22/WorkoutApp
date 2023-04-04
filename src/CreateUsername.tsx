import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { UserOutlined } from "@ant-design/icons";
import { Input, Button, Space } from "antd";

export const CreateUsername: React.FC<{}> = () => {
	const [newUsername, setNewUsername] = useState<string>("");
	const [user, setUser] = useState<any | null>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log("new Username to set", newUsername);

		const {
			data: { user },
		} = await supabase.auth.getUser();
		console.log("user info", user);
		const { error } = await supabase
			.from("profiles")
			.update({ username: newUsername })
			.eq("id", user.id);
		setNewUsername("");
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

export default CreateUsername;
