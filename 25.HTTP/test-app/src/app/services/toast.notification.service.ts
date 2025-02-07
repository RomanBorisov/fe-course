import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastNotificationService {
    public showSuccess(message: string): void {
        console.log('success', message);
    }

    public showError(message: string): void {
        console.error('error', message);
    }
}
