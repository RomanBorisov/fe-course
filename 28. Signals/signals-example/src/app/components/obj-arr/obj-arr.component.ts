import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-obj-arr',
    template: `
        -- ObjArrComponent --
        
        <h3>List value: {{ list() }}</h3>

        <h3>Object title: {{ object().title }}</h3>
        ----------------------

    `
})
export class ObjArrComponent {
    public list = signal([
        'Hello',
        'World'
    ]);

    public object = signal({
        id: 1,
        title: 'Angular For Beginners'
    });

    constructor() {
        this.list().push('Again');
        this.object().title = 'overwriting title';
    }

}
