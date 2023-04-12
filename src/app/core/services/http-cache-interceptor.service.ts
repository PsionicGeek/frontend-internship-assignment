import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

    private cache = new Map();

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if the request is cachable
        if (req.method !== 'GET') {

            return next.handle(req);
        }

        // Check if the response is already cached
        const cachedResponse = this.cache.get(req.url);
        if (cachedResponse) {
            return of(cachedResponse);
        }

        // Send the request and cache the response
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(req.url, event);
                }
            })
        );
    }
}
