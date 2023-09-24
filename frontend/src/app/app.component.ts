import { Component, OnInit } from '@angular/core';
import { AxiosService } from './axios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loginStatus!: boolean;

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    this.axiosService.isLoggedIn.subscribe((status) => {
      this.loginStatus = status;
    });
  }

  logout() {
    this.axiosService.setAuthToken(null);
  }

  back() {
    window.history.back();
  }
}
