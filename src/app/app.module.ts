import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrendingSubjectsComponent } from '../app/components/trending-subjects/trending-subjects.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SearchTableComponent} from "./components/searchBookTable/searchtable.component";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SearchAuthorTableComponent} from "./components/searchAuthorTable/searchauthortable.component";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [AppComponent, TrendingSubjectsComponent, HomeComponent, SidebarComponent,SearchTableComponent,SearchAuthorTableComponent],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatInputModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
