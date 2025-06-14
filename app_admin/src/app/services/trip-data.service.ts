import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiUrl = 'http://localhost:3000/api/trips';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // GET: Retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET: Retrieve a single trip by code
  getTrip(tripCode: string): Observable<Trip> {
    const url = `${this.apiUrl}/${tripCode}`;

    return this.http.get<Trip>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST: Add new trip
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT: Update existing trip
  updateTrip(trip: Trip): Observable<Trip> {
    const url = `${this.apiUrl}/${trip.code}`;
    return this.http.put<Trip>(url, trip, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE: Remove trip
  deleteTrip(tripCode: string): Observable<Trip> {
    const url = `${this.apiUrl}/${tripCode}`;
    return this.http.delete<Trip>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}