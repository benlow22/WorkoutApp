import { useContext, useState } from "react";
import { Button, Space, Input } from "antd";

// import { postNewWorkout } from "../../api/api";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
// import { changeNameToUrl } from "../../../../../utils/utils";

export const NewUsername = () => {
	const [newUsername, setNewUsername] = useState<string>("");
	const { workouts, userId } = useContext(AuthContext);

	const navigate = useNavigate();
	console.log("userIDDDD", userId);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (newUsername.length > 0) {
				const { data, error } = await supabase
					.from("profiles")
					.update({ username: newUsername })
					.eq("id", userId)
					.select();
				if (error) console.log(error);
				console.log("new username set", data);
			}
			return true;
		} catch (error) {
			console.error("error inserting new workout", error);
		}
	};

	return (
		<>
			<h2 className="page-heading">New Username</h2>
			<Space.Compact>
				<Input
					defaultValue="Username"
					onChange={(e) => {
						setNewUsername(e.target.value);
					}}
					maxLength={30}
					value={newUsername}
					placeholder="New User Name"
					className="new-username-input"
					onPressEnter={handleSubmit}
					style={{ width: "200px" }}
				/>
				<Button type="primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Space.Compact>
		</>
	);
};
