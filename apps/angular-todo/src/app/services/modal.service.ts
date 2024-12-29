import { Injectable, Injector, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    constructor(
        private _dialog: MatDialog,
    ) {
    }

    public open<T, D = any, R = any>(component: ComponentType<T> | TemplateRef<T>, config?: Partial<IModalConfig<D>>, injector?: Injector): MatDialogRef<T, R> {
        const defaultConfig: IModalConfig<D> = {
            hasCloseButton: true,
            hasCancelButton: true,
            hasSubmitButton: true,
            hasFooter: true,
            cancelBtnText: 'Cancel',
            submitBtnText: 'Submit',
            header: null,
            description: null,
            data: null as any,
        };

        return this._dialog.open(component, {
            minWidth: '800px',
            disableClose: true,
            data: {
                ...defaultConfig,
                ...config,
            },
            injector
        });
    }
}

export interface IModalConfig<T> {
    hasCloseButton: boolean;
    hasFooter: boolean;
    hasCancelButton: boolean;
    hasSubmitButton: boolean;
    cancelBtnText: string;
    submitBtnText: string;

    header: string | null;
    description: string | null;
    data: T;

    cancelFn?: () => void;
    submitFn?: () => void;
}
