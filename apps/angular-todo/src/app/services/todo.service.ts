import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { ITodoItem } from '../interfaces/todo-item.interface';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    public get api() {
        return 'todos';
    }

    constructor(
        private _resService: RestService
    ) {
    }

    // GET todos
    public getTodos(): Observable<ITodoItem[]> {
        return this._resService.restGET('todos');
    }

    // POST todos
    public addTodo(todo: Omit<ITodoItem, 'id'>): Observable<ITodoItem> {
        return this._resService.restPOST('todos', todo);
    }

    // DELETE todos/:id
    public removeTodoById(id: number): Observable<ITodoItem> {
        const url = `todos/${id}`;

        return this._resService.restDELETE(url);
    }

    // PUT todos/:id
    public updateTodoById(todo: ITodoItem): Observable<ITodoItem> {
        const url = `todos/${todo.id}`;
        return this._resService.restPUT(url, todo);
    }

    // POST todos/toggle/:id
    public toggleTodoById(id: number): Observable<ITodoItem> {
        const url = `todos/toggle/${id}`;

        return this._resService.restPOST(url, {});
    }
}
