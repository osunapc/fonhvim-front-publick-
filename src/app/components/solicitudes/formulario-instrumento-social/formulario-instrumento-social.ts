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
  styles: [],
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

      coordenadas: [''],
      fecha: [new Date().toISOString().split('T')[0]],

      // Ubicación y Vivienda
      direccion_vivienda: ['', Validators.required],
      municipio_parroquia: ['', Validators.required],
      tenencia_vivienda: [''],
      tipo_familia: [''],
      condiciones_vivienda: [''],

      // Grupo Familiar
      grupo_familiar: this.fb.array([]),
      integrantes_grupo_familiar: [1],

      // Socioeconómicos
      ocupacion_jefe: [''],
      nivel_instruccion: [''],
      direccion_trabajo_jefe: [''],
      ingreso_mensual_cestatikes: [0],
      otros_ingresos: [''],
      ingreso_mensual_hogar: [null],
      integrantes_trabajan: [0],
      adultos_mayores: [0],
      menores_grupo_familiar: [0],
      personas_discapacidad: [0],

      // Pagos y Registros
      paga_alquiler: [false],
      monto_alquiler: [0],
      registro_fonhvim: [false],
      fecha_registro: [''],
      inscrito_faov_favv: [false],

      // Campos Extra para Demanda Natural
      consejo_comunal: [''],
      nro_carnet_patria: [''],
      serial_carnet_patria: [''],

      // Observaciones y Firmas
      tipo_solicitud: ['CREDITO', Validators.required],
      firma_encuestado: [''],
    });
  }

  ngOnInit() {
    this.addIntegrante();
  }

  get grupoFamiliar() {
    return this.socialForm.get('grupo_familiar') as FormArray;
  }

  addIntegrante() {
    const integrante = this.fb.group({
      numero: [this.grupoFamiliar.length + 1],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: [''],
      fecha_nac: [''],
      parentesco: [''],
      escolaridad: [''],
      ingreso_mensual: [0],
      ocupacion_observaciones: [''],
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
