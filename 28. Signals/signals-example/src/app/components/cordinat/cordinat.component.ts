import { Component, computed, signal } from '@angular/core';

@Component({
    selector: 'app-cord',
    template: `
        <div style="text-align:center">
            <h1>Reactive Signal Example</h1>
            
            <p>X: {{ x() }}, Y: {{ y() }}</p>
            <p>Distance from origin: {{ distance() }}</p>
            
            <button (click)="moveRight()">Move Right</button>
            <button (click)="moveUp()">Move Up</button>
        </div>
    `,
})
export class CordinatComponent {
    public x = signal(0);

    public y = signal(0);

    public distance = computed(() => Math.sqrt(this.x() ** 2 + this.y() ** 2));

    public moveRight() {
        this.x.set(this.x() + 1);
    }

    public moveUp() {
        this.y.set(this.y() + 1);
    }
}
