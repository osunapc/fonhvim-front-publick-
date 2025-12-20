import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../common/auth/auth.service';

interface FormData {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-loginform',
  imports: [ReactiveFormsModule],
  templateUrl: './loginform.html',
  providers: [],
})
export class Loginform {
  Error = signal('');
  setIsSubmitting = signal(false);
  private router = inject(Router);
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService
  ) {
    this.form = this.formBuilder.group<FormData>({
      email: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  submit() {
    const { email, password } = this.form.value;
    this.AuthService.login(email, password).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/home');
      },
      error: (response) => {
        console.log(response)
        const errorMessage =
          response?.error?.message ||
          'Ocurrió un error inesperado.';
        this.Error.set(errorMessage);
      },
    });
  }
}
