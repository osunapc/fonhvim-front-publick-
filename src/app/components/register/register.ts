import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../common/auth/auth.service';
interface FormDataR {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  ciudad: FormControl<string>;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  providers: [AuthService],
})
export class Register {
  Error = signal('');
  setIsSubmitting = signal(false);
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group<FormDataR>({
      username: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      ciudad: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  submit() {
    const { username, email, password, ciudad } = this.form.value;
    this.AuthService.register(username, email, password, ciudad).subscribe({
      next: (response: { success: boolean; message: string }) => {
        if (response.success) {
          this.router.navigate(['/register']);
        } else {
          this.Error.set(response.message);
        }
      },
      error: (response) => {
        this.Error.set(response.error.message);
      },
    });
  }
}
