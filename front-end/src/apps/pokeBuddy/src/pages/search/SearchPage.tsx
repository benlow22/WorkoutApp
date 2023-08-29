import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { AutoComplete, Input } from "antd";
import pokemonsJSON from "../../../public/pokemon.json";
import { DefaultOptionType } from "antd/es/select";
type TProps = {};

export const SearchPage = ({}: TProps) => {
	const [pokemons, setPokemons] = useState<any>();
	const [pokemon, setPokemon] = useState("");
	const [pokemonsOptions, setPokemonsOptions] = useState<{ value: string }[]>(
		[]
	);

	const { userId, session, supabase } = useContext(AuthContext);

	useEffect(() => {
		if (pokemon) {
			console.log("chosen mon", pokemon);
		}
	}, [pokemon]);
	useEffect(() => {
		const pokemonsList = JSON.parse(JSON.stringify(pokemonsJSON));
		console.log("json", pokemonsList);
		setPokemons(pokemonsList);
		const convertPokemonListToOptions = pokemonsList.map(
			(pokemon: any, index: number) => ({
				label: <p style={{ color: "black" }}>{pokemon.speciesName}</p>,
				value: pokemon.speciesName,
			})
		);
		setPokemonsOptions(convertPokemonListToOptions);
		console.log(convertPokemonListToOptions);
	}, []);

	const options = [{ value: "?" }];

	return (
		<div className="poke-search-page">
			<h3 className="page-heading">Search</h3>
			{/* <Input style={{ width: "400px" }} /> */}
			<AutoComplete
				style={{ width: 200 }}
				options={pokemonsOptions}
				placeholder="choose a pokemon"
				allowClear
				filterOption={(inputValue, option) =>
					option!
						.value!.toUpperCase()
						.indexOf(inputValue.toUpperCase()) !== -1 &&
					inputValue.length > 1
				}
				onSelect={(value) => {
					const chosen = pokemons.filter((pokemon: any) => {
						return pokemon.speciesName === value;
					});
					setPokemon(chosen[0]);
				}}
			/>
			{pokemon && (
				<div>
					<p>{pokemon.speciesName}</p>
				</div>
			)}
		</div>
	);
};
