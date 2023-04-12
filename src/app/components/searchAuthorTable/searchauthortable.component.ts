import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatPaginator} from "@angular/material/paginator";
import {SearchDataSource} from "../searchBookTable/search-data-source";
import {SearchAuthorDataSource} from "./search-author-data-source";
import {SearchService} from "../../core/services/search.service";
import {ActivatedRoute} from "@angular/router";
import {Doc} from "../../core/models/search-response.model";
import {tap} from "rxjs";


@Component(
    {
        selector: 'front-end-internship-assignment-search-author',
        templateUrl: './searchauthortable.component.html',
        styleUrls: ['./searchauthortable.component.scss'],
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
    }
)
export class SearchAuthorTableComponent implements AfterViewInit, OnInit, OnChanges {
    @Input() subjectName = "";
    @ViewChild(MatPaginator) paginator = {} as MatPaginator;
    displayedColumns = ["author", "top", "work"];
    dataSource = new SearchAuthorDataSource(this.searchService);
    constructor(private searchService: SearchService, private route: ActivatedRoute) {
        console.log("constructor");
        this.dataSource = new SearchAuthorDataSource(this.searchService);
        this.dataSource.getSearchAuthors(this.subjectName, 0, 10);
    }
    onRowClick(row: Doc) {
        const url="https://openlibrary.org/author/"+row.key;
        window.open(url, "_blank");
    }
    ngOnInit() {
        console.log(this.subjectName);
        console.log("onInit");
        this.dataSource = new SearchAuthorDataSource(this.searchService);
        this.dataSource.getSearchAuthors(this.subjectName, 0, 10);
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes["subjectName"]) {

            this.dataSource.getSearchAuthors(this.subjectName, 0, 10);
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
        this.dataSource.getSearchAuthors(this.subjectName, offset, this.paginator.pageSize);
    }

}
