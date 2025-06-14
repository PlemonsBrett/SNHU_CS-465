// app_admin/src/app/components/edit-trip/edit-trip.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService } from '../../services/trip-data.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title mb-0">Edit Trip</h3>
            </div>

            <div class="card-body" *ngIf="!loading; else loadingTemplate">
              <form [formGroup]="editForm" (ngSubmit)="onSubmit()" *ngIf="editForm">

                <!-- Trip Code (readonly) -->
                <div class="mb-3">
                  <label for="code" class="form-label">Trip Code</label>
                  <input
                    type="text"
                    id="code"
                    class="form-control"
                    formControlName="code"
                    readonly
                    style="background-color: #f8f9fa;">
                  <small class="form-text text-muted">Trip code cannot be changed</small>
                </div>

                <!-- Trip Name -->
                <div class="mb-3">
                  <label for="name" class="form-label">Trip Name *</label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    formControlName="name"
                    [class.is-invalid]="submitted && f['name'].errors"
                    placeholder="e.g., Coral Reef Adventure">
                  <div *ngIf="submitted && f['name'].errors" class="invalid-feedback">
                    <div *ngIf="f['name'].errors?.['required']">Trip name is required</div>
                  </div>
                </div>

                <!-- Length -->
                <div class="mb-3">
                  <label for="length" class="form-label">Duration *</label>
                  <input
                    type="text"
                    id="length"
                    class="form-control"
                    formControlName="length"
                    [class.is-invalid]="submitted && f['length'].errors"
                    placeholder="e.g., 4 days / 3 nights">
                  <div *ngIf="submitted && f['length'].errors" class="invalid-feedback">
                    <div *ngIf="f['length'].errors?.['required']">Duration is required</div>
                  </div>
                </div>

                <!-- Start Date -->
                <div class="mb-3">
                  <label for="start" class="form-label">Start Date *</label>
                  <input
                    type="date"
                    id="start"
                    class="form-control"
                    formControlName="start"
                    [class.is-invalid]="submitted && f['start'].errors">
                  <div *ngIf="submitted && f['start'].errors" class="invalid-feedback">
                    <div *ngIf="f['start'].errors?.['required']">Start date is required</div>
                  </div>
                </div>

                <!-- Resort -->
                <div class="mb-3">
                  <label for="resort" class="form-label">Resort *</label>
                  <input
                    type="text"
                    id="resort"
                    class="form-control"
                    formControlName="resort"
                    [class.is-invalid]="submitted && f['resort'].errors"
                    placeholder="e.g., Ocean View Resort">
                  <div *ngIf="submitted && f['resort'].errors" class="invalid-feedback">
                    <div *ngIf="f['resort'].errors?.['required']">Resort is required</div>
                  </div>
                </div>

                <!-- Price Per Person -->
                <div class="mb-3">
                  <label for="perPerson" class="form-label">Price Per Person *</label>
                  <input
                    type="text"
                    id="perPerson"
                    class="form-control"
                    formControlName="perPerson"
                    [class.is-invalid]="submitted && f['perPerson'].errors"
                    placeholder="e.g., 799.00">
                  <div *ngIf="submitted && f['perPerson'].errors" class="invalid-feedback">
                    <div *ngIf="f['perPerson'].errors?.['required']">Price per person is required</div>
                  </div>
                </div>

                <!-- Image -->
                <div class="mb-3">
                  <label for="image" class="form-label">Image Filename *</label>
                  <input
                    type="text"
                    id="image"
                    class="form-control"
                    formControlName="image"
                    [class.is-invalid]="submitted && f['image'].errors"
                    placeholder="e.g., reef1.jpg">
                  <div *ngIf="submitted && f['image'].errors" class="invalid-feedback">
                    <div *ngIf="f['image'].errors?.['required']">Image filename is required</div>
                  </div>
                </div>

                <!-- Description -->
                <div class="mb-3">
                  <label for="description" class="form-label">Description *</label>
                  <textarea
                    id="description"
                    class="form-control"
                    rows="4"
                    formControlName="description"
                    [class.is-invalid]="submitted && f['description'].errors"
                    placeholder="Enter trip description..."></textarea>
                  <div *ngIf="submitted && f['description'].errors" class="invalid-feedback">
                    <div *ngIf="f['description'].errors?.['required']">Description is required</div>
                  </div>
                </div>

                <!-- Submit Buttons -->
                <div class="d-flex gap-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="submitting">
                    <span *ngIf="submitting" class="spinner-border spinner-border-sm me-2"></span>
                    {{ submitting ? 'Updating...' : 'Update Trip' }}
                  </button>

                  <button
                    type="button"
                    class="btn btn-secondary"
                    (click)="cancel()"
                    [disabled]="submitting">
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <ng-template #loadingTemplate>
              <div class="card-body text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading trip details...</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem 0;
    }

    .card {
      border-radius: 0.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .btn {
      border-radius: 0.375rem;
    }

    .form-control {
      border-radius: 0.375rem;
    }

    .gap-2 {
      gap: 0.5rem !important;
    }
  `]
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  submitting = false;
  loading = true;
  tripCode!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.params['tripCode'];

    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.loadTrip();
  }

  get f() {
    return this.editForm.controls;
  }

  loadTrip(): void {
    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (trip) => {
        // Format date for date input (YYYY-MM-DD)
        const startDate = new Date(trip.start);
        const formattedDate = startDate.toISOString().split('T')[0];

        this.editForm.patchValue({
          ...trip,
          start: formattedDate
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trip:', error);
        this.loading = false;
        this.router.navigate(['']);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this.submitting = true;

    const trip: Trip = {
      ...this.editForm.value,
      start: new Date(this.editForm.value.start)
    };

    this.tripDataService.updateTrip(trip).subscribe({
      next: (response) => {
        console.log('Trip updated successfully:', response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error updating trip:', error);
        this.submitting = false;
        // TODO: Show error message to user
      }
    });
  }

  cancel(): void {
    this.router.navigate(['']);
  }
}