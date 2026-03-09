import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../common/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
    >
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up border border-slate-100"
      >
        <!-- Header del Modal -->
        <div
          class="bg-vinotinto p-5 flex justify-between items-center text-white shadow-sm"
        >
          <h3 class="font-bold tracking-widest text-sm uppercase">
            Recuperar Contraseña
          </h3>
          <button
            (click)="close.emit()"
            class="text-white/80 hover:text-white transition-colors focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-10">
          <div class="text-center mb-8">
            <h4 class="text-xl font-semibold text-slate-800">
              ¿Olvidaste tu contraseña?
            </h4>
            <p class="text-slate-500 text-sm font-medium mt-2">
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecerla.
            </p>
          </div>

          <form
            [formGroup]="forgotForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <div>
              <label
                class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                formControlName="email"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-vinotinto/20 focus:border-vinotinto focus:bg-white transition-all text-sm outline-none"
                placeholder="ejemplo@fonhvim.gob.ve"
              />
            </div>

            <div
              *ngIf="message"
              class="text-sm p-3 rounded-lg text-center"
              [ngClass]="
                isError
                  ? 'bg-red-50 text-red-600'
                  : 'bg-green-50 text-green-700'
              "
            >
              {{ message }}
            </div>

            <div class="flex flex-col gap-3 mt-2">
              <button
                type="submit"
                [disabled]="forgotForm.invalid || loading"
                class="w-full bg-vinotinto hover:bg-vinotinto-hover text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-vinotinto/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
              >
                {{ loading ? 'Enviando...' : 'Enviar Enlace' }}
              </button>

              <button
                type="button"
                (click)="backToLogin.emit()"
                class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 px-4 rounded-lg transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
              >
                Volver al Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  @Output() close = new EventEmitter<void>();
  @Output() backToLogin = new EventEmitter<void>();

  forgotForm: FormGroup;
  loading = false;
  message = '';
  isError = false;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.loading = true;
      this.message = '';
      this.isError = false;
      const email = this.forgotForm.get('email')?.value;

      this.authService.requestPasswordReset(email).subscribe({
        next: (res) => {
          this.loading = false;
          this.message = res.message || 'Enlace enviado a tu correo.';
          this.forgotForm.reset();
        },
        error: (err) => {
          this.loading = false;
          this.isError = true;
          this.message =
            err.error?.message || 'Error al intentar enviar el correo.';
        },
      });
    }
  }
}
