import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, toUser } from '../interfaces/user';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public constructor(
        private _http: HttpClient,
    ) {
    }

    // GET /users
    public getUsers(): Observable<IUser[]> {
        return this._http.get('https://jsonplaceholder.typicode.com/users').pipe(
            map((data: any) => data.map(toUser))
        );
    }

    // GET /users/:id
    public updateUser(user: Partial<IUser>): Observable<IUser> {
        return this._http.post(`https://jsonplaceholder.typicode.com/users/${user.id}`, user).pipe(
            map(toUser)
        );
    }
}
