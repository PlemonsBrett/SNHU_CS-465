import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  // Setup our storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private readonly storage: Storage,
    private readonly tripDataService: TripDataService
  ) { }

  // Get our token from our Storage provider.
  // NOTE: For this application we have decided that we will name
  // the key for our token 'travlr-token'
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');
    console.log('AuthenticationService::getToken - Retrieved from storage:', out ? 'Token present' : 'No token');
    // Make sure we return a string even if we don't have a token
    if(!out) {
      return '';
    }
    return out;
  }

  // Save our token to our Storage provider.
  // NOTE: For this application we have decided that we will name
  // the key for our token 'travlr-token'
  public saveToken(token: string): void {
    console.log('AuthenticationService::saveToken - Saving token to storage:', token ? 'Token present' : 'No token');
    this.storage.setItem('travlr-token', token);
    console.log('AuthenticationService::saveToken - Token saved, verifying...');
    const savedToken = this.storage.getItem('travlr-token');
    console.log('AuthenticationService::saveToken - Verification - token in storage:', savedToken ? 'Present' : 'Not present');
  }

  // Logout of our application and remove the JWT from Storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Boolean to determine if we are logged in and the token is
  // still valid. Even if we have a token we will still have to
  // reauthenticate if the token has expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    console.log('AuthenticationService::isLoggedIn - Token:', token ? 'Present' : 'Not present');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isValid = payload.exp > (Date.now() / 1000);
        console.log('AuthenticationService::isLoggedIn - Token valid:', isValid, 'Expires:', new Date(payload.exp * 1000));
        return isValid;
      } catch (error) {
        console.error('AuthenticationService::isLoggedIn - Error parsing token:', error);
        return false;
      }
    } else {
      return false;
    }
  }

  // Retrieve the current user. This function should only be called
  // after the calling method has checked to make sure that the user
  // isLoggedIn.
  public getCurrentUser(): User {
    if (!this.isLoggedIn()) {
      throw new Error('User is not logged in');
    }

    try {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    } catch (error) {
      console.error('Error parsing user from token:', error);
      throw new Error('Invalid token format');
    }
  }
  // Login method that leverages the login method in tripDataService
  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging
  // information.
  public login(user: User, passwd: string) : Observable<AuthResponse> {
    console.log('AuthenticationService::login - Starting login for:', user.email);

    return this.tripDataService.login(user, passwd)
      .pipe(
        tap((value: AuthResponse) => {
          console.log('AuthenticationService::login - Received response:', value);
          console.log('AuthenticationService::login - Response type:', typeof value);
          console.log('AuthenticationService::login - Response keys:', Object.keys(value || {}));

          if(value?.token) {
            console.log('AuthenticationService::login - Login successful, saving token');
            console.log('AuthenticationService::login - Token to save:', value.token);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          } else {
            console.error('AuthenticationService::login - No token in response or invalid response');
            console.error('AuthenticationService::login - Value:', value);
          }
        }),
        catchError((error: any) => {
          console.error('AuthenticationService::login - Error during login:', error);
          throw error;
        })
      );
  }

  // Register method that leverages the register method in
  // tripDataService
  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging
  // information. Please Note: This method is nearly identical to the
  // login method because the behavior of the API logs a new user in
  // immediately upon registration
  public register(user: User, passwd: string) : Observable<AuthResponse> {
    console.log('AuthenticationService::register - Starting registration for:', user.email);

    return this.tripDataService.register(user, passwd)
      .pipe(
        tap((value: AuthResponse) => {
          if(value?.token) {
            console.log('AuthenticationService::register - Registration successful, saving token');
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        }),
        catchError((error: any) => {
          console.error('AuthenticationService::register - Error during registration:', error);
          throw error;
        })
      );
  }
}
