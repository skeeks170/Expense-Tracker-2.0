import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-account-details',
  templateUrl: './update-account-details.component.html',
  styleUrls: ['./update-account-details.component.css']
})
export class UpdateAccountDetailsComponent implements OnInit {

  accountId!: number;
  accountBankName: string = "";
  accountBankAccountNumber: string = "";
  accountIfsc: string = "";

  constructor(private axiosService: AxiosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.axiosService.loginUser();
    this.accountId = this.route.snapshot.params['accountId'];

    this.axiosService.request(
      "GET",
      "/account/" + this.accountId,
      ""
    ).then(response => {
      this.accountBankName = response.data.accountBankName;
      this.accountBankAccountNumber = response.data.accountBankAccountNumber;
      this.accountIfsc = response.data.accountIfsc;
    });
  }

  onSubmit() {
    this.axiosService.request(
      "PUT",
      "/account/" + this.accountId,
      {
        accountBankName: this.accountBankName,
        accountBankAccountNumber: this.accountBankAccountNumber,
        accountIfsc: this.accountIfsc
      }
    ).then(response => {
      Swal.fire({
        icon: 'success',
        text: response.data
      })
      window.history.back();
    });
  }
}
