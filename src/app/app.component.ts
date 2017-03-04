import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { CategoriesPage } from '../pages/categories/categories';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = DashboardPage;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public menu: MenuController) {
        this.initializeApp();

        this.pages = [
            { title: 'Dashboard', component: DashboardPage },
            { title: 'Categories', component: CategoriesPage },
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        this.menu.close();
        this.nav.setRoot(page.component);
    }
}
