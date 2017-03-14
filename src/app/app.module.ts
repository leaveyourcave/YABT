import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
// import { TooltipModule } from "ngx-tooltip";
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CategoriesPage } from '../pages/categories/categories';
import { BillscanPage } from '../pages/billscan/billscan';
import { Database } from '../providers/database';
import { DashboardTooltipComponent } from '../pages/dashboard/dashboard-tooltip.component';

export function provideStorage() {
    return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' });
}

@NgModule({
    declarations: [
        MyApp,
        DashboardPage,
        CategoriesPage,
        BillscanPage,
        DashboardTooltipComponent
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        DashboardPage,
        CategoriesPage,
        BillscanPage
    ],
    providers: [
        { provide: Storage, useFactory: provideStorage },
        Database
    ]
})
export class AppModule { }
