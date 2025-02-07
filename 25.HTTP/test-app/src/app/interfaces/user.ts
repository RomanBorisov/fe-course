export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress
    phone: string,
    website: string,
    company: ICompany
}

export interface IAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: IGeoPosition
}

export interface IGeoPosition {
    lat: string,
    lng: string
}

export interface ICompany {
    name: string,
    catchPhrase: string,
    bs: string
}

export function toUser(data: any): IUser {
    return {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        address: data.address,
        phone: data.phone,
        website: data.website,
        company: toCompany(data.company)
    };
}

export function toCompany(data: any): ICompany {
    return {
        name: data.name,
        catchPhrase: data.catchPhrase,
        bs: data.bs
    };
}

export function toAddress(data: any): IAddress {
    return {
        street: data.street,
        suite: data.suite,
        city: data.city,
        zipcode: data.zipcode,
        geo: toGeoPosition(data.geo)
    };
}

export function toGeoPosition(data: any): IGeoPosition {
    return {
        lat: data.lat,
        lng: data.lng
    };
}
