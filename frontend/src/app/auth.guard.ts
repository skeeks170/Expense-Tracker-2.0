import { CanActivateFn } from '@angular/router';
import { AxiosService } from './axios.service';

export const authGuard: CanActivateFn = (route, state) => {
  const axiosService: AxiosService = new AxiosService();

  if (axiosService.getAuthToken() != null) {
    console.log(axiosService.getAuthToken());
    return true;
  }

  return false;
};
