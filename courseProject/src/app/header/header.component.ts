import { Component } from "@angular/core";
import { DataStorageService } from "../data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(public dataStorage: DataStorageService) { }
}