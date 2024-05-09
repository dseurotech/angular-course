import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../data-storage.service";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.selectors';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    constructor(
        public dataStorage: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        let currentUserSubscription =this.store.select(fromAuth.currentUser).subscribe(usr => this.currentUser = usr);
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe()
    }
}