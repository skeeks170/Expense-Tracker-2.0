import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee: any;

  constructor(private axiosService: AxiosService, private router: Router) { }

  ngOnInit(): void {
    this.axiosService.loginUser();
    this.axiosService.request(
      "GET",
      "/employee/all",
      ""
    ).then(response => {
      this.employee = response.data;
      console.log(this.employee);
    });
  }

  makePayment(employeeId: number) {
    this.router.navigate(['make-payment', employeeId])
  }

  paymentHistory(employeeId: number) {
    this.router.navigate(['payment-history', employeeId])
  }

  updateAccountDetails(accountId: number) {
    this.router.navigate(['update-account-details', accountId])
  }

}
