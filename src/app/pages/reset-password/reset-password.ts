import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../components/common/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 border border-gray-100"
      >
        <div class="text-center mb-8">
          <img src="logof.png" alt="FONHVIM" class="h-16 mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-slate-800">
            Crea una nueva contraseña
          </h2>
          <p class="text-slate-500 mt-2">
            Por favor, ingresa tu nueva contraseña segura abajo.
          </p>
        </div>

        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Nueva Contraseña</label
            >
            <input
              type="password"
              formControlName="newPassword"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-vinotinto/20 focus:border-vinotinto transition-all outline-none"
              placeholder="Min. 6 caracteres"
            />
            <div
              *ngIf="
                resetForm.get('newPassword')?.touched &&
                resetForm.get('newPassword')?.errors?.['minlength']
              "
              class="text-red-500 text-xs mt-1"
            >
              La contraseña debe tener al menos 6 caracteres.
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Confirmar Contraseña</label
            >
            <input
              type="password"
              formControlName="confirmPassword"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-vinotinto/20 focus:border-vinotinto transition-all outline-none"
              placeholder="Vuelve a escribir la contraseña"
            />
            <div
              *ngIf="
                resetForm.errors?.['mismatch'] &&
                resetForm.get('confirmPassword')?.touched
              "
              class="text-red-500 text-xs mt-1"
            >
              Las contraseñas no coinciden.
            </div>
          </div>

          <div
            *ngIf="message"
            class="text-sm p-3 rounded-lg text-center"
            [ngClass]="
              isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
            "
          >
            {{ message }}
          </div>

          <button
            type="submit"
            [disabled]="resetForm.invalid || loading"
            class="w-full bg-vinotinto hover:bg-vinotinto-hover text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {{ loading ? 'Guardando...' : 'Guardar Nueva Contraseña' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button
            (click)="goToLogin()"
            class="text-sm text-vinotinto font-medium hover:underline focus:outline-none"
          >
            Volver al Inicio (Login)
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  message = '';
  isError = false;
  token = '';

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (!this.token) {
      this.isError = true;
      this.message = 'Enlace de recuperación inválido o no proporcionado.';
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.loading = true;
      this.message = '';
      this.isError = false;

      const newPassword = this.resetForm.get('newPassword')?.value;

      this.authService
        .resetPassword({ token: this.token, newPassword })
        .subscribe({
          next: (res) => {
            this.loading = false;
            this.message =
              res.message || 'Contraseña restablecida exitosamente.';
            setTimeout(() => {
              this.router.navigate(['/']); // Redirect to home/login
            }, 3000);
          },
          error: (err) => {
            this.loading = false;
            this.isError = true;
            this.message =
              err.error?.message ||
              'Error al restablecer la contraseña. El enlace pudo haber expirado.';
          },
        });
    }
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
