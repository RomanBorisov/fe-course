import { computed, effect, Injectable, signal } from '@angular/core';

export const CURRENT_USER_STORAGE_KEY = 'currentUser';

@Injectable({
    providedIn: 'root'
})
export class AuthState {
    private _currentUser = signal<ICurrentUser | null>(null);

    get currentUser() {
        return this._currentUser();
    }

    constructor() {
        effect(() => {
            const user = this._currentUser();

            if (user) {
                localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
            }
        })
    }

    public logout() {
        this._currentUser.set(null);
    }

    public login(user: ICurrentUser) {
        this._currentUser.set(user);
    }

}

export interface ICurrentUser {
    id: number;
    username: string;
    email: string;
    role: string;
    token: string;
}
