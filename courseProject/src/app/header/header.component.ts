import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    constructor(public dataStorage: DataStorageService, private authService: AuthService) { }

    ngOnInit(): void {
        let currentUserSubscription = this.authService.user.subscribe(usr => this.currentUser = usr);
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe()
    }
}