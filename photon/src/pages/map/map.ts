import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GoogleMapsApiProvider } from '../../providers/google-maps-api/google-maps-api';
import { GoogleMap } from '../../../node_modules/@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public googleMapsAPI: GoogleMapsApiProvider) {}

  ionViewDidLoad() {
    const latitude = this.navParams.get('latitude');
    const longitude = this.navParams.get('longitude');
    this.map = this.googleMapsAPI.initialiseMap(this.mapElement, latitude, longitude);
    this.googleMapsAPI.addMarker(this.map, latitude, longitude);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  back() {
    this.navCtrl.pop();
  }
}
