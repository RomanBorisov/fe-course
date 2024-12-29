import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseRaw } from '../interfaces/rest';

type GET_PARAMS = Record<string, string | number | boolean | readonly (string | number | boolean)[]>;

export const API_URL = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root'
})
export class RestService {
    private _restOptionsDefault: RestOptions = {
        // add custom options here
    };

    constructor(
        private _http: HttpClient,
    ) {
    }

    public restGET<T = ResponseRaw>(endpoint: string, params: GET_PARAMS = {}, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('GET', endpoint, {
            ...options,
            params: new HttpParams({
                fromObject: params
            })
        });
    }

    public restPOST<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('POST', endpoint, {
            ...options,
            body
        });
    }

    public restPUT<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('PUT', endpoint, {
            ...options,
            body
        });
    }

    public restDELETE<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('DELETE', endpoint, {
            ...options,
            body
        });
    }

    public request<T>(method: string, endpoint: string, options: RestOptions = this._restOptionsDefault): Observable<T> {
        const context = new HttpContext();

        const httpOptions: HttpOptions = {
            ...options,
            context,
        };

        return this._http.request(method, API_URL + endpoint, httpOptions);
    }
}

export type RestOptions = HttpOptions;

interface HttpOptions {
    body?: any;
    headers?: HttpHeaders | Record<string, string | string[]>;
    context?: HttpContext;
    observe?: 'body' | 'response' | 'events';
    params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
    responseType?: 'json' | 'blob' | 'text';
    reportProgress?: boolean;
    withCredentials?: boolean;
}
