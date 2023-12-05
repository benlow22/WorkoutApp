enum CardColor {
	Amber,
	Amethyst,
	Emerald,
	Ruby,
	Saphire,
	Steel,
}

enum Rarity {
	Uncommon,
	Common,
	Rare,
	"Super Rare",
	Legendary,
	Enchanted,
}

const enum Type {
	Character,
}

const enum SetId {
	Promo,
	TFC,
	RFB,
}
const enum SetName {
	Promo,
	"The First Chapter",
	"Rise of the Floodborn",
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
	set: SetName;
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

export type TLorcanaCard = {
	id: string;
	cardNumber: number;
	colour: CardColor;
	inkable: boolean;
	rarity: Rarity;
	type: Type;
	name: string;
	classification: string;
	cost: number;
	strength: number;
	willpower: number;
	lore: number;
	abilities: string;
	bodyText: string;
	flavourText: string;
	setName: SetName;
	set: number;
	artist: string;
	imageUrl: string;
	set_id: SetId;
};
