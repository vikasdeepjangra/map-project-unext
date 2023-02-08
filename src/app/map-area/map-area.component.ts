import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { GetAllDetailsService } from '../get-all-details.service';

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit {
  
  constructor(private http: HttpClient) { }

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 20.5937;
  lng = 78.9629;
  searchBoxString: string = "";
  apiData:any;
  allLocationOptions:any = new GetAllDetailsService;

  ngOnInit() {

    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 0,
        center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  getLocationStringAndConvertToCoordinates(){

    if(this.searchBoxString == "" || this.searchBoxString.length < 3){
      this.allLocationOptions = new GetAllDetailsService;
    }

    //console.log(this.searchBoxString);

    if(this.searchBoxString.length > 3){
    let headers = new HttpHeaders({});

    let urlFind:string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchBoxString}.json?limit=5&access_token=pk.eyJ1IjoidmlrYXNkZWVwamFuZ3JhIiwiYSI6ImNsZGswNmZkNTE0bmUzdmwxbjZ0MTVvNm4ifQ.nVk9LyxsgiYx1Mf9FlVYag`;
    this.http.get<any>(urlFind, {
      headers: headers
    }).subscribe(result =>{
      this.apiData = result.features;
      this.getList();
    });
  
  }

  }

  getList(){
    for(let i=0; i<this.apiData.length; i++){
      this.allLocationOptions.locationName[i] = this.apiData[i].place_name;
      this.allLocationOptions.longitude[i] = this.apiData[i].geometry.coordinates[0];
      this.allLocationOptions.latitude[i] = this.apiData[i].geometry.coordinates[1];
    }
  }

  plotOnMap(x: any){
    this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 11,
        center: [this.allLocationOptions.longitude[x], this.allLocationOptions.latitude[x]]
    });

    // Create a new marker.
    const marker = new mapboxgl.Marker()
    .setLngLat([this.allLocationOptions.longitude[x], this.allLocationOptions.latitude[x]])
    .addTo(this.map);

  }

}
