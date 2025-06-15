import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-ecommerce',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-ecommerce.component.html',
  styles: ``,
})
export default class UserEcommerceComponent {
  email = '';
  password = '';
  error = '';

  router = inject(Router);

  login() {
    if (this.email === 'admin@example.com' && this.password === '1234') {
      localStorage.setItem('token', 'mock-token');
      this.router.navigateByUrl('/products');
    } else {
      this.error = 'Credenciales inválidas';
    }
  }
}
