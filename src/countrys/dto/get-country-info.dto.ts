interface IBorders {
    "commonName": string,
    "officialName": string,
    "countryCode": string,
    "region": string,
    "borders": null
}
interface IPopulationCounts {
    "year": number,
    "value": number
}

export class GetCountryInfoDto {
    name: string
    borders: IBorders[]
    population: number[]
    flagURL: string
}
