import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getCustomer(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postCustomer(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCustomerI(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateCustomer(id,data): Observable<any> {
    return this.http.put(apiUrl+'/'+id, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postAddress(data,id): Observable<any> {
    return this.http.post(apiUrl+`/address/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAddress(id): Observable<any>{
    return this.http.get(`${apiUrl}/address/${id}`,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateAddress(id,data): Observable<any>{
    return this.http.put(`${apiUrl}/address/${id}`,data,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAddress(id): Observable<any>{
    return this.http.delete(`${apiUrl}/address/${id}`,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
}
