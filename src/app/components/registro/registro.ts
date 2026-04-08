import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  MUNICIPIOS_MERIDA,
  Municipio,
  Parroquia,
} from '../../common/constants/geografia-merida';
import { AuthService } from '../common/auth/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  @Output() close = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();
  registroForm: FormGroup;
  municipios = MUNICIPIOS_MERIDA;
  parroquias: Parroquia[] = [];
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', Validators.required],
      sexo: [''],
      municipio: ['', Validators.required],
      parroquia: [{ value: '', disabled: true }, Validators.required],
      direccion_vivienda: ['', Validators.required],
    });
  }

  onMunicipioChange() {
    const municipioId = this.registroForm.get('municipio')?.value;
    const municipio = this.municipios.find((m) => m.id === municipioId);
    this.parroquias = municipio ? municipio.parroquias : [];

    const parroquiaControl = this.registroForm.get('parroquia');
    parroquiaControl?.setValue('');

    if (this.parroquias.length > 0) {
      parroquiaControl?.enable();
    } else {
      parroquiaControl?.disable();
    }
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const rawData = this.registroForm.value;

      // Mapeo de campos para el backend (RegisterDto) con trim
      const registerData = {
        username: rawData.nombre?.trim() || '',
        email: rawData.email?.trim() || '',
        password: rawData.password?.trim() || '',
        ci: rawData.ci?.trim() || '',
        telefono: rawData.telefono?.trim() || '',
        sexo: rawData.sexo || '',
        ciudad: rawData.municipio || 'Merida',
        direccion_vivienda: rawData.direccion_vivienda?.trim() || '',
        municipio_parroquia: `${rawData.municipio || ''} - ${rawData.parroquia || ''}`,
      };

      console.log('Enviando registro:', registerData);

      this.authService.register(registerData).subscribe({
        next: (response: any) => {
          console.log('Registro exitoso:', response);
          alert('Registro completado con éxito. Ya puede iniciar sesión.');
          this.close.emit();
        },
        error: (err: any) => {
          console.error('Error en registro:', err);
          alert(
            'Error al registrarse: ' +
              (err.error?.message || 'Servidor no disponible'),
          );
        },
      });
    }
  }
}
