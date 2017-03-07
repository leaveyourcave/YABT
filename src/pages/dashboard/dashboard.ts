import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from "../../providers/database";
import { TooltipData } from "./tooltip-data";
import { DashboardTooltipComponent } from "./dashboard-tooltip.component";
import * as c3 from 'c3';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {

    private tooltipInput: TooltipData = {
        categoryName: "",
        categoryColor: "",
        currentMonth: 0,
        previousMonth: 0,
        budgetLimit: 0,
        trend: 0
    };

    @ViewChild('dashboardChart') dashboardChart: ElementRef;
    @ViewChild(DashboardTooltipComponent) tooltipComponent: DashboardTooltipComponent;

    constructor(public navCtrl: NavController, public navParams: NavParams, private db: Database) { }

    ionViewDidLoad() {
        this.db.getAllData().then(this.generateChart);
    }

    private generateChart = (val) => {
        let chartConfiguration = {
            bindto: this.dashboardChart.nativeElement,
            data: {
                type: 'donut',
                columns: val
            },
            donut: {
                title: 'Summary'
            },
            padding: {
                top: 0,
                right: 200,
                bottom: 40,
                left: 200,
            },
            tooltip: {
                contents: this.renderTable
            }
        };
        c3.generate(chartConfiguration);
    }

    private renderTable = (d, defaultTitleFormat, defaultValueFormat, color): string => {
        this.prepareTooltipInpupt(d);
        return this.tooltipComponent.getTooltipHTML();
    }

    private prepareTooltipInpupt = (data) => {
        this.tooltipInput.categoryName = data[0].name;
        this.tooltipInput.currentMonth = data[0].value;
        // TODO
    }
}
