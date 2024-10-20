import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

 
  fetchCountryData(country: string) {
    let url = `http://api.worldbank.org/v2/country/${country}?format=json`;
    return this.http.get(url);
  }

  setCountryData(country: string) {
    let subject = new Subject();
    this.fetchCountryData(country).subscribe((data: any) => {
      let dataCleansed = data[1][0];
      subject.next({
        countryName: dataCleansed.name,
        capital: dataCleansed.capitalCity,
        countryRegion: dataCleansed.region.value,
        incomeLevel: dataCleansed.incomeLevel.value,
        lat: dataCleansed.latitude,
        lng: dataCleansed.longitude,
      })
    })
    return subject.asObservable();
  }

}
