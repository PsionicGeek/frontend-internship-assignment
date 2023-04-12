import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {SearchResponse} from "../models/search-response.model";
import {AuthorResponse} from "../models/author-response.model";

@Injectable({
    providedIn: 'root'
})

export class SearchService {
    constructor(private apiService: ApiService) {}
    getSearchedBooks(subjectName: string,offset: number,limit: number): Observable<SearchResponse>{

        return this.apiService.get(`/search.json?q=${subjectName.toLowerCase().split(' ').join('_')}&limit=${limit}&offset=${offset}`);
    }

    getSearchAuthors(authorName: string,offset: number,limit: number): Observable<AuthorResponse>{

        return this.apiService.get(`/search/authors.json?q=${authorName.toLowerCase().split(' ').join('_')}&limit=${limit}&offset=${offset}`);
    }
}
