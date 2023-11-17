import { useContext, useState } from "react";
import { Button, Space, Input } from "antd";

// import { postNewWorkout } from "../../api/api";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
// import { changeNameToUrl } from "../../../../../utils/utils";

export const NewUsername = () => {
	const [newUsername, setNewUsername] = useState<string>("");
	const { workouts, userId, setUsername } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (newUsername.length > 0) {
				const { data, error } = await supabase
					.from("profiles")
					.update({ username: newUsername })
					.eq("id", userId)
					.select()
					.single();
				if (error) {
					console.log(error);
				} else {
					setUsername(data.username);
					console.log("new username set", data, location);
					navigate(location.state.previousPathname);
				}
			}
			return true;
		} catch (error) {
			console.error("error inserting new workout", error);
		}
	};

	return (
		<div className="new-username">
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
		</div>
	);
};
