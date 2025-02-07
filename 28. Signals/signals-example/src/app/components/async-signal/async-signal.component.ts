import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-async-signal',
    template: `
        <div style="text-align:center">
            <h1>Async Signal Example</h1>
            <div *ngIf="loading()">Loading...</div>
            <div *ngIf="error()">Error: {{ error() }}</div>
            <div *ngIf="data()">
                <pre>{{ data() | json }}</pre>
            </div>
            <button (click)="loadData()">Load Data</button>
        </div>
    `,
    imports: [
        NgIf,
        JsonPipe
    ]
})
export class AsyncSignalComponent {
    public data = signal(null);

    public loading = signal(false);

    public error = signal(null);

    public loadData() {
        this.loading.set(true);
        this.error.set(null);

        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => {
                this.data.set(data);
                this.loading.set(false);
            })
            .catch(error => {
                this.error.set(error);
                this.loading.set(false);
            });
    }
}
