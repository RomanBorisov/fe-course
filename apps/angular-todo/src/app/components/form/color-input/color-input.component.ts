import { Component, forwardRef, inject, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlName, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, } from '@angular/forms';
import { NgxColorsModule } from 'ngx-colors';

@Component({
    selector: 'app-color-input',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        NgxColorsModule,
        FormsModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorInputComponent),
            multi: true
        },
    ],
    templateUrl: './color-input.component.html',
    styleUrl: './color-input.component.scss',
    host: {
        class: 'color-input'
    },
    encapsulation: ViewEncapsulation.None
})
export class ColorInputComponent implements ControlValueAccessor, OnInit {
    @Input() public label: string = 'color';

    public value = '';

    public disabled = false;

    public touched = false;

    public control!: FormControl;

    private _injector: Injector = inject(Injector);

    public ngOnInit(): void {
        const ngControl: NgControl | null = this._injector.get(NgControl, null, { self: true, optional: true });

        if (ngControl instanceof FormControlName) {
            const container = this._injector.get(ControlContainer).control as FormGroup;
            this.control = container.controls[ngControl.name!] as FormControl;
            return;
        } else {
            this.control = new FormControl();
        }
    }

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public handleInputChange(event: any): void {
        const value = event.target.value;
        this.value = value;
        this.onChange(value);
        this.onTouched();
        this.markAsTouched();
    }

    public handleColorChange(color: string): void {
        const value = color;
        this.value = value;
        this.onChange(value);
        this.onTouched();
        this.markAsTouched();
    }

    public markAsTouched(): void {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    protected onChange: any = () => {
        //
    };

    protected onTouched: any = () => {
        //
    };
}
