import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const JwtInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  console.log('JwtInterceptor::intercept - INTERCEPTOR CALLED for:', request.method, request.url);

  const authenticationService = inject(AuthenticationService);
  let isAuthAPI: boolean;

  console.log('JwtInterceptor::intercept - URL:', request.url);
  console.log('JwtInterceptor::intercept - Method:', request.method);

  // Check if this is an authentication endpoint (login or register)
  // The URLs will be like: http://localhost:3000/api/login or http://localhost:3000/api/register
  if (request.url.includes('/login') || request.url.includes('/register')) {
    isAuthAPI = true;
    console.log('JwtInterceptor::intercept - This is an auth API call');
  } else {
    isAuthAPI = false;
    console.log('JwtInterceptor::intercept - This is NOT an auth API call');
  }

  // Add Authorization header for all non-auth requests if user is logged in
  if (authenticationService.isLoggedIn() && !isAuthAPI) {
    let token = authenticationService.getToken();
    console.log('JwtInterceptor::intercept - User is logged in, adding Authorization header');
    console.log('JwtInterceptor::intercept - Token:', token ? 'Present' : 'Not present');

    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('JwtInterceptor::intercept - Request headers after adding auth:', authReq.headers);
    return next(authReq);
  } else {
    console.log('JwtInterceptor::intercept - User not logged in or auth API call, proceeding without auth header');
    console.log('JwtInterceptor::intercept - isLoggedIn():', authenticationService.isLoggedIn());
    console.log('JwtInterceptor::intercept - isAuthAPI:', isAuthAPI);
  }

  return next(request);
};
