import {Component} from '@angular/core';
import {navbarData} from "./nav-data";

@Component({
    selector: 'front-end-internship-assignment-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    sidebarData = navbarData;

}
