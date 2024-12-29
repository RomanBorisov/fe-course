import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { ITodoItem } from '../../../interfaces/todo-item.interface';
import { ModalService } from '../../../services/modal.service';
import { EditTodoModalComponent, IEditTodoModalData } from '../../edit-todo-modal/edit-todo-modal.component';
import { MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'app-todo-item',
    imports: [
        MatDialogClose,
        MatIcon,
        MatMiniFabButton
    ],
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    host: {
        class: 'todo-item row'
    }
})
export class TodoItemComponent {
    @Input({ required: true }) public item!: ITodoItem;

    @Output() public readonly updated = new EventEmitter<ITodoItem>();

    @Output() public readonly delete = new EventEmitter<void>();

    @Output() public readonly toggled = new EventEmitter<void>();

    @HostBinding('class.todo-item--completed')
    public get completed() {
        return this.item.completed;
    }

    @HostBinding('style.backgroundColor')
    public get backgroundColor() {
        return this.item.color;
    }

    constructor(
        private _modalService: ModalService
    ) {
    }

    public onEdit() {
        const modal = this._modalService.open<EditTodoModalComponent, IEditTodoModalData>(EditTodoModalComponent, {
            header: `Update todo #${this.item.id}`,
            hasFooter: false,
            data: {
                todoItem: this.item,
                afterFn: (todoItem) => {
                    this.updated.emit(todoItem);
                    modal.close();
                }
            },
        });
        console.log('Edit item', this.item);
    }

    public onDelete() {
        console.log('Delete item', this.item);

        this.delete.emit();

    }

    public onToggle() {
        console.log('Toggle item', this.item);

        this.toggled.emit();
    }
}
