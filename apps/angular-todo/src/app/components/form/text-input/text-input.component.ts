import { Component, forwardRef, inject, Injector, Input, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        },
    ],
    templateUrl: './text-input.component.html',
    styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
    @Input() public label!: string;

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
