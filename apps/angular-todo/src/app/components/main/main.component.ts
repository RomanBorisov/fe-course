import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { TodoItemFormComponent } from '../todo-item-form/todo-item-form.component';
import { TodoService } from '../../services/todo.service';
import { ITodoItem } from '../../interfaces/todo-item.interface';

@Component({
    selector: 'app-main',
    imports: [
        TodoListComponent,
        TodoItemFormComponent
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
    public todoList: ITodoItem[] = [];

    constructor(
        private _todoService: TodoService
    ) {
    }

    public ngOnInit(): void {
        this._todoService.getTodos().subscribe((todos) => {
            this.todoList = [...todos];
        });
    }

    public addTodoItem(todo: ITodoItem): void {
        this.todoList = [...this.todoList, todo];
    }
}
