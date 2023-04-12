import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import {Book, BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private apiService: ApiService) {}

  getAllBooks(subjectName: string): Observable<BookResponse> {
    console.log(subjectName+' '+subjectName.toLowerCase().split(' ').join('_'));
    const limit = 10;
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}`);
  }

}
