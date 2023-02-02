import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllDetailsService {
  locationName: string[];
  longitude: number[];
  latitude: number[];
      
  constructor(){
    this.locationName = [];
    this.longitude = [];
    this.latitude = [];
  }
}
