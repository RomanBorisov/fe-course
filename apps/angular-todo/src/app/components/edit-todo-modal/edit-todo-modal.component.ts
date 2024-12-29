import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { TodoItemFormComponent } from '../todo-item-form/todo-item-form.component';
import { ITodoItem } from '../../interfaces/todo-item.interface';
import { IModalConfig } from '../../services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-todo-modal',
    imports: [
        ModalComponent,
        TodoItemFormComponent
    ],
    templateUrl: './edit-todo-modal.component.html',
    styleUrl: './edit-todo-modal.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class EditTodoModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public modalConfig: IModalConfig<IEditTodoModalData>,
    ) {
    }

    public updateTodoItem(todoItem: ITodoItem): void {
        this.modalConfig.data.afterFn(todoItem);
    }

}

export interface IEditTodoModalData {
    todoItem: ITodoItem;

    afterFn: (todoItem: ITodoItem) => void;
}
