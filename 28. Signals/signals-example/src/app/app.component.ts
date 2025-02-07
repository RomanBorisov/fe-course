import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { CordinatComponent } from './components/cordinat/cordinat.component';
import { ObjArrComponent } from './components/obj-arr/obj-arr.component';
import { AsyncSignalComponent } from './components/async-signal/async-signal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CounterComponent, CordinatComponent, ObjArrComponent, AsyncSignalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signals-example';
}
