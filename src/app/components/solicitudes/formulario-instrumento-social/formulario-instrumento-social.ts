import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../common/auth/auth.service';
import { Subscription } from 'rxjs';

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
  private userSubscription?: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
    
    this.userSubscription = this.authService.getUserData().subscribe(user => {
      if (user) {
        if (user.nombre) {
          this.socialForm.patchValue({ nombres_apellidos: user.nombre });
        }
        if (user.ci) {
          this.socialForm.patchValue({ ci: user.ci });
        }
        if (user.municipio_parroquia) {
          this.socialForm.patchValue({ municipio_parroquia: user.municipio_parroquia });
        }
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  resetForm() {
    this.socialForm.reset({
      fecha: new Date().toISOString().split('T')[0],
      tipo_solicitud: 'CREDITO',
      grupo_familiar: this.fb.array([]),
      integrantes_grupo_familiar: 1,
      ingreso_mensual_cestatikes: 0,
      adultos_mayores: 0,
      menores_grupo_familiar: 0,
      personas_discapacidad: 0,
      paga_alquiler: false,
      monto_alquiler: 0,
      registro_fonhvim: false,
      inscribed_faov_favv: false,
    });
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
      const formData = this.socialForm.value;
      console.log('Datos crudos del form:', formData);
      const transformedData = this.transformDataForBackend(formData);
      console.log('Datos transformados:', transformedData);
      this.submit.emit(transformedData);
    } else {
      this.socialForm.markAllAsTouched();
      this.marcarGrupoFamiliarTocado();
    }
  }

  private transformDataForBackend(data: any): any {
    const result: any = {};

    result.nombres_apellidos = String(data.nombres_apellidos || '').trim();
    result.ci = String(data.ci || '').trim();
    result.telefono = String(data.telefono || '').trim();
    result.estado_civil = data.estado_civil || '';
    result.sexo = data.sexo || '';
    result.edad = data.edad != null ? parseInt(data.edad, 10) : null;
    result.direccion_vivienda = data.direccion_vivienda || '';
    result.municipio_parroquia = data.municipio_parroquia || '';
    result.tipo_solicitud = data.tipo_solicitud || 'CREDITO';
    result.tenencia_vivienda = data.tenencia_vivienda || '';
    result.tipo_familia = data.tipo_familia || '';
    result.condiciones_vivienda = data.condiciones_vivienda || '';
    result.ocupacion_jefe = data.ocupacion_jefe || '';
    result.nivel_instruccion = data.nivel_instruccion || '';
    result.direccion_trabajo_jefe = data.direccion_trabajo_jefe || '';
    result.otros_ingresos = data.otros_ingresos || '';

    if (data.fecha_nac && data.fecha_nac !== '') {
      result.fecha_nac = new Date(data.fecha_nac);
    } else {
      result.fecha_nac = null;
    }

    if (data.fecha_registro && data.fecha_registro !== '') {
      result.fecha_registro = new Date(data.fecha_registro);
    } else {
      result.fecha_registro = null;
    }

    result.ingreso_mensual_cestatikes = parseFloat(data.ingreso_mensual_cestatikes) || 0;
    result.ingreso_mensual_hogar = parseFloat(data.ingreso_mensual_hogar) || 0;
    result.monto_alquiler = parseFloat(data.monto_alquiler) || 0;
    result.integrantes_trabajan = parseInt(data.integrantes_trabajan) || 0;
    result.personas_discapacidad = parseInt(data.personas_discapacidad) || 0;
    result.adultos_mayores = parseInt(data.adultos_mayores) || 0;
    result.menores_grupo_familiar = parseInt(data.menores_grupo_familiar) || 0;
    result.integrantes_grupo_familiar = parseInt(data.integrantes_grupo_familiar) || 1;

    result.paga_alquiler = Boolean(data.paga_alquiler);
    result.registro_fonhvim = Boolean(data.registro_fonhvim);
    result.inscrito_faov_favv = Boolean(data.inscrito_faov_favv);

    if (data.consejo_comunal) result.consejo_comunal = data.consejo_comunal;
    if (data.nro_carnet_patria) result.nro_carnet_patria = data.nro_carnet_patria;
    if (data.serial_carnet_patria) result.serial_carnet_patria = data.serial_carnet_patria;

    if (data.grupo_familiar && data.grupo_familiar.length > 0) {
      result.grupo_familiar = data.grupo_familiar.map((integrante: any) => {
        const transformedIntegrante: any = {
          numero: parseInt(integrante.numero) || 1,
          nombre: String(integrante.nombre || '').trim(),
          apellido: String(integrante.apellido || '').trim(),
          cedula: String(integrante.cedula || '').trim(),
          parentesco: integrante.parentesco || '',
          escolaridad: integrante.escolaridad || '',
          ocupacion_observaciones: integrante.ocupacion_observaciones || '',
          edad: integrante.edad != null ? parseInt(integrante.edad, 10) : null,
          ingreso_mensual: parseFloat(integrante.ingreso_mensual) || 0,
        };

        if (integrante.fecha_nac && integrante.fecha_nac !== '') {
          transformedIntegrante.fecha_nac = new Date(integrante.fecha_nac);
        }

        return transformedIntegrante;
      });
    }

    result.coordenadas = data.coordenadas || '';
    result.fecha = new Date();
    result.firma_encuestado = data.firma_encuestado || '';
    result.observaciones = data.observaciones || '';

    return result;
  }

  private marcarGrupoFamiliarTocado() {
    this.grupoFamiliar.controls.forEach((control) => {
      control.markAsTouched();
    });
  }

  isFieldInvalid(path: string): boolean {
    const control = this.socialForm.get(path);
    return control ? control.invalid && control.touched : false;
  }

  isIntegranteFieldInvalid(index: number, field: string): boolean {
    const control = this.grupoFamiliar.at(index).get(field);
    return control ? control.invalid && control.touched : false;
  }
}
