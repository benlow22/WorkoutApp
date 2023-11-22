import React, { useContext, useEffect, useState } from "react";
import { TAmiiboCard } from "../types/types";
import { Button } from "antd";
import { TAmiiboWithStatus } from "./AmiiboLine";
import { AuthContext } from "../../../../contexts/AuthProvider";

type TProps = {
	amiibo: TAmiiboWithStatus;
	// isChecked: boolean;
	// setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ChecklistAmiiboCard = ({
	amiibo: { id, name, image, character, amiiboSeries, status },
}: // isChecked,
// setIsChecked,
TProps) => {
	const { auth, supabase, userId } = useContext(AuthContext);

	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const [amiiboSeriesSize, setAmiiboSeriesSize] = useState("");

	const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
	const [upsertLoading, setUpsertLoading] = useState<boolean>(false);

	useEffect(() => {
		if (status.length > 0) {
			setCheckedStatus(status[0].isChecklist);
		}
	}, [status]);

	useEffect(() => {
		if (name.length < 15) {
			setAmiiboNameSize("");
		} else if (name.length < 30) {
			setAmiiboNameSize("two-lines");
		} else {
			setAmiiboNameSize("three-lines");
		}
		console.log('STATUS",', status);
	}, [name]);
	useEffect(() => {
		if (amiiboSeries.length < 15) {
			setAmiiboSeriesSize("");
		} else if (amiiboSeries.length < 30) {
			setAmiiboSeriesSize("two-lines");
		} else {
			setAmiiboSeriesSize("three-lines");
		}
		console.log('STATUS",', status);
	}, [amiiboSeries]);

	const handleCheckButton = async () => {
		setCheckedStatus(!checkedStatus);
		setUpsertLoading(true);
		try {
			const { data, error } = await supabase
				.from("amiibo_buddy_amiibo_statuses")
				.upsert({
					amiibo_id: id,
					user_id: userId,
					is_checklist: !checkedStatus,
				})
				.select();
			if (data) {
				console.log(data);
				setUpsertLoading(false);
			}
			if (error) {
				console.error(error);
				setUpsertLoading(false);
				setCheckedStatus(checkedStatus);
			}
		} catch (error) {
			// @ts-expect-error
			console.error(error.cause);
		}
		if (!auth) {
			setCheckedStatus(!checkedStatus);
		}
	};

	return (
		<Button
			className={`amiibo-card-checklist ${
				checkedStatus ? "checked" : "unchecked"
			}`}
			onClick={() => handleCheckButton()}
			disabled={upsertLoading}
		>
			<h3 className={`amiibo-name ${amiiboNameSize}`}>{name}</h3>
			<div className="amiibo-image-container">
				<img
					src={image}
					alt={`${character} from ${amiiboSeries} amiibo`}
					className="amiibo-image"
				/>
				<img
					src="/checkmark.png"
					className="checkmark"
					hidden={!checkedStatus}
				/>
			</div>
			<div className={`amiibo-series ${amiiboSeriesSize}`}>
				<h5>{amiiboSeries}</h5>
			</div>
		</Button>
	);
};
