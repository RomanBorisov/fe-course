import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    constructor(
        private _activatedRoute: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this._activatedRoute.data.subscribe(() => {
            console.log(this._activatedRoute);
        })
    }
}
