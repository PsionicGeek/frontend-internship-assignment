import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpRequestOptions } from '../models/http-request-options.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const ROOT_URL = 'https://openlibrary.org';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cache = new Map<string, Observable<any>>();

  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    const cachedResponse = this.cache.get(apiPath);
    if (cachedResponse) {
      return cachedResponse as Observable<T>;
    }
    const response = this.httpClient.get<T>(apiPath, config).pipe(
        tap((data) => {
          this.cache.set(apiPath, of(data));
        })
    );
    this.cache.set(apiPath, response);
    return response;
  }

  post<T>(url: string, body: Record<string, any> = {}, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.post<T>(apiPath, body, config);
  }

  delete<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.delete<T>(apiPath, config);
  }
}
