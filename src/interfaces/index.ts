export interface IPlace {
    name: string;
    reference: string;
}

export interface IOpeningHours {
    startDay: string;
    endDay: string | null;
    hours: string[];
}

export interface IDay {
    start: string;
    end: string;
    type: string;
}

export interface IPlaceData {
    displayed_what: string;
    opening_hours: any;
    displayed_where: string;
}
