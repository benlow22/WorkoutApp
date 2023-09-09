enum CardSet {
	"The First Chapter",
}

enum CardColor {
	Amber,
	Amethyst,
	Emerald,
	Ruby,
	Saphire,
	Steel,
}

enum CardType {
	"Action",
	"Action - Song",
	"Alien",
	"Ally",
	"Broom",
	"Captain",
	"Character",
	"Deity",
	"Detective",
	"Dragon",
	"Dreamborn",
	"Fairy",
	"Floodborn",
	"Hero",
	"Inventor",
	"Item",
	"King",
	"Mentor",
	"Pirate",
	"Prince",
	"Princess",
	"Queen",
	"Sorcerer",
	"Storyborn",
	"Tigger",
	"Villain",
}

export type TLorcanaCardData = {
	cardName: string;
	traits: string[];
	set: CardSet;
	"lore-value": number;
	"card-number": number;
	color: CardColor;
	strength: number;
	artist: string;
	willpower: number;
	type: CardType;
	subtypes: CardType[];
	"set-code": string;
	abilities: {
		[abilityName: string]: string;
	};
	inkable: boolean;
	"body-text": string;
	subtitle: string;
	"image-urls": {
		small: string;
		"no-art": string;
		large: string;
		"art-crop": string;
		medium: string;
		foil: string;
	};
	name: string;
	"flavor-text": string;
	"ink-cost": number;
};
