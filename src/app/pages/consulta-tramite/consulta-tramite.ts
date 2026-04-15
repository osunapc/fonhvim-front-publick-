import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Encabezado } from '../../components/encabezado/encabezado';
import { PublicSolicitudesService } from '../../common/services/solicitudes.service';

@Component({
  selector: 'app-consulta-tramite',
  standalone: true,
  imports: [CommonModule, FormsModule, Encabezado, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col font-sans">
      <app-encabezado></app-encabezado>

      <!-- Botón volver al portal - visible en móvil -->
      <div class="p-4">
        <a 
          routerLink="/" 
          class="inline-flex items-center text-vinotinto hover:text-vinotinto-hover font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Portal
        </a>
      </div>

      <main class="flex-grow flex items-center justify-center p-6">
        <div class="max-w-4xl w-full">
          <!-- Buscador -->
          <div
            class="bg-white rounded-[2rem] shadow-2xl p-10 mb-10 border border-slate-100 text-center relative overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-full h-2 bg-vinotinto"></div>

            <h2 class="text-3xl font-black text-slate-800 mb-2">
              Consulta tu Trámite
            </h2>
            <p class="text-slate-500 mb-8 font-medium">
              Ingresa tu número de cédula para ver el estatus real de tu
              solicitud.
            </p>

            <div class="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="text"
                [(ngModel)]="ci"
                placeholder="Ej: 12345678"
                class="flex-grow p-5 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-bold outline-none focus:ring-4 focus:ring-vinotinto/10 focus:border-vinotinto transition-all"
              />
              <button
                (click)="buscar()"
                [disabled]="loading() || !ci"
                class="px-10 py-5 bg-vinotinto hover:bg-vinotinto-hover text-white font-bold rounded-2xl shadow-lg shadow-vinotinto/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {{ loading() ? 'BUSCANDO...' : 'CONSULTAR' }}
              </button>
            </div>
          </div>

          <!-- Resultados / Timeline -->
          @if (solicitud()) {
            <div class="animate-fade-in space-y-8">
              <div
                class="bg-white rounded-[2rem] shadow-xl p-10 border border-slate-100"
              >
                <div
                  class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
                >
                  <div>
                    <h3 class="text-xl font-bold text-slate-800">
                      Hola, {{ solicitud().nombre }} {{ solicitud().apellido }}
                    </h3>
                    <p
                      class="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1"
                    >
                      Solicitud #{{ solicitud().id }} •
                      {{ solicitud().tipo_solicitud }}
                    </p>
                  </div>
                  <div
                    class="px-6 py-3 bg-vinotinto/5 border border-vinotinto/10 rounded-2xl"
                  >
                    <span
                      class="text-xs font-black text-vinotinto uppercase tracking-tighter"
                      >Estatus Actual:</span
                    >
                    <span
                      class="ml-2 text-xs font-bold text-slate-600 block md:inline"
                      >{{ solicitud().status.replace('_', ' ') }}</span
                    >
                  </div>
                </div>

                <!-- Visual Timeline -->
                <div class="relative px-4">
                  <!-- Linea Base -->
                  <div
                    class="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden md:block"
                  ></div>

                  <div
                    class="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10"
                  >
                    @for (step of steps; track step.label) {
                      <div class="flex flex-col items-center text-center">
                        <div
                          class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
                          [class.bg-vinotinto]="isPastOrCurrent(step.status)"
                          [class.text-white]="isPastOrCurrent(step.status)"
                          [class.bg-white]="!isPastOrCurrent(step.status)"
                          [class.text-slate-300]="!isPastOrCurrent(step.status)"
                          [class.border-4]="true"
                          [class.border-vinotinto]="
                            isPastOrCurrent(step.status)
                          "
                          [class.border-slate-100]="
                            !isPastOrCurrent(step.status)
                          "
                          [class.scale-125]="isCurrent(step.status)"
                          [class.shadow-xl]="isCurrent(step.status)"
                          [class.shadow-vinotinto/30]="isCurrent(step.status)"
                        >
                          <span class="text-lg">{{ step.icon }}</span>
                        </div>
                        <p
                          class="mt-4 text-[10px] font-black uppercase tracking-widest"
                          [class.text-vinotinto]="isPastOrCurrent(step.status)"
                          [class.text-slate-300]="!isPastOrCurrent(step.status)"
                        >
                          {{ step.label }}
                        </p>
                      </div>
                    }
                  </div>
                </div>

                <div
                  class="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center"
                >
                  <p
                    class="text-sm text-slate-600 font-medium leading-relaxed italic"
                  >
                    "{{ getStatusMessage(solicitud().status) }}"
                  </p>
                </div>
              </div>
            </div>
          }

          <!-- No Encontrado -->
          @if (noEncontrado()) {
            <div
              class="bg-orange-50 border border-orange-100 rounded-[2rem] p-10 text-center animate-bounce-short"
            >
              <div class="text-4xl mb-4">🔍</div>
              <h3 class="text-lg font-bold text-orange-800">
                No encontramos registros
              </h3>
              <p class="text-sm text-orange-700/70 mt-2">
                Verifica que el número de cédula sea correcto o intenta más
                tarde.
              </p>
            </div>
          }
        </div>
      </main>

      <footer class="bg-white border-t border-slate-200 py-6 text-center">
        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">
          FONHVIM - Merida Pasión por lo Nuestro
        </p>
      </footer>
    </div>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-bounce-short {
        animation: bounceShort 2s infinite;
      }
      @keyframes bounceShort {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
    `,
  ],
})
export class ConsultaTramite {
  private solicitudesService = inject(PublicSolicitudesService);
  ci = '';
  solicitud = signal<any>(null);
  loading = signal(false);
  noEncontrado = signal(false);

  steps = [
    { label: 'Recepción', status: 'PENDIENTE', icon: '📝' },
    { label: 'Inspección', status: 'EN_TRAMITE', icon: '🔍' },
    { label: 'Aprobación', status: 'ENTREGADO', icon: '🏛️' }, // Usamos ENTREGADO como placeholder del fin del flujo interno o simplificacion
    { label: 'Legalización', status: 'ENTREGADO', icon: '⚖️' },
    { label: 'Cierre', status: 'ENTREGADO', icon: '📦' },
  ];

  // Mapeo real basado en los estatus del backend
  statusOrder = [
    'PENDIENTE',
    'EN_TRAMITE',
    'EN_ESPERA_DECISION',
    'EN_ESPERA_RECAUDOS',
    'EN_ESPERA_PAGO',
    'LISTO_DESPACHO',
    'ENTREGADO',
    'RECHAZADO',
  ];

  buscar() {
    this.loading.set(true);
    this.solicitud.set(null);
    this.noEncontrado.set(false);

    this.solicitudesService.consultarEstatus(this.ci).subscribe({
      next: (res) => {
        if (res) {
          this.solicitud.set(res);
        } else {
          this.noEncontrado.set(true);
        }
        this.loading.set(false);
      },
      error: () => {
        this.noEncontrado.set(true);
        this.loading.set(false);
      },
    });
  }

  isPastOrCurrent(stepStatus: string): boolean {
    const s = this.solicitud();
    if (!s) return false;
    const currentIdx = this.statusOrder.indexOf(s.status);
    const stepIdx = this.statusOrder.indexOf(stepStatus);
    return currentIdx >= stepIdx;
  }

  isCurrent(stepStatus: string): boolean {
    return this.solicitud()?.status === stepStatus;
  }

  getStatusMessage(status: string): string {
    const messages: any = {
      PENDIENTE:
        'Su solicitud ha sido recibida y está en cola para asignación de inspector.',
      EN_TRAMITE:
        'Estamos realizando la inspección técnica y cálculo de presupuesto.',
      EN_ESPERA_DECISION:
        'Su expediente está siendo revisado por la directiva institucional.',
      EN_ESPERA_RECAUDOS:
        '¡Aprobado! Por favor, consigne sus documentos físicos en la oficina jurídica.',
      EN_ESPERA_PAGO:
        'Expediente validado. Por favor pase por Caja para iniciar su plan.',
      LISTO_DESPACHO: 'Su material está listo para ser retirado en almacén.',
      ENTREGADO:
        'Trámite finalizado exitosamente. ¡Gracias por confiar en FONHVIM!',
      RECHAZADO:
        'Lamentablemente su solicitud no fue aprobada en esta oportunidad.',
    };
    return messages[status] || 'Su solicitud está siendo procesada.';
  }
}
