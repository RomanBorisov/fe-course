import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../form/text-input/text-input.component';
import { ColorInputComponent } from '../form/color-input/color-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { TodoService } from '../../services/todo.service';
import { finalize } from 'rxjs';
import { ITodoItem } from '../../interfaces/todo-item.interface';

@Component({
    selector: 'app-todo-item-form',
    imports: [
        ReactiveFormsModule,
        TextInputComponent,
        ColorInputComponent,
        MatIconModule,
        MatFabButton
    ],
    templateUrl: './todo-item-form.component.html',
    styleUrl: './todo-item-form.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'create-todo-form'
    }
})
export class TodoItemFormComponent implements OnInit {
    @Input() public todoItem: ITodoItem | null = null;

    @Output() public readonly created: EventEmitter<ITodoItem> = new EventEmitter<ITodoItem>();

    @Output() public readonly edited: EventEmitter<ITodoItem> = new EventEmitter<ITodoItem>();

    public form!: FormGroup<{
        title: FormControl<string>;
        color: FormControl<string>;
    }>;

    public loading: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _todoService: TodoService
    ) {
    }

    public ngOnInit() {
        this.form = this._formBuilder.nonNullable.group({
            title: ['', Validators.required],
            color: ['', Validators.required],
        });

        if (this.todoItem) {
            this.form.patchValue({
                title: this.todoItem.title,
                color: this.todoItem.color
            });
        }
    }

    public submit(): void {
        if (this.todoItem) {
            this._updateTodo();
            return;
        }

        this._createTodo();
    }

    private _createTodo(): void {
        this.loading = true;

        const body = {
            ...this.form.getRawValue(),
            completed: false
        };

        this._todoService.addTodo(body).pipe(
            finalize(() => {
                this.loading = false;
                this.form.reset();
            })
        ).subscribe((todo) => {
            this.created.emit(todo);
        });
    }

    private _updateTodo(): void {
        this.loading = true;

        const body: ITodoItem = {
            ...this.todoItem!,
            ...this.form.getRawValue(),
        };

        this._todoService.updateTodoById(body).pipe(
            finalize(() => {
                this.loading = false;
                this.form.reset();
            })
        ).subscribe((todo) => {
            this.edited.emit(todo);
        });
    }

}
