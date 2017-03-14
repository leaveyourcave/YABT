import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
    selector: 'page-billscan',
    templateUrl: 'billscan.html'
})
export class BillscanPage {

    public base64Image: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, (err) => {
            console.log(err);
        });
    }
}
