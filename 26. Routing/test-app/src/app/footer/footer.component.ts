import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    host: {
        class: 'footer'
    },
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent {

}
