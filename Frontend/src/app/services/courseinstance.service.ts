import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseInstance } from '../models/CourseInstance';

@Injectable({
  providedIn: 'root'
})
export class CourseinstanceService {
  private url = 'https://localhost:44323/api/courseinstance';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CourseInstance[]> {
    return this.httpClient.get<CourseInstance[]>(this.url);
  }

  add(course: CourseInstance[]): Observable<Object> {
    return this.httpClient.post<CourseInstance[]>(this.url, course);
  } 
}
