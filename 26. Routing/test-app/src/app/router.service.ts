import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

export enum AppRoutes {
    HOME = 'home',
    LOGIN = 'login',
    CONTACT = 'contact',
}

export enum HomeRoutes {
    PROFILE = 'profile',
    DIRECTOR = 'director',
}

export const toApp = ['/'];
export const toHome = [...toApp, AppRoutes.HOME];

export const appRoutes = {
    index: toApp,
    home: {
        index: toHome,
        profile: [...toHome, HomeRoutes.PROFILE],
        director: [...toHome, HomeRoutes.DIRECTOR],
    },
    login: [...toApp, AppRoutes.LOGIN],
}

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    constructor(
        private _router: Router
    ) {

    }

    public toProfile(profileId: number, params?: NavigationExtras): Promise<boolean> {
        return this._router.navigate([...appRoutes.home.profile, profileId], params);
    }

}
