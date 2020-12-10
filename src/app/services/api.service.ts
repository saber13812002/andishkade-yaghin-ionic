import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ENVService } from './env.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    public ENV: ENVService,
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      console.log(error);
      if (error.status == 401) {
        console.log(error);
        return throwError(
          { 'code': 401 }
        );
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Get login user by token
  me(token): Observable<User> {
    let httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // TODO: test when token is invalid
        'authorization': 'Bearer ' + token
      })
    }

    return this.http
      .get<User>(this.ENV.me(), httpOptionsWithToken)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  // Login
  login(credential): Observable<User> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.http
      .post<User>(this.ENV.login(), JSON.stringify(credential), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // singup
  signUp(credential): Observable<User> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.http
      .post<User>(this.ENV.signup(), JSON.stringify(credential), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  // Create a new item
  createItem(item): Observable<Student> {
    return this.http
      .post<Student>(this.ENV.login(), JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single student data by ID
  getItem(id): Observable<Student> {
    return this.http
      .get<Student>(this.ENV.login() + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get students data
  getList(): Observable<Student> {
    return this.http
      .get<Student>(this.ENV.login())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id, item): Observable<Student> {
    return this.http
      .put<Student>(this.ENV.login() + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Student>(this.ENV.login() + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
