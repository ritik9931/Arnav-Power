import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import confetti from 'canvas-confetti';
import { ContactService, ContactFormData } from '../../core/services/contact.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { LeafletMapComponent } from '../../shared/components/leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SectionHeaderComponent,
    LeafletMapComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  contactForm!: FormGroup;
  isSubmitting = signal(false);
  isSubmittedSuccess = signal(false);
  successMessage = signal('');
  referenceId = signal('');

  companyDetails = this.contactService.companyDetails;

  serviceOptions = [
    'GIS Survey & Geospatial Analysis',
    'Landbase & Topographic Survey',
    'Property & Cadastral Demarcation',
    'Utility Network Survey (GPR)',
    'Household & Field Data Collection',
    'Turnkey Solar Rooftop Installation',
    'Commercial / Industrial Solar Plant',
    'Solar Site & 3D Shadow Survey',
    'Other Engineering Consultation'
  ];

  ngOnInit() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{10,15}$/)]],
      serviceRequired: ['GIS Survey & Geospatial Analysis', Validators.required],
      projectLocation: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formData: ContactFormData = this.contactForm.value;

    this.contactService.submitInquiry(formData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.isSubmittedSuccess.set(true);
        this.successMessage.set(res.message);
        this.referenceId.set(res.refId);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }

  resetForm() {
    this.contactForm.reset({
      serviceRequired: 'GIS Survey & Geospatial Analysis'
    });
    this.isSubmittedSuccess.set(false);
  }
}
