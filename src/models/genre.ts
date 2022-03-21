export interface Genre {
    id: number;
    name: string;
}

export interface RootObject {
    genres: Genre[];
}
