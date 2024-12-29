import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'header'
    }
})
export class HeaderComponent {

}
