import { Component } from '@angular/core';
import { EmployeeServices } from '../../Service/services';
import {Response} from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public EmployeeList = [];
    public constructor(private empService: EmployeeServices) {
        this.empService.getEmployeeList().subscribe(
            (data: Response) => (this.EmployeeList = data.json())
        );
    }

    deleteEmployee(empId: number) {

        var status = confirm("Are you want to delete this employee ?");
        if (status == true) {
            this.empService.removeEmployeeDetails(empId)
                .subscribe((data: Response) => (alert("Employee Deleted Successfullty")));

            //Get new list of employee
            this.empService.getEmployeeList().subscribe((data: Response) => (this.EmployeeList = data.json()));
        }
    }
     
}
