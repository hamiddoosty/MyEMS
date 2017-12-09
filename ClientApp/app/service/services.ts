import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class EmployeeServices {
    constructor(private http: Http) {
    }

    getEmployeeList() {
        return this.http.get('http://localhost:64695/api/employee');
    }
    getProjectList() {
        return this.http.get('http://localhost:64695/api/projects');
    }
    getEmployeeDetails(empId: any) {
        return this.http.get('http://localhost:64695/api/employee/' + empId);
    }

    postData(empObj: any) {
        let headers = new Headers({
            'Content-Type':
            'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:64695/api/employee', JSON.stringify(empObj), options);
    }

    removeEmployeeDetails(empId: any) {
        let headers = new Headers({
            'Content-Type':
            'application/json; charset=utf-8'
        });
        return this.http.delete('http://localhost:64695/api/employee', new RequestOptions({
            headers: headers,
            body: empId
        }));
    }

    editEmployeeData(empObj: any) {
        let headers = new Headers({
            'Content-Type':
            'application/json; charset=utf-8'
        });
        let options = new RequestOptions({
            headers: headers
        });
        return this.http.put('http://localhost:64695/api/employee', JSON.stringify(empObj), options);
    }
}