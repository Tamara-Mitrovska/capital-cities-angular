export interface Country {
    name: string;
    capital: string;
    region: string;
    code: string;
}

export const REGION_CODES = new Map([
    ['Europe', '150'],
    ['Asia', '142'],
    ['Africa', '002'],
    ['Americas', '019'],
    ['Oceania', '009']
])