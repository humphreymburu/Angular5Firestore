



export interface IEvento {
    id?: number,
    name: string,
    startDate: Date,
    endDate: Date,
    time?: string,
    price: number,
    imageUrl: string,
    places?: string,
    location?: {
        address: string,
        city: string,
        country?: string
    }
    //onlineUrl?: string,
    //sessions: ISession[]
}



export interface  ISession {
    id: number,
    name: string,
    presenter: string,
    duration: number,
    level: string,
    abstract: string,
    voter?: string[]
}

