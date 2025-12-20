import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selector-tramites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-vinotinto">
          ¿Qué trámite desea realizar?
        </h2>
        <p class="text-slate-500 text-sm">
          Seleccione una opción para comenzar su solicitud institucional.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          (click)="select.emit('social')"
          class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-vinotinto/30 transition-all cursor-pointer group"
        >
          <div
            class="w-12 h-12 bg-vinotinto/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-vinotinto group-hover:text-white transition-colors"
          >
            <span class="text-2xl">📋</span>
          </div>
          <h3 class="font-bold text-slate-800 mb-2">Instrumento Social</h3>
          <p class="text-slate-500 text-sm leading-relaxed">
            Censo Socio-Habitacional para solicitud de vivienda, mejoramiento o
            asistencia técnica.
          </p>
        </div>

        <div
          class="p-6 bg-slate-50 border border-slate-200 rounded-xl opacity-60 grayscale cursor-not-allowed relative"
        >
          <div
            class="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400"
          >
            <span class="text-2xl">🏠</span>
          </div>
          <h3 class="font-bold text-slate-400 mb-2">
            Adjudicación de Vivienda
          </h3>
          <p class="text-slate-400 text-xs italic">
            Próximamente disponible en línea.
          </p>
          <div
            class="absolute top-4 right-4 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded"
          >
            PRÓXIMAMENTE
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <button
          (click)="cancel.emit()"
          class="text-slate-500 hover:text-slate-700 font-bold py-2 px-6 rounded text-xs transition-all uppercase tracking-widest"
        >
          Regresar al listado
        </button>
      </div>
    </div>
  `,
})
export class SelectorTramites {
  @Output() select = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
}
