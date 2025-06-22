// app_admin/src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <main class="main-content">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
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

    .main-content {
      flex: 1;
      background-color: #f8f9fa;
      padding: 2rem 0;
    }

    footer {
      border-top: 1px solid #dee2e6;
    }

    .text-danger {
      color: #dc3545 !important;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  `]
})
export class AppComponent {
  title = 'Travlr Getaways Admin';
  currentRoute = '';
  currentYear = new Date().getFullYear();

  constructor(private readonly router: Router) {
    // Track current route for navigation highlighting
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }
}