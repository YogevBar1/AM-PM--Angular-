import { Routes } from '@angular/router';
import { InsertComponent } from './components/data-area/insert/insert.component';
import { ListComponent } from './components/data-area/list/list.component';
import { HomeComponent } from './components/home-area/home/home.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "list", component: ListComponent },
    { path: "insert", component: InsertComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    // Add 404 support...
];
