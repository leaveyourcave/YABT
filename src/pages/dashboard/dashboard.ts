import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as c3 from 'c3';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {

    @ViewChild('dashboardChart') dashboardChart: ElementRef;

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');

        let dashboardChartArea = this.dashboardChart.nativeElement;

        c3.generate({
            bindto: dashboardChartArea,
            data: {
                type: 'donut',
                columns: [
                    ['Under 10', 30],
                    ['10-12', 25],
                    ['13-15', 20],
                    ['15-18', 15],
                    ['Above 18', 10]
                ],
                onclick: function(d, i) {
                    console.log("Button clicked!", d, i);
                },
                onmouseover: function(d, i) {
                    console.log("Mouse over!", d, i);
                },
                onmouseout: function(d, i) {
                    console.log("Mouse out!", d, i);
                }
            },
            donut: {
                title: "Users age"
            }
        });
    }
}
