import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectLocation: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly companyDetails = {
    name: 'Arnav Power Solution & Services',
    // Corporate Address (Main Branch Location)
    corporateAddressTitle: 'Corporate Address (Main Branch)',
    addressLine1: 'Near Bus Stand, Main Road, Wadegaon',
    addressLine2: 'Post+Taluka Sadak Arjuni, Dist. Gondia, Maharashtra – 441807, India',
    fullCorporateAddress: 'Near Bus Stand, Main Road, Wadegaon, Post+Taluka Sadak Arjuni, Dist. Gondia, Maharashtra – 441807',
    
    // Regional Engineering & Survey Branch (Nagpur)
    branchAddressTitle: 'Regional Operations & Engineering Branch',
    branchAddressLine1: 'Plot No. 80, 81, Jai Bajrang Society, Seminary Hills',
    branchAddressLine2: 'Civil Line, Nagpur, Maharashtra – 440006, India',
    fullBranchAddress: 'Plot No. 80, 81, Jai Bajrang Society, Seminary Hills, Civil Line, Nagpur, Maharashtra – 440006',

    coordinates: {
      latitude: 21.106490,
      longitude: 80.154679,
      formatted: `21°06'23.4"N 80°09'16.8"E`
    },
    nagpurCoordinates: {
      latitude: 21.169158,
      longitude: 79.042789,
      formatted: `21°10'08.97"N 79°02'34.04"E`
    },
    googleMapsUrl: 'https://www.google.com/maps/place/Arnav+power+solution+services/@21.1064934,80.1542061,333m/data=!3m1!1e3!4m6!3m5!1s0x3a2b9f00316f2ec1:0xc8460cb9507a70ac!8m2!3d21.1064904!4d80.1546792!16s%2Fg%2F11nv6sm0rv',
    email: 'info@arnavpower.com',
    supportEmail: 'projects@arnavpower.com',
    phone: '+91 98229 41438',
    workingHours: 'Monday - Saturday: 9:30 AM - 6:30 PM IST'
  };

  submitInquiry(data: ContactFormData): Observable<{ success: boolean; message: string; refId: string }> {
    const refId = 'APS-' + Math.floor(100000 + Math.random() * 900000);
    return of({
      success: true,
      message: `Thank you, ${data.fullName}! Your consultation request for ${data.serviceRequired || 'Engineering Solutions'} has been received. Our project engineering team will contact you at ${data.phone || 'your phone number'} within 4 business hours.`,
      refId
    }).pipe(delay(800));
  }
}
