import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private token = signal(localStorage.getItem('token'));

  isAuthenticated = computed(() => !!this.token());

  login(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}
