// app_admin/src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" (click)="navigateHome($event)">
          <i class="fas fa-plane"></i>
          {{ title }}
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                [class.active]="currentRoute === ''"
                href="#"
                (click)="navigateHome($event)">
                <i class="fas fa-list"></i> Trips
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                [class.active]="currentRoute === '/add-trip'"
                href="#"
                (click)="navigateToAdd($event)">
                <i class="fas fa-plus"></i> Add Trip
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-light text-center py-3 mt-auto">
      <div class="container">
        <span class="text-muted">
          © {{ currentYear }} Travlr Getaways Admin.
          Built with <i class="fas fa-heart text-danger"></i> and Angular.
        </span>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .navbar-brand {
      font-weight: bold;
      font-size: 1.5rem;
    }

    .navbar-brand i {
      margin-right: 0.5rem;
    }

    .nav-link {
      border-radius: 0.375rem;
      margin: 0 0.25rem;
      transition: all 0.2s ease-in-out;
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: bold;
    }

    .nav-link i {
      margin-right: 0.5rem;
    }

    .main-content {
      flex: 1;
      background-color: #f8f9fa;
    }

    footer {
      border-top: 1px solid #dee2e6;
    }

    .text-danger {
      color: #dc3545 !important;
    }
  `]
})
export class AppComponent {
  title = 'Travlr Getaways Admin';
  currentRoute = '';
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {
    // Track current route for navigation highlighting
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  navigateHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['']);
  }

  navigateToAdd(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/add-trip']);
  }
}