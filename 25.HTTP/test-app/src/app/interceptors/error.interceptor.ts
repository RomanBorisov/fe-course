import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastNotificationService } from '../services/toast.notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private _toastNotificationService: ToastNotificationService
    ) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    this._toastNotificationService.showError(error.message);
                }
                // Пробрасываем ошибку дальше
                return throwError(() => error);
            })
        );
    }
}
