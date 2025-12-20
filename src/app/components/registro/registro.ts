import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MUNICIPIOS_MERIDA,
  Municipio,
  Parroquia,
} from '../../common/constants/geografia-merida';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  @Output() close = new EventEmitter<void>();
  registroForm: FormGroup;
  municipios = MUNICIPIOS_MERIDA;
  parroquias: Parroquia[] = [];

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', Validators.required],
      sexo: [''],
      municipio: ['', Validators.required],
      parroquia: ['', Validators.required],
      direccion_vivienda: ['', Validators.required],
    });
  }

  onMunicipioChange() {
    const municipioId = this.registroForm.get('municipio')?.value;
    const municipio = this.municipios.find((m) => m.id === municipioId);
    this.parroquias = municipio ? municipio.parroquias : [];
    this.registroForm.get('parroquia')?.setValue('');
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Registro data:', this.registroForm.value);
      // Implementar lógica de registro con municipio y parroquia
    }
  }
}
