export interface CardType {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    level: string;
    hp: string;
    types: string[];
    evolvesFrom: string;
    abilities: Ability[];
    attacks: Attack[];
    weaknesses: Weakness[];
    resistances: Weakness[];
    retreatCost: string[];
    convertedRetreatCost: number;
    set: Set;
    number: string;
    artist: string;
    rarity: string;
    nationalPokedexNumbers: number[];
    legalities: Legalities;
    images: PokemonImages;
    tcgplayer: Tcgplayer;
    cardmarket: CardMarket;
    selected : boolean;
}

export interface SelectedCardType {
    cardType : CardType,
    cartCount : number
}

interface CardMarket {
    url: string;
    updatedAt: string;
    prices: Prices2;
}

interface Prices2 {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: number;
    suggestedPrice: number;
    reverseHoloSell: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: number;
    reverseHoloAvg7: number;
    reverseHoloAvg30: number;
}

interface Tcgplayer {
    url: string;
    updatedAt: string;
    prices: Prices;
}

interface Prices {
    holofoil: Holofoil;
    reverseHolofoil: Holofoil;
}

interface Holofoil {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow?: any;
}

interface PokemonImages {
    small: string;
    large: string;
}

interface Set {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legalities;
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: Images;
}

interface Images {
    symbol: string;
    logo: string;
}

interface Legalities {
    unlimited: string;
}

interface Weakness {
    type: string;
    value: string;
}

interface Attack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

interface Ability {
    name: string;
    text: string;
    type: string;
}
