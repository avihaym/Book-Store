import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json; charset=UTF-8'})
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    return this.http.get<any>(`${environment.serverUrl}/books`, httpOptions)
    .pipe(
      catchError((err) => of({status: "error", msg: "Server Error, please try again."}))
    );
  }

  create(formData: object): Observable<any>{
    return this.http.post<any>(`${environment.serverUrl}/books`, formData, httpOptions)
      .pipe(
        catchError(err => of({status: "error", msg: "Server Error, please try again."}))
      );
  }

  delete(id: string): Observable<any>{
    return this.http.delete<any>(`${environment.serverUrl}/books/${id}`, httpOptions)
      .pipe(
        catchError(err => of({status: "error", msg: "Server Error, please try again."}))
      );
  }

}
