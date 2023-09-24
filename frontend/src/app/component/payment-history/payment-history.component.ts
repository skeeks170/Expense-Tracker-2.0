import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import * as html2pdf from 'html2pdf.js';

class PaymentHistory {
  paymentId!: number;
  paymentDate!: Date;
  paymentAmount!: number;
  paymentTransactionId!: string;
  paymentTaxPercent!: number;
  employeePerformanceRating!: number;
  employeeLeaveDays!: number;
}

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})

export class PaymentHistoryComponent implements OnInit {

  employeeId!: number;
  paymentHistoryList: PaymentHistory[] = [];

  constructor(private axiosService: AxiosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.axiosService.loginUser();
    this.employeeId = this.route.snapshot.params['employeeId'];

    this.axiosService.request(
      "GET",
      "/payment/history/" + this.employeeId,
      ""
    ).then(response => {
      this.paymentHistoryList = response.data;
    });
  }

  generatePaySlip() {
    const options = {
      filename: 'Pay Slip',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'landscape' }
    };

    const content = document.getElementById('paySlip');

    html2pdf().from(content).set(options).save();
  }

}
