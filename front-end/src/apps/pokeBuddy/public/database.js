export const pokemonTypes = [
	"Bug",
	"Dark",
	"Dragon",
	"Electric",
	"Fairy",
	"Fighting",
	"Fire",
	"Flying",
	"Ghost",
	"Grass",
	"Ground",
	"Ice",
	"Normal",
	"Poison",
	"Psychic",
	"Rock",
	"Steel",
	"Water",
];

export const keys = [
	"Digit0",
	"Digit1",
	"Digit2",
	"Digit3",
	"Digit4",
	"Digit5",
	"KeyQ",
	"KeyW",
	"KeyE",
	"KeyR",
	"KeyT",
	"KeyA",
	"KeyS",
	"KeyD",
	"KeyF",
	"KeyG",
	"KeyZ",
	"KeyX",
	"KeyC",
];

export const typeEffectiveness = {
	Bug: [
		1, 1, 1, 1, 1, 0.625, 1.6, 1.6, 1, 0.625, 0.625, 1, 1, 1, 1, 1.6, 1, 1,
	],
	Dark: [
		1.6, 0.625, 1, 1, 1.6, 1.6, 1, 1, 0.625, 1, 1, 1, 1, 1, 0.391, 1, 1, 1,
	],
	Dragon: [
		1, 1, 1.6, 0.625, 1.6, 1, 0.625, 1, 1, 0.625, 1, 1.6, 1, 1, 1, 1, 1,
		0.625,
	],
	Electric: [
		1, 1, 1, 0.625, 1, 1, 1, 0.625, 1, 1, 1.6, 1, 1, 1, 1, 1, 0.625, 1,
	],
	Fairy: [
		0.625, 0.625, 0.391, 1, 1, 0.625, 1, 1, 1, 1, 1, 1, 1, 1.6, 1, 1, 1.6,
		1,
	],
	Fighting: [
		0.625, 0.625, 1, 1, 1.6, 1, 1, 1.6, 1, 1, 1, 1, 1, 1, 1.6, 0.625, 1, 1,
	],
	Fire: [
		0.625, 1, 1, 1, 0.625, 1, 0.625, 1, 1, 0.625, 1.6, 0.625, 1, 1, 1, 1.6,
		0.625, 1.6,
	],
	Flying: [
		0.625, 1, 1, 1.6, 1, 0.625, 1, 1, 1, 0.625, 0.391, 1.6, 1, 1, 1, 1.6, 1,
		1,
	],
	Ghost: [
		0.625, 1.6, 1, 1, 1, 0.391, 1, 1, 1.6, 1, 1, 1, 0.391, 0.625, 1, 1, 1,
		1,
	],
	Grass: [
		1.6, 1, 1, 0.625, 1, 1, 1.6, 1.6, 1, 0.625, 0.625, 1.6, 1, 1.6, 1, 1, 1,
		0.625,
	],
	Ground: [
		1, 1, 1, 0.391, 1, 1, 1, 1, 1, 1.6, 1, 1.6, 1, 0.625, 1, 0.625, 1, 1.6,
	],
	Ice: [1, 1, 1, 1, 1, 1.6, 1.6, 1, 1, 1, 1, 0.625, 1, 1, 1, 1.6, 1.6, 1],
	Normal: [1, 1, 1, 1, 1, 1.6, 1, 1, 0.391, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	Poison: [
		0.625, 1, 1, 1, 0.625, 0.625, 1, 1, 1, 0.625, 1.6, 1, 1, 0.625, 1.6, 1,
		1, 1,
	],
	Psychic: [
		1.6, 1.6, 1, 1, 1, 0.625, 1, 1, 1.6, 1, 1, 1, 1, 1, 0.625, 1, 1, 1,
	],
	Rock: [
		1, 1, 1, 1, 1, 1.6, 0.625, 0.625, 1, 1.6, 1.6, 1, 0.625, 0.625, 1, 1,
		1.6, 1.6,
	],
	Steel: [
		0.625, 1, 0.625, 1, 0.625, 1.6, 1.6, 0.625, 1, 0.625, 1.6, 0.625, 0.625,
		0.391, 0.625, 0.625, 0.625, 1,
	],
	Water: [
		1, 1, 1, 1.6, 1, 1, 0.625, 1, 1, 1.6, 1, 0.625, 1, 1, 1, 1, 0.625,
		0.625,
	],
};

const attackStats = {
	Bug: [
		1, 1.6, 1, 1, 0.625, 0.625, 0.625, 0.625, 0.625, 1.6, 1, 1, 1, 0.625,
		1.6, 1, 0.625, 1,
	],
	Dark: [
		1, 0.625, 1, 1, 0.625, 0.625, 1, 1, 1.6, 1, 1, 1, 1, 1, 1.6, 1, 1, 1,
	],
	Dragon: [1, 1, 1.6, 1, 0.390625, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.625, 1],
	Electric: [
		1, 1, 0.625, 0.625, 1, 1, 1, 1.6, 1, 0.625, 0.390625, 1, 1, 1, 1, 1, 1,
		1.6,
	],
	Fairy: [
		1, 1.6, 1.6, 1, 1, 1.6, 0.625, 1, 1, 1, 1, 1, 1, 0.625, 1, 1, 0.625, 1,
	],
	Fighting: [
		0.625, 1.6, 1, 1, 0.625, 1, 1, 0.625, 0.390625, 1, 1, 1.6, 1.6, 0.625,
		0.625, 1.6, 1.6, 1,
	],
	Fire: [
		1.6, 1, 0.625, 1, 1, 1, 0.625, 1, 1, 1.6, 1, 1.6, 1, 1, 1, 0.625, 1.6,
		0.625,
	],
	Flying: [
		1.6, 1, 1, 0.625, 1, 1.6, 1, 1, 1, 1.6, 1, 1, 1, 1, 1, 0.625, 0.625, 1,
	],
	Ghost: [
		1, 0.625, 1, 1, 1, 1, 1, 1, 1.6, 1, 1, 1, 0.390625, 1, 1.6, 1, 1, 1,
	],
	Grass: [
		0.625, 1, 0.625, 1, 1, 1, 0.625, 0.625, 1, 0.625, 1.6, 1, 1, 0.625, 1,
		1.6, 0.625, 1.6,
	],
	Ground: [
		0.625, 1, 1, 1.6, 1, 1, 1.6, 0.390625, 1, 0.625, 1, 1, 1, 1.6, 1, 1.6,
		1.6, 1,
	],
	Ice: [
		1, 1, 1.6, 1, 1, 1, 0.625, 1.6, 1, 1.6, 1.6, 0.625, 1, 1, 1, 1, 0.625,
		0.625,
	],
	Normal: [
		1, 1, 1, 1, 1, 1, 1, 1, 0.390625, 1, 1, 1, 1, 1, 1, 0.625, 0.625, 1,
	],
	Poison: [
		1, 1, 1, 1, 1.6, 1, 1, 1, 0.625, 1.6, 0.625, 1, 1, 0.625, 1, 0.625,
		0.390625, 1,
	],
	Psychic: [
		1, 0.390625, 1, 1, 1, 1.6, 1, 1, 1, 1, 1, 1, 1, 1.6, 0.625, 1, 0.625, 1,
	],
	Rock: [
		1.6, 1, 1, 1, 1, 0.625, 1.6, 1.6, 1, 1, 0.625, 1.6, 1, 1, 1, 1, 0.625,
		1,
	],
	Steel: [
		1, 1, 1, 0.625, 1.6, 1, 0.625, 1, 1, 1, 1, 1.6, 1, 1, 1, 1.6, 0.625,
		0.625,
	],
	Water: [
		1, 1, 0.625, 1, 1, 1, 1.6, 1, 1, 0.625, 1.6, 1, 1, 1, 1, 1.6, 1, 0.625,
	],
};

export const checkAttackPotential = (state1, state2) => {
	let effectObj = {
		superEffective: [],
		notVeryEffective: [],
		weakEffective: [],
	};

	const sortThroughArray = (array) => {
		array.forEach((effectiveness, index) => {
			if (effectiveness === 1.6) {
				effectObj.superEffective.push(pokemonTypes[index]);
			}
			if (effectiveness === 0.625) {
				effectObj.notVeryEffective.push(pokemonTypes[index]);
			}
			if (effectiveness === 0.390625) {
				effectObj.weakEffective.push(pokemonTypes[index]);
			}
		});
	};

	if (state1 && !state2) {
		// only one state
		sortThroughArray(attackStats[state1]);
	}

	if (state1 && state2) {
		let mergedArr = attackStats[state1].map((type1, index) =>
			Math.max(type1, attackStats[state2][index])
		);
		sortThroughArray(mergedArr);
	}

	return effectObj;
};

/*
typeEffectiveness.Bug.map((effectiveness, index) => {
    if (effectiveness === 1) {
        pokemonTypes[index]
    }

})*/

/*
[   
    [0.391x],
    [0.625x],
    [1x],
    [1.60x],
    [2.56x]
]
*/

export const checkTypes = (state1, state2) => {
	let effectObj = {
		extraResistant: [],
		veryResistant: [],
		resistant: [],
		normal: [],
		weakTo: [],
		veryWeakTo: [],
	};

	const sortThroughArray = (array) => {
		array.forEach((effectiveness, index) => {
			if (effectiveness === 0.244375) {
				effectObj.extraResistant.push(pokemonTypes[index]);
			}
			if (effectiveness === 0.391 || effectiveness === 0.625 * 0.625) {
				effectObj.veryResistant.push(pokemonTypes[index]);
			}
			if (effectiveness === 0.625) {
				effectObj.resistant.push(pokemonTypes[index]);
			}
			if (effectiveness === 1) {
				effectObj.normal.push(pokemonTypes[index]);
			}
			if (effectiveness === 1.6 * 1.6) {
				effectObj.veryWeakTo.push(pokemonTypes[index]);
			}
			if (effectiveness === 1.6) {
				effectObj.weakTo.push(pokemonTypes[index]);
			}
		});
	};

	if (state1 && !state2) {
		// only one state
		sortThroughArray(typeEffectiveness[state1]);
	}

	if (state1 && state2) {
		let mergedArr = typeEffectiveness[state1].map(
			(type1, index) => type1 * typeEffectiveness[state2][index]
		);
		sortThroughArray(mergedArr);
	}

	return effectObj;
};
