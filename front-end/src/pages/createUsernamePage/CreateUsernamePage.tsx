import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabaseClient";
import { UserOutlined } from "@ant-design/icons";
import { Input, Button, Space } from "antd";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export const CreateUsernamePage: React.FC<{}> = () => {
	const [newUsername, setNewUsername] = useState<string>("");
	const { userId, setUsername, username } = useContext(AuthContext);
	const [allUsernames, setAllUsernames] = useState<string[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getAllUsernames = async () => {
			try {
				const { data, error } = await supabase
					.from("profiles")
					.select("username");
				console.log("allusers:", data);
				if (error) {
					throw error;
				}
				if (data) {
					const allUsernames = data.map((user) => user.username);
					console.log("allusernames:", allUsernames);
					setAllUsernames(allUsernames);
				}
			} catch (error) {
				console.error("error getting all users:", error);
			}
		};
		getAllUsernames();
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (allUsernames.includes(newUsername)) {
			alert(`username "${newUsername}" is already taken`);
		} else {
			if (newUsername.match(/^\w{5,15}$/)) {
				// if newUsername matches RegEx of any number or letter, 5-15 length
				try {
					const { error } = await supabase // update profiles.username
						.from("profiles")
						.update({ username: newUsername })
						.eq("id", userId);
					if (!error) {
						setUsername(newUsername);
					}
					const { data, error: err2 } =
						await supabase.auth.updateUser({
							// update auth.users...metadata.username
							data: { username: newUsername },
						});
					setNewUsername("");
					navigate("/workouts");
					if (error) throw error;
					if (err2) throw error;
				} catch (err) {
					console.error("error updating username", err);
				}
			}
		}
	};

	return (
		<div>
			<h2>{username ? "Change " : "Create "} Username</h2>
			<form className="upsert-username-form">
				<input
					onChange={(e) => setNewUsername(e.target.value)}
					value={newUsername}
					type="text"
					placeholder="New Username"
					pattern="[A-Za-z0-9]{5,15}"
					className="upsert-username-form-input"
					maxLength={15}
				></input>
				<input
					type="submit"
					onClick={handleSubmit}
					className="upsert-username-submit-button"
				/>
			</form>
		</div>
	);
};

// later make a edit username section
