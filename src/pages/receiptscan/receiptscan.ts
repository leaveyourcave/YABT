import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import Tesseract from 'tesseract.js';

@Component({
    selector: 'receipt-scan',
    templateUrl: 'receiptscan.html'
})
export class ReceiptScanPage {

    @ViewChild('scannedImg')
    private scannedImg: ElementRef;

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {

        // Camera.getPicture({
        //     destinationType: Camera.DestinationType.FILE_URI,
        //     quality: 50,
        //     targetWidth: 1000,
        //     targetHeight: 1000
        // }).then((image) => {
        //     this.imidz = image;
        // }, (err) => {
        //     console.log(err);
        // });

        Tesseract.recognize(this.scannedImg.nativeElement.src)
            .then((tesseractResult) => {
                console.log(tesseractResult);
            });
    }
}
