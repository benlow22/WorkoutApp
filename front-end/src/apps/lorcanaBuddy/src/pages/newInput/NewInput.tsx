import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { NewInventoryCard } from "../../components/NewInventoryCard";
import { TNewCard } from "../newInventory/NewInventory";
import { Select } from "antd";
import { NewCardsInputByWave } from "../../components/NewCardsInputByWave";

export const NewInput = () => {
	const { auth, userId, session, supabase, usersLorcanaCards, lorcanaCardImages, lorcanaCards } = useContext(AuthContext);
	const [allCards, setAllCards] = useState<TNewCard[] | null>();
	const [allCardImages, setAllCardImages] = useState<string[] | null>();
	const [waveFilter, setWaveFilter] = useState<number>(0);

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
			<div className="" style={{}}>
				{waveFilter > 0 && <NewCardsInputByWave wave={waveFilter} />}
			</div>
		</div>
	);
};
