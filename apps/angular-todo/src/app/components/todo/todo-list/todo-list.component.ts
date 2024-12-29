import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ITodoItem } from '../../../interfaces/todo-item.interface';
import { TodoService } from '../../../services/todo.service';

@Component({
    selector: 'app-todo-list',
    imports: [
        TodoItemComponent
    ],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    host: {
        class: 'todo-list'
    }
})
export class TodoListComponent {
    @Input({ required: true }) public todoList: ITodoItem[] = [];

    @Output() public readonly deleted = new EventEmitter<number>();

    @Output() public readonly toggled = new EventEmitter<number>();

    constructor(
        private _todoService: TodoService
    ) {
    }

    public deleteItemById(id: number) {
        this._todoService.removeTodoById(id).subscribe(() => {
            this.todoList = this.todoList.filter((item: ITodoItem) => item.id !== id);
        });

    }

    public toggleItemById(id: number) {
        this._todoService.toggleTodoById(id).subscribe(() => {
            this.todoList = this.todoList.map((item: ITodoItem) => {
                if (item.id === id) {
                    item.completed = !item.completed;
                }

                return item;
            });
        });
    }

    public updateItem(updatedItem: ITodoItem) {
        this.todoList = this.todoList.map((item: ITodoItem) => {
            if (item.id === updatedItem.id) {
                return updatedItem;
            }

            return item;
        });
    }
}
