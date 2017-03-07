import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from "../../providers/database";
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {

    @ViewChild('dashboardChart') dashboardChart: ElementRef;
    @ViewChild('tooltipTemplate') tooltipTemplate: ElementRef;

    private data = {
        title: "",
        thisMonth: 0,
        lastMonth: 0,
        budgetLimit: 0,
        trend: 0
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, private db: Database) { }

    ionViewDidLoad() {
        let dashboard = this;
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
                },
                padding: {
                    top: 0,
                    right: 200,
                    bottom: 40,
                    left: 200,
                },
                tooltip: {
                    contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                        dashboard.data.title = d[0].name;
                        dashboard.data.thisMonth = d[0].value;
                        // return this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color);
                        return dashboard.tooltipTemplate.nativeElement.innerHTML;
                    }
                }
            };
            c3.generate(chartConfiguration);
        });
    }
}
