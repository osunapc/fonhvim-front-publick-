import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        (click)="onBackdropClick($event)"
      >
        <div 
          class="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden animate-fade-in-up border border-slate-100"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="bg-vinotinto p-4 sm:p-5 flex justify-between items-center text-white shadow-sm">
            <h3 class="font-bold tracking-wider text-xs sm:text-sm">{{ titulo }}</h3>
            @if (mostrarCerrar) {
              <button
                (click)="cerrar()"
                class="text-white/80 hover:text-white transition-colors focus:outline-none p-1"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            }
          </div>

          <!-- Body -->
          <div class="p-4 sm:p-6">
            @if (tipo === 'success') {
              <div class="text-center">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p class="text-slate-700 text-sm font-medium">{{ mensaje }}</p>
              </div>
            } @else if (tipo === 'error') {
              <div class="text-center">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <p class="text-slate-700 text-sm font-medium">{{ mensaje }}</p>
              </div>
            } @else if (tipo === 'warning') {
              <div class="text-center">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <p class="text-slate-700 text-sm font-medium">{{ mensaje }}</p>
              </div>
            } @else if (tipo === 'info') {
              <div class="text-center">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p class="text-slate-700 text-sm font-medium">{{ mensaje }}</p>
              </div>
            } @else if (tipo === 'confirm') {
              <div class="text-center">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-vinotinto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p class="text-slate-700 text-sm font-medium">{{ mensaje }}</p>
              </div>
            }
          </div>

          <!-- Footer con acciones -->
          <div class="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex gap-2 sm:gap-3 justify-end">
            @if (tipo === 'confirm') {
              <button
                (click)="onCancelar()"
                class="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs sm:text-sm rounded-lg transition-all active:scale-[0.98]"
              >
                {{ textoCancelar }}
              </button>
              <button
                (click)="onConfirmar()"
                class="px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-all active:scale-[0.98]"
              >
                {{ textoConfirmar }}
              </button>
            } @else {
              <button
                (click)="cerrar()"
                class="w-full sm:w-auto px-6 py-2.5 bg-vinotinto hover:bg-vinotinto-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all active:scale-[0.98]"
              >
                Aceptar
              </button>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() titulo = 'FONHVIM';
  @Input() mensaje = '';
  @Input() tipo: 'success' | 'error' | 'warning' | 'info' | 'confirm' = 'info';
  @Input() mostrarCerrar = true;
  @Input() textoConfirmar = 'Confirmar';
  @Input() textoCancelar = 'Cancelar';

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  cerrar() {
    this.isOpen = false;
    this.cerrarModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.cerrar();
    }
  }

  onConfirmar() {
    this.confirmar.emit();
    this.cerrar();
  }

  onCancelar() {
    this.cancelar.emit();
    this.cerrar();
  }

  abrir(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' | 'confirm' = 'info') {
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.isOpen = true;
  }
}
