import { Select } from "antd";
import { useState } from "react";
import { NewInputFormList } from "../../components/NewInputFormList";

export const NewInput = () => {
	const [waveFilter, setWaveFilter] = useState<number>(0);
	// const [isAllFoil, setIsAllFoil] = useState<boolean>(false);
	return (
		<div className="input-page" style={{}}>
			<h3>Select Wave:</h3>
			<Select
				placeholder="Select Wave"
				style={{ width: 220 }}
				onChange={(value: number) => {
					setWaveFilter(value);
				}}
				options={[
					{ value: 1, label: "1. The First Chapter" },
					{ value: 2, label: "2. Rise of the Floodborn" },
					{ value: 3, label: "3. Into the Inklands" },
					{ value: 4, label: "4. Ursula's Return" },
				]}
			/>
			{/* <Space style={{ width: "100%", justifyContent: "center" }}>
				<Switch
					checkedChildren="foil"
					style={{ width: "100px", margin: "auto" }}
					unCheckedChildren="non-foil"
					onChange={() => setIsAllFoil(!isAllFoil)}
				></Switch>
			</Space> */}

			{waveFilter > 0 && <NewInputFormList wave={waveFilter} />}
		</div>
	);
};
