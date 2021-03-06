export interface ILocation {
    id?: number;
    name?: string;
    max?: number;
    occupants?: number;
}

export class Location implements ILocation {
    constructor(public id?: number, public name?: string, public max?: number, public occupants?: number) {}
}
