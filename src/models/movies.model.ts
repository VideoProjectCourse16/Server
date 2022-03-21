export interface Movie {
    id: string;
    adult: boolean;
    release_date: string;
    poster_path: string;
    trailer: string;
    original_language: string;
    title: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
}

export interface Movies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface SingleMov {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
}

export interface RootObject {
    id: number;
    results: SingleMov[];
}