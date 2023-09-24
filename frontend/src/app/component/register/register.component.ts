import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  employeeEmail: string = "";
  employeeUsername: string = "";
  employeePassword: string = "";
  role: string = "";
  department: string = "";
  employeeSalary: number = 10000;
  accountBankAccountNumber: string = "";
  accountBankName: string = "";
  accountIfsc: string = "";


  constructor(private axiosService: AxiosService, private router: Router) { }

  onSubmit(): void {

    if (this.role === "super-admin") this.employeeSalary = 100000;
    else if (this.role === "admin") this.employeeSalary = 50000;
    else this.employeeSalary = 10000;

    this.axiosService.request(
      "POST",
      "/employee/register",
      {
        employeeEmail: this.employeeEmail,
        employeeUsername: this.employeeUsername,
        employeePassword: this.employeePassword,
        role: this.role,
        department: this.department,
        employeeSalary: this.employeeSalary,
        accountBankAccountNumber: this.accountBankAccountNumber,
        accountBankName: this.accountBankName,
        accountIfsc: this.accountIfsc
      }
    ).then(response => {
      Swal.fire({
        icon: 'success',
        text: response.data
      })
      this.router.navigate(['login'])
    });
  }
}
