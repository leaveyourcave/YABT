import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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

    private recognizedText: string;
    private progress: any;
    private result: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public cd: ChangeDetectorRef) { }

    ionViewDidLoad() {

        Camera.getPicture({
            destinationType: Camera.DestinationType.FILE_URI,
            quality: 50,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((image) => {
            this.scannedImg.nativeElement.src = image;
            this.recognizeText(image);
        }, (err) => {
            console.log(err);
        });

        this.recognizeText(this.scannedImg.nativeElement.src);
    }

    recognizeText(image) {
        Tesseract.recognize(image)
            .progress((progress) => {
                console.log('progress', progress);
                this.progress = progress.status + " [" + Math.ceil(progress.progress*100) + "%]";
                this.cd.detectChanges();
            })
            .then((tesseractResult) => {
                this.result = tesseractResult;
                console.log(tesseractResult);
                this.recognizedText = tesseractResult.text;
                this.cd.detectChanges();
            });

    }
}
