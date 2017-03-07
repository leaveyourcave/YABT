import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from "../../providers/database";
import { TooltipData } from "./tooltip-data";
import { DashboardTooltipComponent } from "./dashboard-tooltip.component";
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {

    @ViewChild('dashboardChart') dashboardChart: ElementRef;
    @ViewChild(DashboardTooltipComponent) tooltipComponent: DashboardTooltipComponent;

    tooltipInput: TooltipData = {
        categoryName: "",
        categoryColor: "",
        currentMonth: 0,
        previousMonth: 0,
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
                        dashboard.tooltipInput.categoryName = d[0].name;
                        dashboard.tooltipInput.currentMonth = d[0].value;

                        return dashboard.tooltipComponent.tooltipTemplate.nativeElement.innerHTML;
                    }
                }
            };
            c3.generate(chartConfiguration);
        });
    }
}
