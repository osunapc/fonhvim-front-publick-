import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [],
  template: `
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-14">
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              class="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <!-- Desktop Menu -->
          <div
            class="hidden md:flex space-x-8 mx-auto font-medium text-gray-700"
          >
            <a
              href="/"
              class="hover:text-vinotinto border-b-2 border-transparent hover:border-vinotinto transition-colors py-2 px-1 text-sm tracking-wide"
              >INICIO</a
            >
            <a
              href="/organigrama"
              class="hover:text-vinotinto border-b-2 border-transparent hover:border-vinotinto transition-colors py-2 px-1 text-sm tracking-wide"
              >ORGANIGRAMA</a
            >
            <a
              href="/quienes-somos"
              class="hover:text-vinotinto border-b-2 border-transparent hover:border-vinotinto transition-colors py-2 px-1 text-sm tracking-wide"
              >QUIÉNES SOMOS</a
            >
            <a
              href="/servicios"
              class="hover:text-vinotinto border-b-2 border-transparent hover:border-vinotinto transition-colors py-2 px-1 text-sm tracking-wide"
              >SERVICIOS</a
            >
            <a
              href="/galeria"
              class="hover:text-vinotinto border-b-2 border-transparent hover:border-vinotinto transition-colors py-2 px-1 text-sm tracking-wide"
              >GALERÍA</a
            >
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class BarraNavegacion {}
