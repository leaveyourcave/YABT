import { Component, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { TooltipData } from './tooltip-data';

@Component({
    selector: 'dashboard-tooltip',
    template: `
    <div [hidden]="true">
      <div #tooltipTemplate>
        <table class='c3-tooltip'>
          <tr>
            <th colspan="2"><p textContent="{{tooltipData.categoryName}}"></p></th>
          </tr>
          <tr>
            <td >This month</td>
            <td ><p textContent="{{'$' + tooltipData.currentMonth}}"></p></td>
          </tr>
          <tr>
            <td >Last month</td>
            <td ><p textContent="{{'$' + tooltipData.previousMonth}}"></td>
          </tr>
          <tr>
            <td >Budget limit</td>
            <td ><p textContent="{{'$' + tooltipData.budgetLimit}}"></td>
          </tr>
          <tr>
            <td >Trend</td>
            <td ><p textContent="{{tooltipData.trend}}"></td>
          </tr>
        </table>
      </div>
    </div>
  `
})
export class DashboardTooltipComponent {
    @Input() tooltipData: TooltipData;
    @ViewChild('tooltipTemplate') tooltipTemplate: ElementRef;

    public getTooltipHTML(): string {
        return this.tooltipTemplate.nativeElement.innerHTML;
    }
}
