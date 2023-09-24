import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AxiosService implements OnInit {

  isLoggedIn = new BehaviorSubject(false);

  constructor() {
    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.headers.post["Content-Type"] = "application/json";
  }

  ngOnInit(): void {
    if (this.getAuthToken() == null) this.logoutUser();
    else this.loginUser();
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token")
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      this.loginUser();
      window.localStorage.setItem("auth_token", token);
    } else {
      this.logoutUser();
      Swal.fire({
        text: 'successfully logged out'
      })
      window.localStorage.removeItem("auth_token");
    }
  }

  logoutUser() {
    this.isLoggedIn.next(false);
  }

  loginUser() {
    this.isLoggedIn.next(true);
  }

  // by default all requests will be of json type
  request(method: string, url: string, data: any): Promise<any> {

    let headers = {};

    if (this.getAuthToken() !== null) {
      headers = { "Authorization": "Bearer " + this.getAuthToken() };
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
  }
}
