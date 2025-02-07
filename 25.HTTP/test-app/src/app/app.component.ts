import { Component } from '@angular/core';
import { IUser } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    public users: IUser[] = [];

    public constructor(
        private _userService: UserService
    ) {
    }

    public ngOnInit() {
        this._userService.getUsers().subscribe((users) => {
            this.users = users;
            console.log(users)
        });


        this._userService.updateUser({
            id: 1,
            name: 'Roman Borisov',
        }).subscribe((user) => {
            console.log('updated', user);
        });
    }
}
