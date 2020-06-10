export interface IPlace {
    name: string;
    reference: string;
}

export interface IOpeningHours {
    startDay: string,
    endDay: string|null,
    hours: string[]
}
