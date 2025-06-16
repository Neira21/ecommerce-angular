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
  email:string = '';
  username:string ='alvaro';
  password:string = '';
  error:string = '';

  private router = inject(Router);

  login(event: Event) {
    event.preventDefault(); // Evita el envío del formulario
    if (this.email === 'admin@admin.com' && this.password === '1234') {
      localStorage.setItem('token', 'mock-token');
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/products']);
    } else {
      console.log('Credenciales inválidas');
      this.error = 'Credenciales inválidas';

    }
  }

}
