import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, filter} from 'rxjs';
import {SearchService} from "../../core/services/search.service";
import {Doc} from "../../core/models/search-response.model";

@Component({
    selector: 'front-end-internship-assignment-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
    bookSearch: FormControl;
    subHeading="Search for books";
    isNotVisible=false;
    authorSearch=false;

    trendingSubjects: Array<any> = [
        {name: 'JavaScript'},
        {name: 'CSS'},
        {name: 'HTML'},
        {name: 'Harry Potter'},
        {name: 'Crypto'},
    ];
    searchText="";
    constructor(  private searchService: SearchService,private cdr: ChangeDetectorRef) {
        this.bookSearch = new FormControl('');
        this.bookSearch.valueChanges
            .pipe(
                debounceTime(500),
            ).subscribe((value: string) => {
                console.log(value.length);
                console.log(value);
            if(value.length>=1){

                console.log("in if");
                this.isNotVisible=true;
                this.searchText=value;
                console.log(this.searchText+"in home");
                this.subHeading="Search results for "+value;
               // this.getAllBooks();

            }
            else{
                this.isNotVisible=false;
                this.subHeading="Search for books";

            }
            this.cdr.detectChanges();

        });

    }
    clearSearch() {
        this.isNotVisible=false;
       this.bookSearch.setValue('');
        this.searchText = '';

    }
    changeSearch(){
        this.authorSearch=!this.authorSearch;
        if (!this.authorSearch) {

        }
        else{
            console.log("author search");
        }
    }


}
