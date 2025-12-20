import { Component } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  template: `
    <header
      class="relative bg-gradient-to-r from-vinotinto to-vinotinto-hover h-32 md:h-40 overflow-hidden shadow-lg"
    >
      <!-- Background pattern/overlay -->
      <div
        class="absolute inset-0 opacity-10 bg-[url('/assets/pattern.png')]"
      ></div>

      <!-- Contenido centrado -->
      <div
        class="container mx-auto h-full flex items-center justify-between px-6 relative z-10"
      >
        <!-- Logo Izquierda -->
        <div class="flex-shrink-0 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
          <img
            src="Logo-gobernacion.png"
            alt="Gobernación de Mérida"
            class="h-20 md:h-28 object-contain filter drop-shadow"
          />
        </div>

        <!-- Título Central (Opcional o decorativo) -->
        <div class="hidden md:block text-center text-white">
          <h1 class="text-2xl font-bold tracking-wider">FONHVIM</h1>
          <p class="text-xs text-blue-100 tracking-widest uppercase">
            Fondo para el Desarrollo Integral de la Vivienda y Hábitat
          </p>
        </div>

        <!-- Logo Derecha -->
        <div class="flex-shrink-0 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
          <img
            src="logof.png"
            alt="Logo FONHVIM"
            class="h-20 md:h-28 object-contain filter drop-shadow"
          />
        </div>
      </div>

      <!-- Corte diagonal inferior -->
      <div
        class="absolute bottom-0 left-0 right-0 h-8 bg-white"
        style="clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 100%);"
      ></div>
    </header>
  `,
  styles: [],
})
export class Encabezado {}
