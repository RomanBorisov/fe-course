import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [
        RouterOutlet
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log('Navigation Start');
            }

            if (event instanceof NavigationEnd) {
                console.log('Navigation End');
            }
        });
    }
}


