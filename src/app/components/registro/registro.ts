import { Component, EventEmitter, Output } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
          class="bg-blue-900 p-4 flex justify-between items-center text-white rounded-t-lg"
        >
          <div>
            <h3 class="font-bold tracking-wide">REGISTRO DE USUARIO</h3>
            <p class="text-xs text-blue-200">
              Complete el formulario para crear su cuenta
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
              <h4 class="text-blue-800 font-semibold text-sm uppercase">
                Datos Personales
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
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500 uppercase"
                placeholder="V-12345678"
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
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <!-- Nombre Usuario -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Nombre de Usuario <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                formControlName="username"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="usuario123"
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
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Teléfono</label
              >
              <input
                type="text"
                formControlName="telefono"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="0414-1234567"
              />
            </div>

            <!-- Fecha Nacimiento -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Fecha de Nacimiento</label
              >
              <input
                type="date"
                formControlName="fecha_nac"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Sexo -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Sexo</label
              >
              <select
                formControlName="sexo"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccione</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <!-- Estado Civil -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Estado Civil</label
              >
              <select
                formControlName="estado_civil"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccione</option>
                <option value="soltero">Soltero(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viudo">Viudo(a)</option>
              </select>
            </div>

            <!-- Datos Ubicación -->
            <div class="md:col-span-2 border-b border-gray-100 pb-2 mb-2 mt-2">
              <h4 class="text-blue-800 font-semibold text-sm uppercase">
                Ubicación y Solicitud
              </h4>
            </div>

            <!-- Estado/Ciudad (usamos ciudad del dto register original) -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Ciudad/Estado</label
              >
              <input
                type="text"
                formControlName="ciudad"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Municipio/Parroquia -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Municipio / Parroquia</label
              >
              <input
                type="text"
                formControlName="municipio_parroquia"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Dirección Vivienda -->
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Dirección de Vivienda</label
              >
              <textarea
                formControlName="direccion_vivienda"
                rows="2"
                class="w-full border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
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
                class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded text-sm shadow transition-colors disabled:opacity-50"
              >
                REGISTRARSE
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

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      ci: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: [''],
      fecha_nac: [''],
      sexo: [''],
      estado_civil: [''],
      ciudad: ['', Validators.minLength(3)],
      municipio_parroquia: [''],
      direccion_vivienda: [''],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Registro data:', this.registroForm.value);
      // Implementar lógica de registro
    }
  }
}
