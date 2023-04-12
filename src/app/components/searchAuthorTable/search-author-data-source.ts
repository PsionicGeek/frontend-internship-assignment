import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";
import {SearchService} from "../../core/services/search.service";
import {Author} from "../../core/models/book-response.model";

export class SearchAuthorDataSource implements DataSource<Author>{
    searchResults=new BehaviorSubject<Author[]>([]);
    resultsFound= new BehaviorSubject<number>(0);
    private loadingResults = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingResults.asObservable();
    constructor(private searchService: SearchService) {}
    connect(collectionViewer: CollectionViewer): Observable<Author[]> {
        return this.searchResults.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.searchResults.complete();
        this.loadingResults.complete();
    }

    getSearchAuthors(authorName: string,offset: number,limit: number) {

            console.log(authorName);
            this.loadingResults.next(true);
            this.searchService.getSearchAuthors(authorName,offset,limit).subscribe({
                next:(response) => {
                    console.log(response);
                    this.searchResults.next(response.docs);
                    this.resultsFound.next(response.numFound);
                    this.loadingResults.next(false);
                    console.log("in next");
                },
                error: (error) => {
                    console.log(error);
                    this.loadingResults.next(false);
                }}
            );
    }

}
