import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria-imagenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-imagenes.html',
  styles: [],
})
export class GaleriaImagenes {
  currentIndex = 0;

  // Placeholder images - Reemplazar con imágenes reales de assets
  images = [
    'https://upload.wikimedia.org/wikipedia/commons/4/40/El_cruce_de_las_bandas._Merida..jpg?utm_source=es.wikivoyage.org&utm_campaign=index&utm_content=original',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  ];

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }
}
