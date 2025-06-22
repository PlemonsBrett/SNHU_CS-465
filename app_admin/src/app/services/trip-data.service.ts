import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private readonly apiUrl = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private readonly http: HttpClient,
    @Inject(BROWSER_STORAGE) private readonly storage: Storage
  ) { }

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
    console.log('TripDataService::addTrip - URL:', this.apiUrl);
    return this.http.post<Trip>(this.apiUrl, trip)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT: Update existing trip
  updateTrip(trip: Trip): Observable<Trip> {
    const url = `${this.apiUrl}/${trip.code}`;
    console.log('TripDataService::updateTrip - URL:', url);
    return this.http.put<Trip>(url, trip)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE: Remove trip
  deleteTrip(tripCode: string): Observable<Trip> {
    const url = `${this.apiUrl}/${tripCode}`;
    console.log('TripDataService::deleteTrip - URL:', url);
    return this.http.delete<Trip>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
    console.log('TripDataService::handleAuthAPICall - Endpoint:', endpoint);
    console.log('TripDataService::handleAuthAPICall - User:', user);

    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    console.log('TripDataService::handleAuthAPICall - Form data:', formData);
    console.log('TripDataService::handleAuthAPICall - URL:', this.baseUrl + '/' + endpoint);

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData)
      .pipe(
        tap((response) => {
          console.log('TripDataService::handleAuthAPICall - Raw response:', response);
          console.log('TripDataService::handleAuthAPICall - Response type:', typeof response);
          console.log('TripDataService::handleAuthAPICall - Response token:', response?.token);
        }),
        catchError((error) => {
          console.error('TripDataService::handleAuthAPICall - Error:', error);

          // Handle specific authentication error cases
          if (error.status === 401) {
            console.error('TripDataService::handleAuthAPICall - Unauthorized: Invalid credentials');
            return throwError(() => new Error('Invalid email or password'));
          }

          if (error.status === 403) {
            console.error('TripDataService::handleAuthAPICall - Forbidden: Access denied');
            return throwError(() => new Error('Access denied'));
          }

          if (error.status === 404) {
            console.error('TripDataService::handleAuthAPICall - Not Found: User not found');
            return throwError(() => new Error('User not found'));
          }

          // Handle validation errors
          if (error.status === 400) {
            console.error('TripDataService::handleAuthAPICall - Bad Request:', error.error);
            return throwError(() => new Error(error.error.message ?? 'Invalid request'));
          }

          // Generic error handler
          return throwError(() => new Error('Authentication failed. Please try again later.'));
        })
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
