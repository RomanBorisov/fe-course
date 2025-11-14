import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-obj-arr',
    template: `
        <div style="text-align:center">
            ---------------------- <br>
            <h1>ObjArrComponent</h1>

            <h3>List value: {{ list() }}</h3>

            <h3>Object title: {{ object().title }}</h3>
            ----------------------
        </div>
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
        // this.list.update((v) => [...v, 'Again']);
        this.object().title = 'overwriting title';
    }

}
