import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row">
      <div class="col-12 col-md-8">
        <h2>Login</h2>
        <form (ngSubmit)="onLoginSubmit()">
          <div role="alert" *ngIf="formError" class="alert alert-danger">
            {{ formError }}
          </div>

          <div class="form-group">
            <label for="name">Name</label>
            <input type="text"
                   name="name"
                   class="form-control"
                   placeholder="Enter Name"
                   [(ngModel)]="credentials.name">
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email"
                   name="email"
                   class="form-control"
                   placeholder="Enter email address"
                   [(ngModel)]="credentials.email">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password"
                   class="form-control"
                   id="password"
                   name="password"
                   placeholder="e.g 12+ alphanumerics"
                   [(ngModel)]="credentials.password">
          </div>

          <button type="submit" role="button" class="btn btn-primary">
            Sign In!
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.375rem 0.75rem;
      margin-bottom: 0.5rem;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
    }
    .btn {
      padding: 0.375rem 0.75rem;
      border: 1px solid transparent;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #007bff;
      border-color: #007bff;
      color: #fff;
    }
    .alert {
      padding: 0.75rem 1.25rem;
      margin-bottom: 1rem;
      border: 1px solid transparent;
      border-radius: 0.25rem;
    }
    .alert-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
  `]
})
export class LoginComponent {

  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) { }

  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    console.log('LoginComponent::doLogin - Attempting login for:', newUser.email);

    this.authenticationService.login(newUser, this.credentials.password)
      .subscribe({
        next: (response) => {
          console.log('LoginComponent::doLogin - Login successful:', response);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('LoginComponent::doLogin - Login failed:', error);
          this.formError = 'Login failed. Please check your credentials and try again.';
        }
      });
  }
}
