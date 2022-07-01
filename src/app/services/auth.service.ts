import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  access_token: any;
  basePath = 'http://test-demo.aemenersol.com/api/';

  constructor(
    private router: Router,
    private http: HttpClient,


  ) { }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Please try again. Wrong Credential.');
  }

  loginForm(data: any): Observable<any> {
    return this.http
      .post<this>(this.basePath + 'account/login', data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  setUser(resp: any) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resp}`
    })
    localStorage.setItem('access_token', resp);
    this.router.navigate(['dashboard']);
  }
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }
  logout() {
    localStorage.clear();

    this.router.navigate(['/auth/login']);
  }

  getServerList(): Observable<any> {
    const token = localStorage.getItem("access_token");
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.basePath + `dashboard`, { headers: reqHeader });
  }

}