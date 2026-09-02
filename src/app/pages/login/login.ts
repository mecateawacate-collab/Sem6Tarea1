import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../service/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  usuario = '';
  password = '';

  private storage = inject(StorageService);
  private router = inject(Router);

  hacerLogin() {
    if (this.usuario && this.password) {
      this.storage.iniciarSesion(this.usuario);
      this.router.navigate(['/dashboard']);
    }
    else {
      alert('Por favor, ingrese usuario y contraseña.');
    }
  }
}