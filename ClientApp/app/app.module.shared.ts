import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { editEmployeeComponent } from './components/editEmployee/editEmployee.component';
import { newEmployeeComponent } from './components/newEmployee/newEmployee.component';
import { DetailsComponent } from './components/details/details.component';
import { EmployeeServices } from './Service/services';
import { filterSearch } from './pipes/search';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        DetailsComponent,
        newEmployeeComponent,
        editEmployeeComponent,
        filterSearch
    ],
    providers: [EmployeeServices],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'details/:id', component: DetailsComponent },
            { path: 'new', component: newEmployeeComponent },
            { path: 'edit/:id', component: editEmployeeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
