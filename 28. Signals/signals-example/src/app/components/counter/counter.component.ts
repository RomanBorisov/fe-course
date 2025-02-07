import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-counter',
    template: `
        <div style="text-align:center">
            <h1>Angular Signal Example</h1>
            <p>Count: {{ count() }}</p>
            <button (click)="increment()">Increment</button>
            <button (click)="decrement()">Decrement</button>
        </div>
    `,
})
export class CounterComponent {
    public count = signal(0);

    public increment() {
        this.count.set(this.count() + 1);
    }

    public decrement() {
        this.count.set(this.count() - 1);
    }
}
