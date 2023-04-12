export interface AuthorResponse {
    numFound:      number;
    start:         number;
    numFoundExact: boolean;
    docs:          Author[];
}

export interface Author {
    key:           string;
    type:          AuthorType;
    name:          string;
    birth_date?:   string;
    death_date?:   string;
    top_work:      string;
    work_count:    number;
    top_subjects?: string[];
    _version_:     number;
}

export enum AuthorType {
    Author = "author",
}
