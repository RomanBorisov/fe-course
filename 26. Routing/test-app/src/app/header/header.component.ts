import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    host: {
        class: 'header'
    },
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

}
