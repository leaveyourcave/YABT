import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
// import { TooltipModule } from "ngx-tooltip";
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CategoriesPage } from '../pages/categories/categories';

@NgModule({
    declarations: [
        MyApp,
        DashboardPage,
        CategoriesPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        DashboardPage,
        CategoriesPage
    ],
    providers: []
})
export class AppModule { }
