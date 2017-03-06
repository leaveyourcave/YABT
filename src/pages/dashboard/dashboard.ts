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
        let dashboardChartArea = this.dashboardChart.nativeElement;
        let data = this.db.getAllData().then((val) => {
            console.log(val);
            let chartConfiguration = {
                bindto: dashboardChartArea,
                data: {
                    type: 'donut',
                    columns: val
                },
                donut: {
                    title: "Users age"
                }
            };
            c3.generate(chartConfiguration);
          }
        );
      }
}
