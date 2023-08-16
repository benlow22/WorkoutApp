import { useMemo, useState } from "react";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Helmet } from "react-helmet";
import { MapOptions } from "google-map-react";

export default function Places(props) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
		libraries: ["places"],
	});

	if (!isLoaded) return <div>Loading...</div>;
	return <Map props={props} />;
}
function Map({ selected, setSelected, setLocationName }) {
	const center = useMemo(() => {
		if (selected) {
			return selected;
		} else {
			return { lat: 40.747274, lng: -73.984546 };
		}
	}, [selected]);

	const googleMapOptions: MapOptions = {
		controlSize: 25,
	};

	return (
		<div>
			<div className="places-container">
				<PlacesAutocomplete
					setSelected={setSelected}
					setLocationName={setLocationName}
				/>
			</div>
			<GoogleMap
				zoom={14}
				center={center}
				mapContainerClassName="map-container"
				options={googleMapOptions}
			>
				{selected && <Marker position={selected} />}
			</GoogleMap>
		</div>
	);
}

// type TProps = {
// 	setSelected: React.Dispatch<
// 		React.SetStateAction<{ lat: number; lng: number } | null>
// 	>;
// };
export const PlacesAutocomplete = ({ setSelected, setLocationName }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	const handleSelect = async (address: string) => {
		setValue(address, false);
		clearSuggestions();
		setLocationName(address);
		const results = await getGeocode({ address });
		const { lat, lng } = getLatLng(results[0]);
		setSelected({ lat, lng });
	};

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				className="combobox-input"
				placeholder="Search an address"
			/>
			<ComboboxPopover>
				<ComboboxList>
					{status === "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption
								key={place_id}
								value={description}
							/>
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
};
