import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IModalConfig } from '../../services/modal.service';

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatIcon,
        MatButton,
        MatDialogClose,
        MatDialogActions,
        MatMiniFabButton,
    ],
    host: {
        class: 'modal'
    }
})
export class ModalComponent implements OnInit {
    @Input() public disableSubmit: boolean = false;

    @Input() public disableCancel: boolean = false;

    @Output() public readonly submitted: EventEmitter<void> = new EventEmitter<void>();

    public header: string | null = null;

    public description: string | null = null;

    public hasCancelButton: boolean = true;

    public hasFooter: boolean = false;

    public hasCloseButton: boolean = true;

    public cancelBtnText: string = 'Cancel';

    public hasSubmitButton: boolean = true;

    public submitBtnText: string = 'Submit';

    constructor(
        @Inject(DIALOG_DATA) public dialogData: IModalConfig<any>,
        private _dialogRef: DialogRef,
    ) {

    }

    public ngOnInit() {
        this.header = this.dialogData.header;
        this.description = this.dialogData.description;
        this.hasCancelButton = this.dialogData.hasCancelButton;
        this.cancelBtnText = this.dialogData.cancelBtnText;
        this.hasSubmitButton = this.dialogData.hasSubmitButton;
        this.submitBtnText = this.dialogData.submitBtnText;
        this.hasCloseButton = this.dialogData.hasCloseButton;
        this.hasFooter = this.dialogData.hasFooter;
    }

    public submit() {
        if (this.dialogData.submitFn) {
            this.dialogData.submitFn();
            return;
        }
        this.submitted.emit();
    }

    public cancel() {
        if (this.dialogData.cancelFn) {
            this.dialogData.cancelFn();
            return;
        }

        this._dialogRef.close();
    }
}
