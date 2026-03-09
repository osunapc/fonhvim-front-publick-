import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../components/common/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() close = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() openForgotPassword = new EventEmitter<void>();
  loginForm: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Intentando login:', email);

      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);
          this.close.emit();
          this.router.navigateByUrl('/solicitudes');
        },
        error: (err: any) => {
          console.error('Error en login:', err);
          alert(
            'Error de autenticación: Credenciales inválidas o servidor no disponible.',
          );
        },
      });
    }
  }
}
