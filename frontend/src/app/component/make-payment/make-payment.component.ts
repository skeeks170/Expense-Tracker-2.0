import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
})
export class MakePaymentComponent implements OnInit {
  employeeId!: number;
  paymentAmount!: number;
  paymentTaxPercent!: number;
  employeePerformanceRating!: number;
  employeeLeaveDays!: number;

  constructor(
    private axiosService: AxiosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.axiosService.loginUser();
    this.employeeId = this.route.snapshot.params['employeeId'];
  }

  calculate() {
    this.axiosService
      .request('POST', '/payment/calculate/' + this.employeeId, {
        employeeLeaveDays: this.employeeLeaveDays,
        employeePerformanceRating: this.employeePerformanceRating,
      })
      .then((response) => {
        this.paymentAmount = response.data.paymentAmount;
        console.log(this.paymentAmount);
        this.paymentTaxPercent = response.data.paymentTaxPercent;
      });
  }

  pay() {
    this.axiosService
      .request('POST', '/payment/payment/' + this.employeeId, {
        employeeLeaveDays: this.employeeLeaveDays,
        employeePerformanceRating: this.employeePerformanceRating,
        paymentAmount: this.paymentAmount,
        paymentTaxPercent: this.paymentTaxPercent,
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          text: response.data
        })
        window.history.back();
      });
  }
}
