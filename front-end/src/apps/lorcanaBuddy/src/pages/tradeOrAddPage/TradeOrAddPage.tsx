import { Select } from "antd";
import { DisplayExpenses } from "../../components/DisplayExpenses";
import { ExpensesInput } from "../../components/ExpensesInput";
import { InputCards } from "../../components/InputCards";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";

export const TradeOrAddPage = () => {
	const { auth, setRefreshLorcanaCardImage, refreshLorcanaCardImage } = useContext(AuthContext);

	const [wave, setWave] = useState<number>(1);

	useEffect(() => {
		setRefreshLorcanaCardImage(!refreshLorcanaCardImage);
	}, [wave]);

	return (
		<div>
			<Select
				style={{ width: 120 }}
				placeholder="Select wave"
				onChange={(value) => setWave(value)}
				options={[
					{ value: 1, label: "TFC" },
					{ value: 2, label: "ROTF" },
					{ value: 3, label: "ITI" },
				]}
			/>
			<h1>Wave {wave}</h1>
			<InputCards wave={wave} />
		</div>
	);
};
