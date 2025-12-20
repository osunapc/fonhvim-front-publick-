import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-navegacion.html',
  styles: [],
})
export class BarraNavegacion {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
