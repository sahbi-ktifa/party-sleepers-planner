export interface ISleeper {
    id?: number;
    name?: string;
    siteName?: string;
    siteId?: number;
}

export class Sleeper implements ISleeper {
    constructor(public id?: number, public name?: string, public siteName?: string, public siteId?: number) {}
}
