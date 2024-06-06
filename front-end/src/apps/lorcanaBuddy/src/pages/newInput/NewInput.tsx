import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { NewInputFormList } from "../../components/NewInputFormList";

export const NewInput = () => {
	const { auth } = useContext(AuthContext);

	return (
		<div className="input-page" style={{}}>
			{auth ? <NewInputFormList /> : <h3> Please Login</h3>}
		</div>
	);
};
