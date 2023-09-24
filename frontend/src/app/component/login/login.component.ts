import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  employeeUsername: string = "";
  employeePassword: string = "";

  constructor(private axiosService: AxiosService, private router: Router) { }

  onSubmit(): void {
    this.axiosService.request(
      "POST",
      "/employee/login",
      {
        employeeUsername: this.employeeUsername,
        employeePassword: this.employeePassword
      }
    ).then(response => {
      Swal.fire({
        icon: 'success',
        text: "Login Successfull"
      })
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigate(['employee-list']);
    }, error => {
      Swal.fire({
        icon: 'warning',
        text: "incorrect username or password"
      });
      console.log(error);
    });
    ;
  }
}
