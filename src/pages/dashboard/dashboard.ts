import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from "../../providers/database";
import * as c3 from 'c3';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {

    @ViewChild('dashboardChart') dashboardChart: ElementRef;

    constructor(public navCtrl: NavController, public navParams: NavParams, private db: Database) { }

    ionViewDidLoad() {
        let transformedSummaryData = this.db.getAllData();

        let dashboardChartArea = this.dashboardChart.nativeElement;
        console.log(transformedSummaryData);
        c3.generate({
            bindto: dashboardChartArea,
            data: {
                type: 'donut',
                columns: transformedSummaryData,
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
