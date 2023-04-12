import {
    AfterViewInit,

    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import {Doc} from "../../core/models/search-response.model";
import {SearchDataSource} from "./search-data-source";
import {SearchService} from "../../core/services/search.service";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'front-end-internship-assignment-search',
    templateUrl: './searchtable.component.html',
    styleUrls: ['./searchtable.component.scss'],
    animations: [
        trigger('transitionMessages', [
            transition(':enter', [
                style({opacity: 0}),
                animate('0.3s ease-in-out', style({opacity: 1})),
            ]),
            transition(':leave', [
                animate('0.3s ease-in-out', style({opacity: 0})),
            ]),
        ]),
    ],

})
export class SearchTableComponent implements AfterViewInit, OnInit, OnChanges {
    @Input() subjectName = "";
    @ViewChild(MatPaginator) paginator = {} as MatPaginator;


    displayedColumns = ["title", "author", "year"];
    dataSource = new SearchDataSource(this.searchService);

    constructor(private searchService: SearchService, private route: ActivatedRoute) {
        console.log("constructor");
        this.dataSource = new SearchDataSource(this.searchService);
        this.dataSource.getSearchedBooks(this.subjectName, 0, 10);
    }

    onRowClick(row: Doc) {
       const url="https://openlibrary.org"+row.key;
       window.open(url, "_blank");
    }

    ngOnInit() {
        console.log(this.subjectName);
        console.log("onInit");
        this.dataSource = new SearchDataSource(this.searchService);
        this.dataSource.getSearchedBooks(this.subjectName, 0, 10);


    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["subjectName"]) {

            this.dataSource.getSearchedBooks(this.subjectName, 0, 10);
        }

    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        this.paginator.page
            .pipe(
                tap(() => this.loadData()),
            )
            .subscribe();
    }

    loadData() {
        console.log(this.paginator.pageIndex);
        console.log(this.paginator.pageSize);
        const offset = (this.paginator.pageIndex) * this.paginator.pageSize + 1;
        this.dataSource.getSearchedBooks(this.subjectName, offset, this.paginator.pageSize);
    }


}
