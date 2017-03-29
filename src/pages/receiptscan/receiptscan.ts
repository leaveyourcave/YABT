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
            encodingType: Camera.EncodingType.PNG,
            quality: 100,
            targetWidth: 200,
            targetHeight: 300
        }).then((image) => {
            this.scannedImg.nativeElement.src = image;
            this.recognizeText(this.scannedImg.nativeElement.src);
        }, (err) => {
            console.log(err);
            this.recognizeText(this.scannedImg.nativeElement.src); // probably we're in a browser
        });
    }

    recognizeText(image) {
        Tesseract.recognize(image)
            .progress((progress) => {
                var progressStatus = progress.status + " [" + Math.ceil(progress.progress * 100) + "%]";
                console.log(progressStatus);

                this.progress = progressStatus;
            })
            .catch(err => {
                console.log(err);
            })
            .then((tesseractResult) => {
                console.log(tesseractResult);
                // console.log(JSON.stringify(tesseractResult)); - circular json

                this.result = tesseractResult;
                this.recognizedText = tesseractResult.text;

                // let's refresh everything
                this.cd.detectChanges();
            });
    }
}
