import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formulario-instrumento-social',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-instrumento-social.html',
  styles: [
    `
      .form-section {
        @apply mb-8 bg-white p-6 rounded-xl border border-slate-100 shadow-sm;
      }
      .section-title {
        @apply text-vinotinto font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-3;
      }
      .section-title::after {
        content: '';
        @apply h-px bg-slate-100 flex-grow;
      }
      label {
        @apply block text-[11px] font-bold text-slate-600 uppercase mb-2 tracking-wide;
      }
      input,
      select,
      textarea {
        @apply w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm 
             focus:ring-2 focus:ring-vinotinto/20 focus:border-vinotinto focus:bg-white 
             transition-all outline-none;
      }
      .btn-add {
        @apply text-vinotinto hover:text-vinotinto-hover font-bold text-xs flex items-center gap-2 transition-colors;
      }
    `,
  ],
})
export class FormularioInstrumentoSocial implements OnInit {
  @Output() back = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  socialForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.socialForm = this.fb.group({
      // Datos de Identidad
      nombres_apellidos: ['', Validators.required],
      ci: ['', Validators.required],
      estado_civil: [''],
      sexo: [''],
      fecha_nac: [''],
      edad: [null],
      telefono: ['', Validators.required],

      // Ubicación y Vivienda
      direccion_vivienda: ['', Validators.required],
      municipio_parroquia: ['', Validators.required],
      tenencia_vivienda: [''],
      condiciones_vivienda: [''],

      // Grupo Familiar
      grupo_familiar: this.fb.array([]),

      // Socioeconómicos
      ocupacion_jefe: [''],
      nivel_instruccion: [''],
      ingreso_mensual_hogar: [null],
      integrantes_trabajan: [0],
      adultos_mayores: [0],
      menores_grupo_familiar: [0],
      personas_discapacidad: [0],

      // Observaciones
      observaciones: [''],
      tipo_solicitud: ['Construcción de Vivienda'],
    });
  }

  ngOnInit() {
    this.addIntegrante(); // Iniciamos con uno
  }

  get grupoFamiliar() {
    return this.socialForm.get('grupo_familiar') as FormArray;
  }

  addIntegrante() {
    const integrante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: [''],
      parentesco: [''],
      edad: [null],
    });
    this.grupoFamiliar.push(integrante);
  }

  removeIntegrante(index: number) {
    this.grupoFamiliar.removeAt(index);
  }

  onSubmit() {
    if (this.socialForm.valid) {
      this.submit.emit(this.socialForm.value);
    }
  }
}
