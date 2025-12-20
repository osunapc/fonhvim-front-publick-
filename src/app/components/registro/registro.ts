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
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div
        class="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8 animate-fade-in-up"
      >
        <!-- Header -->
        <div
          class="bg-vinotinto p-4 flex justify-between items-center text-white rounded-t-lg"
        >
          <div>
            <h3 class="font-bold tracking-wide uppercase">
              Registro de Solicitante
            </h3>
            <p class="text-xs text-red-100">
              FONHVIM - Gobernación del Estado Mérida
            </p>
          </div>
          <button
            (click)="close.emit()"
            class="text-white hover:text-gray-300 focus:outline-none"
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
        <div class="p-6">
          <form
            [formGroup]="registroForm"
            (ngSubmit)="onSubmit()"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <!-- Datos Personales -->
            <div class="md:col-span-2 border-b border-gray-100 pb-2 mb-2">
              <h4 class="text-vinotinto font-semibold text-sm uppercase">
                Datos de Identidad
              </h4>
            </div>

            <!-- CI -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Cédula de Identidad <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                formControlName="ci"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto uppercase"
                placeholder="V-12345678"
              />
            </div>

            <!-- Nombre Completo -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Nombre Completo <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                formControlName="nombre"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
                placeholder="Juan Pérez"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Correo Electrónico <span class="text-red-500">*</span></label
              >
              <input
                type="email"
                formControlName="email"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Contraseña <span class="text-red-500">*</span></label
              >
              <input
                type="password"
                formControlName="password"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
                placeholder="********"
              />
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Teléfono de Contacto <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                formControlName="telefono"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
                placeholder="0414-1234567"
              />
            </div>

            <!-- Sexo -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Sexo</label
              >
              <select
                formControlName="sexo"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
              >
                <option value="">Seleccione</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <!-- Ubicación Meredith -->
            <div class="md:col-span-2 border-b border-gray-100 pb-2 mb-2 mt-2">
              <h4 class="text-vinotinto font-semibold text-sm uppercase">
                Ubicación Residencial (Estado Mérida)
              </h4>
            </div>

            <!-- Municipio -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Municipio <span class="text-red-500">*</span></label
              >
              <select
                formControlName="municipio"
                (change)="onMunicipioChange()"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
              >
                <option value="">Seleccione Municipio</option>
                @for (m of municipios; track m.id) {
                <option [value]="m.id">{{ m.nombre }}</option>
                }
              </select>
            </div>

            <!-- Parroquia -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Parroquia <span class="text-red-500">*</span></label
              >
              <select
                formControlName="parroquia"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
                [disabled]="!parroquias.length"
              >
                <option value="">Seleccione Parroquia</option>
                @for (p of parroquias; track p.id) {
                <option [value]="p.id">{{ p.nombre }}</option>
                }
              </select>
            </div>

            <!-- Dirección Vivienda -->
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Dirección Detallada <span class="text-red-500">*</span></label
              >
              <textarea
                formControlName="direccion_vivienda"
                rows="2"
                class="w-full border-gray-300 rounded text-sm focus:ring-vinotinto focus:border-vinotinto"
                placeholder="Av. Principal, Sector..."
              ></textarea>
            </div>

            <!-- Botones -->
            <div
              class="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100"
            >
              <button
                type="button"
                (click)="close.emit()"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-sm transition-colors"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                [disabled]="registroForm.invalid"
                class="bg-vinotinto hover:bg-vinotinto-hover text-white font-bold py-2 px-6 rounded text-sm shadow transition-colors disabled:opacity-50"
              >
                FINALIZAR REGISTRO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.3s ease-out forwards;
      }
    `,
  ],
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
