import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Doc} from "../../core/models/search-response.model";
import {async, BehaviorSubject, Observable} from "rxjs";
import {SearchService} from "../../core/services/search.service";


export class SearchDataSource implements DataSource<Doc> {

     searchResults=new BehaviorSubject<Doc[]>([]);
     resultsFound= new BehaviorSubject<number>(0);
    private loadingResults = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingResults.asObservable();
    constructor(private searchService: SearchService) {}
    connect(collectionViewer: CollectionViewer): Observable<Doc[]> {
        return this.searchResults.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.searchResults.complete();
        this.loadingResults.complete();
    }

    getSearchedBooks(subjectName: string,offset: number,limit: number) {

        console.log(subjectName);
        this.loadingResults.next(true);
        this.searchService.getSearchedBooks(subjectName,offset,limit).subscribe({
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
