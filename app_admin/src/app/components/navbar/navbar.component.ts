import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#"><img src="/assets/images/logo.png" alt="Travlr Logo"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" routerLink="">Trips<span class="sr-only">(current)</span></a>
        </div>
      </div>

      <div class="navbar-end">
        <a class="nav-item" routerLink="login" *ngIf="!isLoggedIn()">
          <span class="has-icon-left">Log In</span>
        </a>
        <a class="nav-item active" (click)="onLogout()" *ngIf="isLoggedIn()">
          <span class="has-icon-left">Log Out</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand img {
      height: 40px;
    }
    .navbar-end {
      margin-left: auto;
    }
    .nav-item {
      cursor: pointer;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #007bff;
    }
    .nav-item:hover {
      color: #0056b3;
    }
  `]
})
export class NavbarComponent {

  constructor(
    private readonly authenticationService: AuthenticationService
  ) { }

  public isLoggedIn(): boolean {
    const loggedIn = this.authenticationService.isLoggedIn();
    console.log('NavbarComponent::isLoggedIn - Status:', loggedIn);
    return loggedIn;
  }

  public onLogout(): void {
    console.log('NavbarComponent::onLogout - Logging out user');
    this.authenticationService.logout();
  }
}
