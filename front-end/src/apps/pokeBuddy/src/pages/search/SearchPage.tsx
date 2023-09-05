import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { AutoComplete, Input } from "antd";
import pokemonsJSON from "../../../public/pokemon.json";
import { DefaultOptionType } from "antd/es/select";
type TProps = {};

type TOpponent = {
	opponent: string;
	rating: number;
};

type TMove = { moveId: string; uses: number };
type TIVStats = { product: number; atk: number; def: number; hp: number };

type TPokemonData = {
	speciesId: string;
	speciesName: string;
	rating: number;
	matchups: TOpponent[];
	counters: TOpponent[];
	moves: {
		fastMoves: TMove[];
		chargedMoves: TMove[];
	};
	moveset: string[];
	score: number;
	scores: number[];
	stats: TIVStats;
};

export const SearchPage = ({}: TProps) => {
	const [pokemons, setPokemons] = useState<TPokemonData[]>();
	const [pokemon, setPokemon] = useState<TPokemonData>();
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
					if (pokemons) {
						const chosen = pokemons.filter(
							(pokemon: TPokemonData) =>
								pokemon.speciesName === value
						);
						setPokemon(chosen[0]);
					}
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
